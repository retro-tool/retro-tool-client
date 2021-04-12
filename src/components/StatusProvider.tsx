import React, { useContext, useEffect, useState, useCallback } from "react";
import { client } from "services/api";
import { ApolloError } from "apollo-client";
// import useSessionstorage from "@rooks/use-sessionstorage-state";
import useSessionStorage from "react-use/lib/useSessionStorage";
import toast from "react-hot-toast";

import { RequestPassword } from "components/RequestPassword";
import { useSlug } from "components/Slug.context";

import { Slug, Status } from "types";
import {
  OnStatusUpdatedDocument,
  GetRetroStatusQuery,
  useGetRetroStatusQuery,
  SetRetroNextStatusDocument,
  GetActionItemsDocument,
  CreateActionItemDocument
} from "generated/graphql";

/**
 * TYPES
 */
interface IStatusContext {
  cansSwitchStatus: boolean;
  status: Status;
  nextStatus: Function;
  password?: string;
  setPassword: (value: string) => void;
  removePassword: Function;
  thisRetroHasPasswordStored: boolean;
}

interface GetRetroStatus {
  data?: GetRetroStatusQuery;
  error?: ApolloError;
}

/**
 * HELPERS
 */
const StatusContext = React.createContext({} as IStatusContext);

const SubscribeToStatus = ({ children, subscribeToStatus }) => {
  useEffect(() => {
    subscribeToStatus();
  }, [subscribeToStatus]);

  return children;
};

const errorBecauseRetroIsPasswordProtected = (error?: ApolloError) => {
  if (
    error &&
    error.graphQLErrors[0] &&
    error.graphQLErrors[0].extensions &&
    error.graphQLErrors[0].extensions.code === "UNAUTHORIZED"
  ) {
    // TODO: should I remove the related password for this slug? at this point if passwords[slug]
    // exists it means that is a wrong password
    return true;
  }

  return false;
};

// When we could use optional chaining this will be much easier :/
const getRetroStatus = ({ data, error }: GetRetroStatus): Status => {
  if (errorBecauseRetroIsPasswordProtected(error)) {
    return "password-protected";
  }

  if (data && data.retro) return data.retro.status as Status;

  return "initial";
};

const copyPreviousActionItemsThatAreNotDone = slug => {
  // retrieve all action items
  client
    .query({ query: GetActionItemsDocument, variables: { slug } })
    .then(({ data }) => {
      if (
        data &&
        data.retro &&
        data.retro.previousRetro &&
        data.retro.previousRetro.actionItems
      ) {
        // filter action items from previous retro that are not done
        const previousActionItemsAlreadyDone = data.retro.previousRetro.actionItems.filter(
          item => !item.completed
        );

        // re-create them within the current retro
        previousActionItemsAlreadyDone.map(({ title }) =>
          client.mutate({
            mutation: CreateActionItemDocument,
            variables: { slug, title }
          })
        );
      }
    });
};

/**
 * HOOKS
 */
const usePassword = (slug: Slug) => {
  const [passwords, setRetroPassword] = useSessionStorage<
    Record<string, string>
  >("retrotool-pass", {});

  const setPassword = (value: string) => {
    setRetroPassword({ ...passwords, [slug]: value });
  };

  const thisRetroHasPasswordStored = !!(
    passwords &&
    Object.keys(passwords).length &&
    passwords[slug]
  );

  const password = thisRetroHasPasswordStored ? passwords[slug] : undefined;

  const removePassword = useCallback(() => {
    if (thisRetroHasPasswordStored) {
      delete passwords[slug];
      setRetroPassword({ ...passwords });
    }
  }, [thisRetroHasPasswordStored, passwords, slug, setRetroPassword]);

  return {
    password,
    setPassword,
    removePassword,
    thisRetroHasPasswordStored
  };
};

/**
 * PROVIDER COMPONENT
 */
const StatusProvider = ({ children }) => {
  const slug = useSlug();
  const {
    password,
    setPassword,
    removePassword,
    thisRetroHasPasswordStored
  } = usePassword(slug);

  const [cansSwitchStatus, setCansSwitchStatus] = useState(false);

  const [status, setStatus] = useState<Status>("initial");

  const { subscribeToMore, data, loading, error } = useGetRetroStatusQuery({
    variables: { slug, password }
  });

  const isPasswordProtectedRetro =
    getRetroStatus({ data, error }) === "password-protected";

  const nextStatus = () => {
    // When changing from `review` to `action` we want to clone the previous action items that are not done
    if (status === "review") {
      copyPreviousActionItemsThatAreNotDone(slug);
    }

    client
      .mutate({ mutation: SetRetroNextStatusDocument, variables: { slug } })
      .then(({ data }) => setStatus(data.nextStep.status));
  };

  useEffect(() => {
    if (!loading && isPasswordProtectedRetro && thisRetroHasPasswordStored) {
      // TODO: Should I remove the wrong password from sessionstorage?
      toast.error("Wrong password, try again.");
    }
  }, [
    loading,
    isPasswordProtectedRetro,
    thisRetroHasPasswordStored,
    removePassword
  ]);

  if (loading) return null;
  if (error && !errorBecauseRetroIsPasswordProtected(error)) return null;

  return (
    <>
      {isPasswordProtectedRetro && (
        <RequestPassword setPassword={setPassword} />
      )}
      <SubscribeToStatus
        subscribeToStatus={() => {
          const currentStatus = getRetroStatus({ data, error });
          setStatus(currentStatus as Status);

          if (data) {
            // @ts-ignore
            let { improve, others, status, works } = data.retro;
            let itemsAvailable =
              !!works.length || !!improve.length || !!others.length;

            if (status === "initial") {
              setCansSwitchStatus(itemsAvailable);
            } else {
              setCansSwitchStatus(true);
            }
          }

          subscribeToMore({
            document: OnStatusUpdatedDocument,
            variables: { slug, password },
            // @ts-ignore
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;

              // @ts-ignore
              if (subscriptionData.data.retroUpdated) {
                let {
                  improve,
                  others,
                  status,
                  works
                  // @ts-ignore
                } = subscriptionData.data.retroUpdated;

                let itemsAvailable =
                  (works && !!works.length) ||
                  (improve && !!improve.length) ||
                  (others && !!others.length);

                if (status === "initial") {
                  setCansSwitchStatus(itemsAvailable);
                } else {
                  setCansSwitchStatus(true);
                }
              }

              let status;

              // @ts-ignore: wtf why retroUpdated doesn't exist on type data?
              if (subscriptionData.data.retroUpdated) {
                // @ts-ignore
                status = subscriptionData.data.retroUpdated.status;
              } else {
                status = prev && prev.retro && prev.retro.status;
              }

              if (status && currentStatus !== status) {
                setStatus(status);
              }

              return {
                retro: {
                  ...prev.retro,
                  status
                }
              };
            }
          });
        }}
      >
        <StatusContext.Provider
          value={{
            cansSwitchStatus,
            status,
            nextStatus,
            password,
            setPassword,
            removePassword,
            thisRetroHasPasswordStored
          }}
        >
          {children}
        </StatusContext.Provider>
      </SubscribeToStatus>
    </>
  );
};

/**
 * CONSUMER HOOK
 */
const useStatus = () => {
  const context = useContext(StatusContext);

  if (!context) {
    throw new Error("useStatus must be used within a StatusProvider");
  }

  return context;
};

export { StatusProvider, useStatus };
