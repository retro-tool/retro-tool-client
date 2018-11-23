import React, { Suspense, useEffect, useState, useContext } from "react";
import { client, subscriptionClient } from "../services/api";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { Header, Content, SlugContext } from "../components";
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

    client
      .query({
        query: gql`
          {
            currentUser (retroSlug: "${props.slug}") {
              uuid
            }
          }
        `
      })
      // @ts-ignore
      .then(({ data: { currentUser: { uuid } } }) => setUuid(uuid));
  }, []);

  if (!uuid) return null;

  return (
    <ApolloProvider client={subscriptionClient(uuid)}>
      <>
        <Header />
        <Suspense fallback={null}>
          <Content />
        </Suspense>
      </>
    </ApolloProvider>
  );
};

export default Main;
