import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { themeGet } from "styled-system";
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
  ${space};
`;
ItemContainer.defaultProps = {
  pl: [3, null, null, null, 4],
  pr: [3, null, null, null, 4],
  pt: [3, null, null, null, 3],
  pb: [3, null, null, null, 3]
};

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const SimilarItems = styled.div`
  padding-top: ${themeGet("space.1")}px;
  padding-left: ${themeGet("space.2")}px;
  margin-left: ${themeGet("space.2")}px;
  border-left: ${({ theme }) => `1px solid ${theme.colors.borderGrey}`};
`;

type Item = {
  title: string;
  hidden?: boolean;
  id: string;
  votes: number;
};

interface ItemProps {
  children?: ReactNode;
  hidden?: boolean;
  id: string;
  similarItems?: Item[];
  votes: number;
}

const Item = ({ children, id, hidden, votes, similarItems }: ItemProps) => (
  <ItemContainer>
    <ItemHeader>
      {hidden ? (
        <Text obfuscate={hidden}>
          {randomText.getTextBlock(randomTextConfig)}
        </Text>
      ) : (
        <Text>{children}</Text>
      )}
      <PlusOne id={id} votes={votes} />
    </ItemHeader>
    {similarItems && (
      <SimilarItems>
        {similarItems.map(({ title }, index) => (
          <Text color="borderDarkGrey" fontSize={1} mb={1} key={index}>
            {title}
          </Text>
        ))}
      </SimilarItems>
    )}
  </ItemContainer>
);

export default Item;
