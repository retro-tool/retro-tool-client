import React, { ReactNode } from "react";
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
  children?: ReactNode;
  id: string;
  completed: boolean;
};
const Item = ({ children, id }: ItemProps) => (
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
