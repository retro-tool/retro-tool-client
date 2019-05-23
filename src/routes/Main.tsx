import React from "react";
import { subscriptionClient } from "services/api";
import { ApolloProvider } from "react-apollo";
import { useUserId } from "hooks";
import { Header, Content, StatusProvider } from "components";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "../types";

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Main = (props: Props) => {
  const uuid = useUserId();

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
