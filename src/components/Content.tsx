import React from "react";
import styled, { css } from "styled-components/macro";
import { SmileyHappy } from "styled-icons/boxicons-solid/SmileyHappy";
import { SmileySad } from "styled-icons/boxicons-solid/SmileySad";
import { QuestionAnswer } from "styled-icons/material/QuestionAnswer";
import { CheckBox } from "styled-icons/material/CheckBox";

import { Flex } from "./UI";
import { ActionItems, Items } from "components";
import { useStatus } from "components/StatusProvider";
import { ContentSkeleton } from "components/Skeleton";

export const ContentContainer = styled(Flex).attrs({
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

export const WorksIcon = styled(SmileyHappy)`
  ${sharedIconStyles}
`;

export const ImproveIcon = styled(SmileySad)`
  ${sharedIconStyles}
`;

export const OthersIcon = styled(QuestionAnswer)`
  ${sharedIconStyles}
`;

export const ActionItemsIcon = styled(CheckBox)`
  ${sharedIconStyles}
`;

const Content = () => {
  const { status } = useStatus();

  if (status === "password-protected") {
    return <ContentSkeleton />;
  }

  return (
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
};

export default Content;
