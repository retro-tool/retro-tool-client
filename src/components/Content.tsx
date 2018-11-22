import React, { Suspense } from "react";
import styled from "styled-components/macro";
import { Items } from "./";
import { space, SpaceProps } from "styled-system";
import { Stage } from "../types";

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

interface Props {
  stage?: Stage;
  slug: string;
}
const Content = ({ slug, stage }: Props) => (
  <ContentContainer>
    <Suspense fallback={<div>Loading...</div>}>
      <Items topic="works" slug={slug} title="😃" />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <Items topic="improve" slug={slug} title="🤨" />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <Items topic="others" slug={slug} title="🤔" />
    </Suspense>
  </ContentContainer>
);

Content.defaultProps = {
  stage: "initial"
};

export default Content;
