import React, { ReactNode, useEffect } from "react";
import styled from "styled-components/macro";
import { Text, CreateItem } from "./";
import {
  space,
  SpaceProps,
  minWidth,
  MinWidthProps,
  borderColor,
  BorderColorProps,
  borderBottom,
  BorderBottomProps
} from "styled-system";
import { Slug } from "../types";

type TopicContainerProps = SpaceProps & MinWidthProps;
const TopicContainer = styled.div<TopicContainerProps>`
  flex: 1;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
  background: #fff;
  border-radius: 4px;

  ${minWidth};
  ${space};
`;

TopicContainer.defaultProps = {
  m: [1, 2],
  minWidth: ["90%", "40%", null, null, 0]
};

type TitleProps = BorderColorProps & BorderBottomProps & SpaceProps;
const Title = styled.div<TitleProps>`
  display: flex;
  align-items: flex-start;

  ${borderBottom}
  ${borderColor}
  ${space}
`;
Title.defaultProps = {
  borderColor: "borderGrey",
  borderBottom: "1px solid",
  pl: [4, null, null, null, 6],
  pr: [4, null, null, null, 6],
  pt: [2, null, null, null, 3],
  pb: [2, null, null, null, 3],
  mb: 3
};

interface TopicProps {
  title: string;
  slug: Slug;
  subscribeToNewItems: () => {};
  children?: ReactNode;
}

const Topic = ({ title, children, slug, subscribeToNewItems }: TopicProps) => {
  useEffect(() => {
    subscribeToNewItems();
  });

  return (
    <TopicContainer>
      <Title>
        <Text fontSize={4} pt={1}>
          {title}
        </Text>
        <CreateItem topic="works" slug={slug} />
      </Title>
      {children}
    </TopicContainer>
  );
};

export default Topic;
