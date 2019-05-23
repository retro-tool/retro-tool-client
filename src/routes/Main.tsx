import React, { useEffect, useState } from "react";
import { client, subscriptionClient } from "services/api";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { Header, Content, StatusProvider } from "components";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "../types";

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

type Uuid = string;

const Main = ({ slug }: Props) => {
  const [uuid, setUuid] = useState<Uuid | null>(null);

  const setUserUuid = React.useCallback(async () => {
    await client.query({
      query: gql`
          {
            retro (slug: "${slug}") {
              slug
            }
          }
        `
    });

    if (window.localStorage && localStorage.getItem("uuid") !== null) {
      setUuid(localStorage.getItem("uuid"));
    } else {
      const uuid = await client.query({
        query: gql`
          {
            currentUser (retroSlug: "${slug}") {
              uuid
            }
          }
        `
      });

      setUuid(uuid.data.currentUser.uuid);
      if (window.localStorage) {
        localStorage.setItem("uuid", uuid.data.currentUser.uuid);
      }
    }
  }, [slug]);

  useEffect(() => {
    setUserUuid();
  }, [slug, setUserUuid]);

  if (!uuid) return null;

  return (
    <ApolloProvider client={subscriptionClient(uuid)}>
      <StatusProvider>
        <>
          <Header />
          <Content />
        </>
      </StatusProvider>
    </ApolloProvider>
  );
};

export default Main;
