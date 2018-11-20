import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { Text } from "./";
import { space, SpaceProps } from "styled-system";
import theme from "../theme";

type ItemContainerProps = SpaceProps;
const ItemContainer = styled.div<ItemContainerProps>`
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
  p: [4, null, null, null, 6]
};

type ItemProps = {
  children?: ReactNode;
};
const Item = ({ children }: ItemProps) => (
  <Item>
    <Text>{children}</Text>
  </Item>
);

export default Item;
