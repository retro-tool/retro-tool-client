import React from "react";
import styled from "styled-components";
import {
  borderColor,
  BorderColorProps,
  color,
  ColorProps,
  space,
  SpaceProps
} from "styled-system";
import { Text } from "./";

type PlusOneContainerProps = SpaceProps & BorderColorProps;
const PlusOneContainer = styled.button<PlusOneContainerProps>`
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  opacity: ${({ hidden }) => hidden && ".4"};
  pointer-events: ${({ hidden }) => hidden && "none"};

  ${borderColor}
  ${space}
`;
PlusOneContainer.defaultProps = {
  pt: 1,
  pb: 1,
  ml: 3,
  borderColor: "borderGrey"
};

type PlusOneSvgProps = ColorProps;
const PlusOneSvg = styled.svg.attrs({
  width: "13",
  height: "10",
  viewBox: "0 0 39.7 28.99"
})<PlusOneSvgProps>`
  ${color}
`;
PlusOneSvg.defaultProps = {
  color: "link"
};

const CountContainer = styled.div`
  border-left: 1px solid #e5e5e5;
  margin-left: 8px;
`;

type PlusOneProps = {
  hidden?: boolean;
};
const PlusOne = ({ hidden }: PlusOneProps) => (
  <PlusOneContainer hidden={hidden}>
    <Text fontSize={6} color="link" lineHeight={0}>
      +
    </Text>
    <CountContainer>
      <Text ml={2}>0</Text>
    </CountContainer>
  </PlusOneContainer>
);

export default PlusOne;
