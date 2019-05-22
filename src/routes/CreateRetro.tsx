import React from "react";
import gql from "graphql-tag";
import { client } from "services/api";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { Redirect } from "@reach/router";
import { RouteComponentProps } from "@reach/router";

const CREATE_RETRO_QUERY = gql`
  query {
    retro(slug: null) {
      slug
    }
  }
`;

const RedirectToRetro = () => {
  const { data, loading, error } = useQuery(CREATE_RETRO_QUERY);
  if (loading) return null;
  if (error) return null;

  return <Redirect noThrow to={`/${data.retro.slug}`} />;
};

const CreateRetro = (props: RouteComponentProps) => (
  <ApolloProvider client={client}>
    <RedirectToRetro />
  </ApolloProvider>
);

export default CreateRetro;
