import React, { useContext, useEffect, useState } from "react";
import { client } from "../services/api";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SlugContext } from "./SlugProvider";
import { Slug, Stage } from "../types";

const StageContext = React.createContext({
  stage: "",
  nextStage: () => {}
});

const CURRENT_STAGE = gql`
  query CurrentStep($slug: String!) {
    retro(slug: $slug) {
      status
    }
  }
`;

const SUBSCRIBE_TO_STAGE = gql`
  subscription onStageUpdated($slug: String!) {
    retroUpdated(slug: $slug) {
      status
    }
  }
`;

const NEXT_STAGE = gql`
  mutation NextStep($slug: String!) {
    nextStep(slug: $slug) {
      status
    }
  }
`;

interface Data {
  retro: {
    status: Stage;
  };
  retroUpdated?: {
    status: Stage;
  };
}

interface Variables {
  slug: Slug;
}

class StageQuery extends Query<Data, Variables> {}

const SubscribeToStage = ({ children, subscribeToStage }) => {
  useEffect(() => {
    subscribeToStage();
  }, []);

  return children;
};

const StageProvider = ({ children }) => {
  const { slug } = useContext(SlugContext);
  const [stage, setStage] = useState("initial");

  const nextStage = () => {
    client
      .mutate({ mutation: NEXT_STAGE, variables: { slug } })
      .then(({ data }) => setStage(data.nextStep.status));
  };

  return (
    <StageQuery query={CURRENT_STAGE} variables={{ slug }}>
      {({ subscribeToMore, ...result }) => {
        if (result.loading) return null;
        if (result.error) return null;

        return (
          <SubscribeToStage
            subscribeToStage={() => {
              const currentStage = result.data
                ? result.data.retro.status
                : "initial";

              setStage(currentStage);

              subscribeToMore({
                document: SUBSCRIBE_TO_STAGE,
                variables: { slug },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  const status = subscriptionData.data.retroUpdated
                    ? subscriptionData.data.retroUpdated.status
                    : prev.retro.status;

                  if (status && currentStage !== status) {
                    setStage(status);
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
            <StageContext.Provider value={{ stage, nextStage }}>
              {children}
            </StageContext.Provider>
          </SubscribeToStage>
        );
      }}
    </StageQuery>
  );
};

export { StageProvider, StageContext };
