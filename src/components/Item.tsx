import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { space, SpaceProps, themeGet } from "styled-system";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import randomText from "random-textblock";
import { DeleteItem, PlusOne } from "./";
import { Text } from "./Text";

const randomTextConfig = {
  minWords: 3,
  maxWords: 8,
  minSentences: 1,
  maxSentences: 1
};

const DeleteItemButton = styled(DeleteItem)`
  display: none;
  position: absolute;
  top: 7px;
  left: -13px;
  transform: rotate(45deg);
`;

type ItemContainerProps = SpaceProps;
const ItemContainer = styled.div.attrs<ItemContainerProps>({
  pl: [3, null, null, null, 4],
  pr: [3, null, null, null, 4],
  pt: [3, null, null, null, 3],
  pb: [3, null, null, null, 3]
})`
  position: relative;

  ${space};

  &:hover ${DeleteItemButton} {
    display: block;
  }
`;

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

const DETACH_ITEM = gql`
  mutation DetachItem($id: String!) {
    detachItem(id: $id) {
      id
    }
  }
`;

interface DetachItemButtonProps {
  onClick: () => void;
}
const DetachItemButton = styled(Text).attrs({
  as: "button",
  title: "Detach comment",
  color: "borderDarkGrey",
  fontSize: 1,
  mb: 2
})<DetachItemButtonProps>`
  display: block;
  position: relative;
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;
  text-align: left;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${themeGet("colors.grey")};

    &::before {
      content: "↤";
      font-size: 18px;
      line-height: 13px;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-130%, -10%);
      background: white;
      padding: 3px 0px;
    }
  }
`;

interface SimilarItemProps {
  children: React.ReactChild;
  id: string;
}
const SimilarItem: React.FC<SimilarItemProps> = ({ children, id }) => {
  return (
    <Mutation mutation={DETACH_ITEM}>
      {detachItem => (
        <DetachItemButton onClick={() => detachItem({ variables: { id } })}>
          {children}
        </DetachItemButton>
      )}
    </Mutation>
  );
};

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
    {!hidden && <DeleteItemButton id={id} />}
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
        {similarItems.map(({ title, id }, index) => (
          <SimilarItem key={index} id={id}>
            {title}
          </SimilarItem>
        ))}
      </SimilarItems>
    )}
  </ItemContainer>
);

export default Item;
