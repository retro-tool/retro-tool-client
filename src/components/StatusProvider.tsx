import React, { useEffect, useState } from "react";
import { client } from "services/api";
import { useSlug } from "components/Slug.context";
import {
  OnStatusUpdatedDocument,
  useGetRetroStatusQuery,
  SetRetroNextStatusDocument
} from "generated/graphql";

const StatusContext = React.createContext({
  cansSwitchStatus: false,
  status: "",
  nextStatus: () => {}
});

const SubscribeToStatus = ({ children, subscribeToStatus }) => {
  useEffect(() => {
    subscribeToStatus();
  }, [subscribeToStatus]);

  return children;
};

const StatusProvider = ({ children }) => {
  const slug = useSlug();
  const [cansSwitchStatus, setCansSwitchStatus] = useState(false);
  const [status, setStatus] = useState("initial");
  const { subscribeToMore, data, loading, error } = useGetRetroStatusQuery({
    variables: { slug }
  });

  const nextStatus = () => {
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

export { StatusProvider, StatusContext };
