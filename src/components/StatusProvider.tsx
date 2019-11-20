import React, { useContext, useEffect, useState } from "react";
import { client } from "services/api";
import { useSlug } from "components/Slug.context";
import {
  OnStatusUpdatedDocument,
  useGetRetroStatusQuery,
  SetRetroNextStatusDocument,
  GetActionItemsDocument,
  CreateActionItemDocument
} from "generated/graphql";

interface IStatusContext {
  cansSwitchStatus: boolean;
  status: string;
  nextStatus: Function;
}

const StatusContext = React.createContext({} as IStatusContext);

const SubscribeToStatus = ({ children, subscribeToStatus }) => {
  useEffect(() => {
    subscribeToStatus();
  }, [subscribeToStatus]);

  return children;
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

const StatusProvider = ({ children }) => {
  const slug = useSlug();
  const [cansSwitchStatus, setCansSwitchStatus] = useState(false);
  const [status, setStatus] = useState("initial");
  const { subscribeToMore, data, loading, error } = useGetRetroStatusQuery({
    variables: { slug }
  });

  const nextStatus = () => {
    // When changing from `initial` to `review` we want to clone the previous action items that are not done
    if (status === "initial") {
      copyPreviousActionItemsThatAreNotDone(slug);
    }

    client
      .mutate({ mutation: SetRetroNextStatusDocument, variables: { slug } })
      .then(({ data }) => setStatus(data.nextStep.status));
  };

  if (loading) return null;
  if (error) return null;

  return (
    <SubscribeToStatus
      subscribeToStatus={() => {
        const currentStatus =
          data && data.retro ? data.retro.status : "initial";

        setStatus(currentStatus);

        if (data) {
          // @ts-ignore
          let { improve, others, status, works } = data.retro;
          let itemsAvailable =
            !!works.length || !!improve.length || !!others.length;

          let hasVotes = [...improve, ...others, ...works].some(
            ({ votes }) => !!votes
          );

          if (status === "initial") {
            setCansSwitchStatus(itemsAvailable);
          } else if (status === "review") {
            setCansSwitchStatus(hasVotes);
          } else {
            setCansSwitchStatus(true);
          }
        }

        subscribeToMore({
          document: OnStatusUpdatedDocument,
          variables: { slug },
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

              let hasVotes = [...improve, ...others, ...works].some(
                ({ votes }) => !!votes
              );

              if (status === "initial") {
                setCansSwitchStatus(itemsAvailable);
              } else if (status === "review") {
                // TODO: do we really want to avoid going to the next step if there's no votes?
                setCansSwitchStatus(hasVotes);
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
      <StatusContext.Provider value={{ cansSwitchStatus, status, nextStatus }}>
        {children}
      </StatusContext.Provider>
    </SubscribeToStatus>
  );
};

const useStatus = () => {
  const context = useContext(StatusContext);

  if (!context) {
    throw new Error("useStatus must be used within a StatusProvider");
  }

  return context;
};

export { StatusProvider, useStatus };
