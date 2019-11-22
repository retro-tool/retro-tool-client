import React from "react";
import styled from "styled-components/macro";
import { width, WidthProps } from "styled-system";
import themeGet from "@styled-system/theme-get";
import { RetroItem, useDetachRetroItemMutation } from "generated/graphql";
import {
  DeleteRetroItem,
  BaseItemContainer,
  ItemText,
  ItemLeft,
  PlusOne,
  useStatus
} from "components";
import { Text } from "components/Text";

const DeleteItemButton = styled(DeleteRetroItem)`
  display: none;
  position: absolute;
  top: -2px;
  left: 0;
  transform: rotate(45deg);
`;

const Ref = styled(Text).attrs({
  fontSize: 1,
  color: "secondaryGrey",
  mr: 1,
  mt: "2px"
})`
  flex: 0 0 28px;
`;

const ItemContainer = styled(BaseItemContainer)`
  &:hover ${Ref} {
    display: none;
  }

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
  padding-left: ${themeGet("space.5")}px;
  margin-left: ${themeGet("space.3")}px;
  border-left: ${({ theme }) => `1px solid ${theme.colors.borderGrey}`};
`;

interface DetachItemButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const DetachItemButton = styled(Text).attrs({
  as: "button",
  title: "Detach comment",
  color: "secondaryGrey",
  fontSize: 1,
  mb: 2
})<DetachItemButtonProps>`
  display: block;
  position: relative;
  cursor: ${({ disabled }) => !disabled && "pointer"};
  border: none;
  padding: 0;
  background: transparent;
  text-align: left;

  &:focus {
    outline: none;
  }

  ${({ disabled }) =>
    !disabled &&
    `
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
    `}
`;

type SimilarItemProps = {
  id: string;
};

const SimilarItem: React.FC<SimilarItemProps> = ({ children, id }) => {
  const { status } = useStatus();
  const [detachItem] = useDetachRetroItemMutation();

  return (
    <DetachItemButton
      as={status === "review" ? "button" : "div"}
      disabled={status !== "review"}
      onClick={() => {
        status === "review" && detachItem({ variables: { id } });
      }}
    >
      {children}
    </DetachItemButton>
  );
};

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface FakeTextProps extends WidthProps {}
const FakeText = styled.div<FakeTextProps>`
  display: inline-block;
  background: ${themeGet("colors.borderGrey")};
  border-radius: 3px;
  height: 13px;
  margin-right: 4px;

  ${width}
`;

type ItemProps = {
  item: RetroItem;
};

const Item: React.FC<ItemProps> = ({
  item: { id, hidden, votes, similarItems, ref, title }
}: ItemProps) => (
  <ItemContainer>
    <ItemHeader>
      {hidden ? (
        <div>
          {Array.from({ length: randomInt(4, 10) }).map((_, index) => (
            <FakeText width={randomInt(16, 100)} key={index} />
          ))}
        </div>
      ) : (
        <ItemText>
          <ItemLeft>
            <Ref>#{ref}</Ref>
            <DeleteItemButton id={id} />
          </ItemLeft>
          <Text>{title}</Text>
        </ItemText>
      )}
      <PlusOne id={id} votes={votes} />
    </ItemHeader>
    {similarItems.length > 0 && (
      <SimilarItems>
        {similarItems.map(item => {
          if (!item || !item.title || !item.id) return null;

          return (
            <SimilarItem key={item.id} id={item.id}>
              {item.title}
            </SimilarItem>
          );
        })}
      </SimilarItems>
    )}
  </ItemContainer>
);

export default Item;
