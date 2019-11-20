import React from "react";
import styled from "styled-components/macro";
import { ItemText, ItemLeft, Text } from "components";
import { BaseItemContainer } from "./BaseItem";
import { DeleteActionItem } from "components/DeleteActionItemButton";

const DeleteItemButton = styled(DeleteActionItem)`
  display: none;
  position: absolute;
  top: 7px;
  left: 16px;
  transform: rotate(45deg);
`;

const ItemContainer = styled(BaseItemContainer)`
  &:hover ${DeleteItemButton} {
    display: block;
  }
`;

type ItemProps = {
  id: string;
};

const Item: React.FC<ItemProps> = ({ children, id }) => (
  <ItemContainer>
    <ItemText>
      <ItemLeft>
        <DeleteItemButton id={id} />
      </ItemLeft>
      <Text>{children}</Text>
    </ItemText>
  </ItemContainer>
);

export default Item;
