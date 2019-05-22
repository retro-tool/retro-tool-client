import React from "react";
import { HeaderContainer, Logo, Text } from "components";
import { PageHeaderContainer } from "components/Header";
import styled from "styled-components/macro";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { client } from "services/api";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "types";
import gql from "graphql-tag";

const Content = styled.div`
  margin: 16px;
`;

const GET_ITEMS = gql`
  query Retro($slug: String) {
    retro(slug: $slug) {
      works {
        id
        title
      }
      improve {
        id
        title
      }
      others {
        id
        title
      }
      actionItems {
        id
        title
      }
    }
  }
`;

const Items = ({ slug }: Props) => {
  const { error, loading, data } = useQuery(GET_ITEMS, {
    variables: { slug }
  });

  if (loading || error) return null;

  const {
    retro: { works, improve, others, actionItems }
  } = data;

  return (
    <Content>
      <div>
        <Text size="title">Works</Text>
        {works.length && (
          <ul>
            {works.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <Text size="title">Improve</Text>
        {improve.length && (
          <ul>
            {improve.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <Text size="title">Others</Text>
        {others.length && (
          <ul>
            {others.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <Text size="title">Action Items</Text>
        {actionItems.length && (
          <ul>
            {actionItems.map(({ id, title }) => (
              <li key={id}>
                <Text>{title}</Text>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Content>
  );
};

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Export = ({ slug }: Props) => (
  <ApolloProvider client={client}>
    <>
      <PageHeaderContainer>
        <HeaderContainer>
          <Logo />
        </HeaderContainer>
      </PageHeaderContainer>
      <div>
        <Items slug={slug} />
      </div>
    </>
  </ApolloProvider>
);

export default Export;
