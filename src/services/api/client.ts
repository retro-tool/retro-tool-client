import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { hasSubscription } from "@jumpn/utils-graphql";
import { InMemoryCache } from "apollo-cache-inmemory";

import absintheSocketLink from "./absintheSocketLink";

const link = new (ApolloLink.split as any)(
  operation => hasSubscription(operation.query),
  absintheSocketLink,
  createHttpLink({ uri: "http://localhost:4000/api" })
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
