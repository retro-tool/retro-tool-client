import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { Text, PlusOne } from "./";
import { space, SpaceProps } from "styled-system";
import theme from "../theme";

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
};
const Item = ({ children }: ItemProps) => (
  <ItemContainer>
    <Text>{children}</Text>
    <PlusOne />
  </ItemContainer>
);

export default Item;
