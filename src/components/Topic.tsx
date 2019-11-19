import React, { ReactNode, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { CreateActionItem, CreateItem, StatusContext } from "components";
import { space, SpaceProps, minWidth, MinWidthProps } from "styled-system";
import { Topic as TopicType } from "types";

interface TopicContainerProps extends SpaceProps, MinWidthProps {
  disabled?: boolean;
}
export const TopicContainer = styled.div.attrs({
  m: [1, 2],
  minWidth: ["90%", "40%", null, null, 0]
})<TopicContainerProps>`
  flex: 1;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
  background: white;
  border-radius: 4px;
  opacity: ${({ disabled }) => disabled && ".4"};
  pointer-events: ${({ disabled }) => disabled && "none"};

  ${minWidth};
  ${space};
`;

type TitleProps = SpaceProps;
const Title = styled.div.attrs<TitleProps>({
  p: [3, null, null, null, 4]
})`
  display: flex;
  align-items: flex-start;

  ${space}
`;

const TitleIcon = styled.div`
  margin-top: 2px;
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
      {children}
    </TopicContainer>
  );
};

export default Topic;
