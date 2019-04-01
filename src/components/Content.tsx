import React from "react";
import styled from "styled-components/macro";
import { ActionItems, Items } from "./";
import { space, SpaceProps } from "styled-system";

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

const Content = () => (
  <ContentContainer>
    <Items topic="works" title="😃" placeholder="It worked well that..." />
    <Items topic="improve" title="🤨" placeholder="We could improve..." />
    <Items topic="others" title="🤔" placeholder="I want to ask about..." />
    <ActionItems title="✅" />
  </ContentContainer>
);

export default Content;
