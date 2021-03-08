import React from "react";
import styled from "styled-components/macro";
import { RouteComponentProps } from "@reach/router";

import { Header } from "components/Header";
import { Text } from "components/Text";
import { StatusProvider } from "components/StatusProvider";

import { Slug } from "types";
import { useGetRetroItemsQuery } from "generated/graphql";

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
  <>
    <StatusProvider>
      <Header isExport />
    </StatusProvider>
    <div>
      <Items slug={slug} />
    </div>
  </>
);

export default Export;
