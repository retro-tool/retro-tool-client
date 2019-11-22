import React, { ReactNode, useEffect } from "react";
import styled from "styled-components/macro";
import { CreateActionItem, CreateItem, useStatus } from "components";
import { Topic as TopicType } from "types";
import { Box, BoxType, Flex } from "./UI";

interface TopicContainerProps extends BoxType {
  disabled?: boolean;
}

export const TopicContainer = styled(Box).attrs({
  m: [1, 2],
  minWidth: ["90%", "40%", null, null, 0],
  boxShadow: 0,
  borderRadius: 1,
  bg: "white"
})<TopicContainerProps>`
  flex: 1;
  opacity: ${({ disabled }) => disabled && ".4"};
  pointer-events: ${({ disabled }) => disabled && "none"};
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
  }, [subscribeToNewItems]);

  const { status } = useStatus();

  const statusesWithActions = ["actions", "final"];
  const statusesWithTopics = ["initial", "review", "actions"];

  const topicDoesntExistInStatus =
    topic && statusesWithTopics.indexOf(status) < 0;
  const actionItemsShouldBeDisabled =
    !topic && statusesWithActions.indexOf(status) < 0;

  return (
    <TopicContainer disabled={topicDoesntExistInStatus}>
      <Flex p={[3, null, null, null, 4]} alignItems="center">
        {topic ? (
          <CreateItem topic={topic} placeholder={placeholder} />
        ) : (
          <CreateActionItem disabled={actionItemsShouldBeDisabled} />
        )}
        <Flex order={-1}>{title}</Flex>
      </Flex>
      {children}
    </TopicContainer>
  );
};

export default Topic;
