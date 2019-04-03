import React, { ReactNode, useState } from "react";
import styled from "styled-components/macro";
import { space, SpaceProps } from "styled-system";
import { Text } from "./";

type ItemContainerProps = SpaceProps;
const ItemContainer = styled.div.attrs<ItemContainerProps>({
  pl: [3, null, null, null, 4],
  pr: [3, null, null, null, 4],
  pt: [3, null, null, null, 3],
  pb: [3, null, null, null, 3]
})`
  display: flex;
  align-items: flex-start;
  position: relative;

  ${space};
`;

type ItemProps = {
  children?: ReactNode;
  id: string;
  completed: boolean;
};
const Item = ({ children }: ItemProps) => (
  <ItemContainer>
    <Text ml={2}>{children}</Text>
  </ItemContainer>
);

export default Item;
