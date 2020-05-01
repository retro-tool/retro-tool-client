import React from "react";
import { Header, Text, StatusProvider } from "components";
import styled from "styled-components/macro";
import { useGetRetroItemsQuery } from "generated/graphql";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "services/api";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "types";

const Content = styled.div`
  margin: 16px;
`;

const Items = ({ slug }) => {
  const { data, loading, error } = useGetRetroItemsQuery({
    variables: { slug }
  });

  if (loading || error) return null;

  const {
    // @ts-ignore
    retro: { works, improve, others, actionItems }
  } = data;

  return (
    <Content>
      {works.length ? (
        <div>
          <Text textStyle="title">Works</Text>
          <ul>
            {works.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {improve.length ? (
        <div>
          <Text textStyle="title">Improve</Text>
          <ul>
            {improve.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {others.length ? (
        <div>
          <Text textStyle="title">Others</Text>
          <ul>
            {others.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {actionItems.length ? (
        <div>
          <Text textStyle="title">Action Items</Text>
          <ul>
            {actionItems.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Content>
  );
};

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Export = ({ slug }: Props) => (
  <ApolloProvider client={client}>
    <StatusProvider>
      <Header isExport />
    </StatusProvider>
    <div>
      <Items slug={slug} />
    </div>
  </ApolloProvider>
);

export default Export;
