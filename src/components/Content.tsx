import React from "react";
import styled, { css } from "styled-components/macro";
import { ActionItems, Items } from "./";
import { TopicContainer } from "./Topic";
import { space, SpaceProps } from "styled-system";
import { SmileyHappy } from "styled-icons/boxicons-solid/SmileyHappy";
import { SmileySad } from "styled-icons/boxicons-solid/SmileySad";
import { QuestionAnswer } from "styled-icons/material/QuestionAnswer";
import { CheckBox } from "styled-icons/material/CheckBox";

type ContainerProps = SpaceProps;
const ContentContainer = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 44px);
  ${space};
`;
ContentContainer.defaultProps = {
  p: [1, 2]
};

const sharedIconStyles = css`
  width: 24px;
  color: ${({ theme }) => theme.colors.mediumGrey};
  transition: color 0.2s ease;

  ${TopicContainer}:hover & {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const WorksIcon = styled(SmileyHappy)`
  ${sharedIconStyles}
`;

const ImproveIcon = styled(SmileySad)`
  ${sharedIconStyles}
`;

const OthersIcon = styled(QuestionAnswer)`
  ${sharedIconStyles}
`;

const ActionItemsIcon = styled(CheckBox)`
  ${sharedIconStyles}
`;

const Content = () => (
  <ContentContainer>
    <Items
      topic="works"
      title={<WorksIcon />}
      placeholder="It worked well that..."
    />
    <Items
      topic="improve"
      title={<ImproveIcon />}
      placeholder="We could improve..."
    />
    <Items
      topic="others"
      title={<OthersIcon />}
      placeholder="I want to ask about..."
    />
    <ActionItems title={<ActionItemsIcon />} />
  </ContentContainer>
);

export default Content;
