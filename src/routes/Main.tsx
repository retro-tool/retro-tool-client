import React, { useEffect, useState, useContext } from "react";
import { client, subscriptionClient } from "../services/api";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import {
  Header,
  Content,
  SlugContext,
  StatusProvider,
  UserProvider
} from "../components";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "../types";

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Main = ({ slug }: Props) => {
  const { setSlug } = useContext(SlugContext);
  const [uuid, setUuid] = useState(null);

  const setUserUuid = async () => {
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
  };

  useEffect(() => {
    slug && setSlug(slug);

    setUserUuid();
  }, [slug]);

  if (!uuid) return null;

  return (
    <ApolloProvider client={subscriptionClient(uuid)}>
      <UserProvider>
        <StatusProvider>
          <>
            <Header />
            <Content />
          </>
        </StatusProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default Main;
