import React, { ReactNode, useState } from "react";
import styled from "styled-components/macro";
import { space, SpaceProps } from "styled-system";
import { Text } from "./";
import { DeleteItem } from "./DeleteItemButton";

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

type ItemProps = {
  children?: ReactNode;
  id: string;
  completed: boolean;
};
const Item = ({ children, id }: ItemProps) => (
  <ItemContainer>
    <DeleteItemButton id={id} />
    <Text ml={2}>{children}</Text>
  </ItemContainer>
);

export default Item;
