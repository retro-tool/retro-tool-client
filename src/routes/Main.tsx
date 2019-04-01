import React, { Suspense, useEffect, useState, useContext } from "react";
import { client, subscriptionClient } from "../services/api";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import {
  Header,
  Content,
  SlugContext,
  StageProvider,
  UserProvider
} from "../components";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "../types";

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Main = (props: Props) => {
  const { setSlug } = useContext(SlugContext);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    // @ts-ignore
    setSlug(props.slug);

    (async () => {
      await client.query({
        query: gql`
            {
              retro (slug: "${props.slug}") {
                slug
              }
            }
          `
      });

      const uuid = await client.query({
        query: gql`
            {
              currentUser (retroSlug: "${props.slug}") {
                uuid
              }
            }
          `
      });

      //@ts-ignore
      setUuid(uuid.data.currentUser.uuid);
    })();
  }, []);

  if (!uuid) return null;

  return (
    <ApolloProvider client={subscriptionClient(uuid)}>
      <UserProvider>
        <StageProvider>
          <>
            <Header />
            <Suspense fallback={null}>
              <Content />
            </Suspense>
          </>
        </StageProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default Main;
