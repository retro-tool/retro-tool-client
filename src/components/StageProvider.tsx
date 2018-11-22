import React, { useContext, useEffect, useState } from "react";
import { client } from "../services/api";
import gql from "graphql-tag";
import { SlugContext } from "./SlugProvider";

export const StageContext = React.createContext({
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

const NEXT_STAGE = gql`
  mutation NextStep($slug: String!) {
    nextStep(slug: $slug) {
      status
    }
  }
`;

export default ({ children }) => {
  const [stage, setStage] = useState("");
  const { slug } = useContext(SlugContext);

  useEffect(
    () => {
      !!slug &&
        client
          .query({ query: CURRENT_STAGE, variables: { slug } })
          // @ts-ignore
          .then(({ data }) => setStage(data.retro.status));
    },
    [slug]
  );

  const nextStage = () => {
    client
      .mutate({ mutation: NEXT_STAGE, variables: { slug } })
      // @ts-ignore
      .then(({ data }) => setStage(data.nextStep.status));
  };

  return (
    <StageContext.Provider value={{ stage, nextStage }}>
      {children}
    </StageContext.Provider>
  );
};
