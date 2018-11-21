import React, { ReactNode, useEffect } from "react";
import styled from "styled-components/macro";
import { Text, Input } from "./";
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
  subscribeToNewItems: () => {};
  children?: ReactNode;
}
const onSubmit = (target: any): void => {
  console.log(target.value);
};

const Topic = ({ title, children, subscribeToNewItems }: TopicProps) => {
  useEffect(() => {
    subscribeToNewItems();
  });

  return (
    <TopicContainer>
      <Title>
        <Text fontSize={4} pt={1}>
          {title}
        </Text>
        <Input ml={2} flex="1 1 auto" onSubmit={onSubmit} />
      </Title>
      {children}
    </TopicContainer>
  );
};

export default Topic;
