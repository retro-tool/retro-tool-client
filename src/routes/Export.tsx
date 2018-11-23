import React from "react";
import { HeaderContainer, Logo, Text } from "../components";
import styled from "styled-components/macro";
import { ApolloProvider } from "react-apollo";
import { client } from "../services/api";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "../types";
import { Query } from "react-apollo";
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

interface Data {
  retro?: {
    [key: string]: Array<{
      id: string;
      title: string;
    }>;
  };
}

interface Variables {
  slug: Slug;
}

class QueryItems extends Query<Data, Variables> {}

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Export = ({ slug }: Props) => (
  <ApolloProvider client={client}>
    <>
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
      <div>
        {/*
        // @ts-ignore */}
        <QueryItems query={GET_ITEMS} variables={{ slug }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            const {
              // @ts-ignore
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
          }}
        </QueryItems>
      </div>
    </>
  </ApolloProvider>
);

export default Export;
