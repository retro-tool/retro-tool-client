import React from "react";
import { client } from "services/api";
import { ApolloProvider } from "@apollo/react-hooks";
import { useCreateRetroQuery } from "generated/graphql";
import { Redirect } from "@reach/router";
import { RouteComponentProps } from "@reach/router";

const RedirectToRetro = () => {
  const { data, loading, error } = useCreateRetroQuery();

  if (loading) return null;
  if (error) return null;
  if (!data || !data.retro) return null;

  return <Redirect noThrow to={`/${data.retro.slug}`} />;
};

const CreateRetro = (props: RouteComponentProps) => (
  <ApolloProvider client={client}>
    <RedirectToRetro />
  </ApolloProvider>
);

export default CreateRetro;
