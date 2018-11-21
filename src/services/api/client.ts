import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { hasSubscription } from "@jumpn/utils-graphql";
import { InMemoryCache } from "apollo-cache-inmemory";

import absintheSocketLink from "./absintheSocketLink";

const subscriptionLink = uuid =>
  new (ApolloLink.split as any)(
    operation => hasSubscription(operation.query),
    absintheSocketLink(uuid),
    createHttpLink({ uri: "/api/graph" })
  );

const subscriptionClient = uuid =>
  new ApolloClient({
    link: subscriptionLink(uuid),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

const client = new ApolloClient({
  link: createHttpLink({ uri: "/api/graph" }),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export { client, subscriptionClient };
