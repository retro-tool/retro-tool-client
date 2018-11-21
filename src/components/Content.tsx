import React, { Suspense } from "react";
import styled from "styled-components/macro";
import { Stage } from "../types";
// import { Item, Topic } from "./";
import { Works } from "./topics";
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

interface Props {
  stage?: Stage;
}
const Content = ({ stage }: Props) => (
  <ContentContainer>
    <Suspense fallback={<div>Loading...</div>}>
      <Works />
    </Suspense>
    {/* <Topic title="🤨">
      {[
        <Item key={22344}>Primer item en {stage}</Item>,
        <Item key={5454}>Segundo item en {stage}</Item>
      ]}
    </Topic>
    <Topic title="🤔">
      {[
        <Item key={5433}>Primer item en {stage}</Item>,
        <Item key={266}>Segundo item en {stage}</Item>
      ]}
    </Topic>
    <Topic title="✅">
      {[
        <Item key={245555}>Primer item en {stage}</Item>,
        <Item key={567667}>Segundo item en {stage}</Item>
      ]}
    </Topic> */}
  </ContentContainer>
);

Content.defaultProps = {
  stage: "initial"
};

export default Content;
