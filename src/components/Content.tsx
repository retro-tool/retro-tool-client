import React from "react";
import styled, { css } from "styled-components/macro";
import { ActionItems, Items } from "components";
import { SmileyHappy } from "styled-icons/boxicons-solid/SmileyHappy";
import { SmileySad } from "styled-icons/boxicons-solid/SmileySad";
import { QuestionAnswer } from "styled-icons/material/QuestionAnswer";
import { CheckBox } from "styled-icons/material/CheckBox";
import { Flex } from "./UI";

const ContentContainer = styled(Flex).attrs({
  height: ["calc(100vh - 60px)", null, null, "calc(100vh - 96px)"],
  px: [1, 2],
  py: [1, 2]
})`
  flex-wrap: wrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const sharedIconStyles = css`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.mediumGrey};
  transition: color 0.2s ease;
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
