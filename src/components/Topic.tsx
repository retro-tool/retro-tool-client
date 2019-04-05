import React, { ReactNode, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { Text, CreateActionItem, CreateItem, StatusContext } from "./";
import { space, SpaceProps, minWidth, MinWidthProps } from "styled-system";
import { Topic as TopicType } from "../types";

interface TopicContainerProps extends SpaceProps, MinWidthProps {
  disabled?: boolean;
}
export const TopicContainer = styled.div.attrs({
  m: [1, 2],
  minWidth: ["90%", "40%", null, null, 0]
})<TopicContainerProps>`
  position: relative;
  flex: 1;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
  background: white;
  border-radius: 4px;
  opacity: ${({ disabled }) => disabled && ".4"};
  pointer-events: ${({ disabled }) => disabled && "none"};

  ${minWidth};
  ${space};

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    height: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    background: linear-gradient(
      to top,
      white,
      rgba(255, 255, 255, 0.8) 20%,
      rgba(255, 255, 255, 0)
    );
  }
`;

type TitleProps = SpaceProps;
const Title = styled.div.attrs<TitleProps>({
  p: [3, null, null, null, 4]
})`
  position: relative;
  display: flex;
  align-items: flex-start;

  ${space}

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    height: 10px;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(
      to bottom,
      white,
      rgba(255, 255, 255, 0.8) 20%,
      rgba(255, 255, 255, 0)
    );
  }
`;

const TitleIcon = styled.div`
  margin-top: 2px;
`;

interface ItemsContainerProps extends SpaceProps {}
const ItemsContainer = styled.div.attrs({
  pb: 2
})<ItemsContainerProps>`
  max-height: calc(100vh - 182px);
  overflow: scroll;

  ${space}
`;

interface TopicProps {
  title: React.ReactNode;
  topic?: TopicType;
  subscribeToNewItems: () => {};
  children?: ReactNode;
  placeholder?: string;
}

const Topic = ({
  title,
  children,
  subscribeToNewItems,
  topic,
  placeholder
}: TopicProps) => {
  useEffect(() => {
    subscribeToNewItems();
  });

  const { status } = useContext(StatusContext);
  const statusesWithActions = ["actions", "final"];
  const statusesWithTopics = ["initial", "review", "actions"];

  return (
    <TopicContainer
      disabled={
        (topic && statusesWithTopics.indexOf(status) < 0) ||
        (!topic && statusesWithActions.indexOf(status) < 0)
      }
    >
      <Title>
        <TitleIcon>{title}</TitleIcon>
        {topic ? (
          <CreateItem topic={topic} placeholder={placeholder} />
        ) : (
          <CreateActionItem />
        )}
      </Title>
      <ItemsContainer>{children}</ItemsContainer>
    </TopicContainer>
  );
};

export default Topic;
