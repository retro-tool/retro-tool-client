import React from "react";
import { Redirect } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
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
  <CreateRetroQuery query={CREATE_RETRO_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return null;
      if (error) return null;

      // @ts-ignore
      return <Redirect noThrow to={`/${data.retro.slug}`} />;
    }}
  </CreateRetroQuery>
);

export default CreateRetro;
