import React from "react";
import styled, { css } from "styled-components/macro";
import { ActionItems, Items } from "components";
import { TopicContainer } from "components/Topic";
import { height, HeightProps, space, SpaceProps } from "styled-system";
import { SmileyHappy } from "styled-icons/boxicons-solid/SmileyHappy";
import { SmileySad } from "styled-icons/boxicons-solid/SmileySad";
import { QuestionAnswer } from "styled-icons/material/QuestionAnswer";
import { CheckBox } from "styled-icons/material/CheckBox";

interface ContainerProps extends HeightProps, SpaceProps {}

const ContentContainer = styled.div.attrs<ContainerProps>({
  height: ["calc(100vh - 50px)", null, null, "calc(100vh - 86px)"],
  px: [1, 2],
  py: [2, 2]
})`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  ${height};
  ${space};
`;

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
