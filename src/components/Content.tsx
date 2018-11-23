import React, { Suspense } from "react";
import styled from "styled-components/macro";
import { ActionItems, Items, LoadingCard } from "./";
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
    <Suspense fallback={<LoadingCard />}>
      <Items topic="works" title="😃" placeholder="It worked well that..." />
    </Suspense>
    <Suspense fallback={<LoadingCard />}>
      <Items topic="improve" title="🤨" placeholder="We could improve..." />
    </Suspense>
    <Suspense fallback={<LoadingCard />}>
      <Items topic="others" title="🤔" placeholder="I want to ask about..." />
    </Suspense>
    <Suspense fallback={<LoadingCard />}>
      <ActionItems title="✅" />
    </Suspense>
  </ContentContainer>
);

export default Content;
