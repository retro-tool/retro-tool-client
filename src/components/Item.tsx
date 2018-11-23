import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import theme from "../theme";
import randomText from "random-textblock";
import { space, SpaceProps } from "styled-system";
import { Text, PlusOne } from "./";

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
  align-items: flex-start;
  position: relative;

  ${space};

  &:hover:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: ${theme.colors.borderGrey};
  }
`;
ItemContainer.defaultProps = {
  pl: [3, null, null, null, 4],
  pr: [3, null, null, null, 4],
  pt: [3, null, null, null, 3],
  pb: [3, null, null, null, 3]
};

type ItemProps = {
  children?: ReactNode;
  hidden?: boolean;
  id: string;
  votes: number;
};
const Item = ({ children, id, hidden, votes }: ItemProps) => (
  <ItemContainer>
    {hidden ? (
      <Text obfuscate={hidden}>
        {randomText.getTextBlock(randomTextConfig)}
      </Text>
    ) : (
      <Text>{children}</Text>
    )}
    <PlusOne id={id} votes={votes} />
  </ItemContainer>
);

export default Item;
