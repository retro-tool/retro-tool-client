import React, { useContext, useEffect, useState } from "react";
import { client } from "../services/api";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SlugContext } from "./SlugProvider";
import { Slug, Status } from "../types";

const StatusContext = React.createContext({
  cansSwitchStatus: false,
  status: "",
  nextStatus: () => {}
});

const CURRENT_STATUS = gql`
  query CurrentStatus($slug: String!) {
    retro(slug: $slug) {
      status
      works {
        id
        votes
      }
      improve {
        id
        votes
      }
      others {
        id
        votes
      }
    }
  }
`;

const SUBSCRIBE_TO_STATUS = gql`
  subscription onStatusUpdated($slug: String!) {
    retroUpdated(slug: $slug) {
      status
      works {
        id
        votes
      }
      improve {
        id
        votes
      }
      others {
        id
        votes
      }
    }
  }
`;

const NEXT_STATUS = gql`
  mutation NextStatus($slug: String!) {
    nextStep(slug: $slug) {
      status
    }
  }
`;

interface Data {
  retro: {
    status: Status;
    improve: [];
    others: [];
    works: [];
  };
  retroUpdated?: {
    status: Status;
    improve: [];
    others: [];
    works: [];
  };
}

interface Variables {
  slug: Slug;
}

class StatusQuery extends Query<Data, Variables> {}

const SubscribeToStatus = ({ children, subscribeToStatus }) => {
  useEffect(() => {
    subscribeToStatus();
  }, []);

  return children;
};

const StatusProvider = ({ children }) => {
  const { slug } = useContext(SlugContext);
  const [cansSwitchStatus, setCansSwitchStatus] = useState(false);
  const [status, setStatus] = useState<Status>("initial");

  const nextStatus = () => {
    client
      .mutate({ mutation: NEXT_STATUS, variables: { slug } })
      .then(({ data }) => setStatus(data.nextStep.status));
  };

  return (
    <StatusQuery query={CURRENT_STATUS} variables={{ slug }}>
      {({ subscribeToMore, ...result }) => {
        if (result.loading) return null;
        if (result.error) return null;

        return (
          <SubscribeToStatus
            subscribeToStatus={() => {
              const currentStatus = result.data
                ? result.data.retro.status
                : "initial";

              setStatus(currentStatus);

              if (result.data) {
                let { improve, others, status, works } = result.data.retro;
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
                document: SUBSCRIBE_TO_STATUS,
                variables: { slug },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  if (subscriptionData.data.retroUpdated) {
                    let {
                      improve,
                      others,
                      status,
                      works
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

                  const status = subscriptionData.data.retroUpdated
                    ? subscriptionData.data.retroUpdated.status
                    : prev.retro.status;

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
              value={{ cansSwitchStatus, status, nextStatus }}
            >
              {children}
            </StatusContext.Provider>
          </SubscribeToStatus>
        );
      }}
    </StatusQuery>
  );
};

export { StatusProvider, StatusContext };
