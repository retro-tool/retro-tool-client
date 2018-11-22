import React, { Suspense } from "react";
import styled from "styled-components/macro";
import { Items } from "./";
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
    <Suspense fallback={<div>Loading...</div>}>
      <Items topic="works" title="😃" />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <Items topic="improve" title="🤨" />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <Items topic="others" title="🤔" />
    </Suspense>
  </ContentContainer>
);

export default Content;
