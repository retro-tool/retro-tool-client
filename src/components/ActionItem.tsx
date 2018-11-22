import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import theme from "../theme";
import { space, SpaceProps } from "styled-system";
import { Text } from "./";

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
  p: [3, null, null, null, 4]
};

type ItemProps = {
  children?: ReactNode;
  id: string;
  completed: boolean;
};
const Item = ({ children, id, completed }: ItemProps) => (
  <ItemContainer>
    <Text>{children}</Text>
  </ItemContainer>
);

export default Item;
