import React from "react";
import gql from "graphql-tag";
import { client } from "services/api";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import { Redirect } from "@reach/router";
import { RouteComponentProps } from "@reach/router";

interface Data {
  retro: {
    slug: string;
  };
}

class CreateRetroQuery extends Query<Data, {}> {}

const CREATE_RETRO_QUERY = gql`
  query {
    retro(slug: null) {
      slug
    }
  }
`;

const CreateRetro = (props: RouteComponentProps) => (
  <ApolloProvider client={client}>
    <CreateRetroQuery query={CREATE_RETRO_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return null;
        if (error) return null;

        // @ts-ignore
        return <Redirect noThrow to={`/${data.retro.slug}`} />;
      }}
    </CreateRetroQuery>
  </ApolloProvider>
);

export default CreateRetro;
