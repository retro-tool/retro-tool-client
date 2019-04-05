import React from "react";
import styled, { css } from "styled-components/macro";
import { About, ActionItems, Items } from "./";
import { TopicContainer } from "./Topic";
import { space, SpaceProps } from "styled-system";
import { SmileyHappy } from "styled-icons/boxicons-solid/SmileyHappy";
import { SmileySad } from "styled-icons/boxicons-solid/SmileySad";
import { QuestionAnswer } from "styled-icons/material/QuestionAnswer";
import { CheckBox } from "styled-icons/material/CheckBox";

type ContainerProps = SpaceProps;
const ContentContainer = styled.div.attrs<ContainerProps>({
  px: [1, 2],
  py: [2, 2]
})`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 86px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

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

const LasColumnContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface FooterProps extends SpaceProps {}
const Footer = styled.div.attrs({
  m: [1, 2],
  p: [3, null, null, null, 4]
})<FooterProps>`
  position: absolute;
  display: flex;
  bottom: 0;
  right: 0;

  ${space};
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
    <LasColumnContainer>
      <ActionItems title={<ActionItemsIcon />} />
      <Footer>
        <About />
      </Footer>
    </LasColumnContainer>
  </ContentContainer>
);

export default Content;
