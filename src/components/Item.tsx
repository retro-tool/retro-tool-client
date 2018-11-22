import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { Text, PlusOne } from "./";
import { space, SpaceProps } from "styled-system";
import theme from "../theme";
import randomText from "random-textblock";

const randomTextConfig = {
  minWords: 3,
  maxWords: 8,
  minSentences: 1,
  maxSentences: 1
};

type ItemContainerProps = SpaceProps;
const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  &:hover:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: ${theme.colors.borderGrey};
  }

  ${space};
`;
ItemContainer.defaultProps = {
  p: [3, null, null, null, 4]
};

type ItemProps = {
  children?: ReactNode;
  hidden?: boolean;
};
const Item = ({ children, hidden }: ItemProps) => (
  <ItemContainer>
    {hidden ? (
      <Text obfuscate={hidden}>
        {randomText.getTextBlock(randomTextConfig)}
      </Text>
    ) : (
      <Text>{children}</Text>
    )}
    <PlusOne hidden={hidden} />
  </ItemContainer>
);

export default Item;
