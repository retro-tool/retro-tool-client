import React, { ReactNode, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { Text, CreateActionItem, CreateItem, StageContext } from "./";
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
import { Topic as TopicType } from "../types";

type TopicContainerProps = SpaceProps &
  MinWidthProps & {
    disabled?: boolean;
  };
const TopicContainer = styled.div<TopicContainerProps>`
  flex: 1;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
  background: #fff;
  border-radius: 4px;
  opacity: ${({ disabled }) => disabled && ".4"};
  pointer-events: ${({ disabled }) => disabled && "none"};

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
  topic?: TopicType;
  subscribeToNewItems: () => {};
  children?: ReactNode;
}

const Topic = ({ title, children, subscribeToNewItems, topic }: TopicProps) => {
  useEffect(() => {
    subscribeToNewItems();
  });

  const { stage } = useContext(StageContext);

  return (
    <TopicContainer disabled={!topic && stage !== "actions"}>
      <Title>
        <Text fontSize={4} pt={1}>
          {title}
        </Text>
        {topic ? <CreateItem topic={topic} /> : <CreateActionItem />}
      </Title>
      {children}
    </TopicContainer>
  );
};

export default Topic;
