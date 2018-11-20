import React, { ReactNode } from "react";
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

  ${borderBottom}
  ${borderColor}
  ${space}
`;
Title.defaultProps = {
  borderColor: "borderGrey",
  borderBottom: "1px solid",
  p: [4, null, null, null, 6]
};

interface TopicProps {
  title: string;
  children?: ReactNode;
}
const Topic = ({ title, children }: TopicProps) => (
  <TopicContainer>
    <Title>
      <Text size="title">{title}</Text>
      <Input ml={3} />
    </Title>
    {children}
  </TopicContainer>
);

export default Topic;
