import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";

import { subscriptionClient } from "services/api";
import { useUserId } from "hooks";
import { Header } from "components/Header";
import Content from "components/Content";
import { StatusProvider } from "components/StatusProvider";
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
        <Header />
        <Content />
      </StatusProvider>
    </ApolloProvider>
  );
};

export default Main;
