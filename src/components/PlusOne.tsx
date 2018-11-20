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
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  ${borderColor}
  ${space}
`;
PlusOneContainer.defaultProps = {
  pt: 1,
  pb: 1,
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

const PlusOne = () => (
  <PlusOneContainer>
    {/* <PlusOneSvg>
      <path
        fill="currentColor"
        d="M21.6 18.09h-7.2v7.2H7.2v-7.2H0v-7.2h7.2v-7.2h7.2v7.2h7.2v7.2zM39.7 29h-7.2V9.49l-5.2 2.6-3.2-6.5L34.6.39a3.4 3.4 0 0 1 3.5.2 3.56 3.56 0 0 1 1.7 3.1V29z"
      />
    </PlusOneSvg> */}
    <Text fontSize={6} color="link" lineHeight={0}>
      +
    </Text>
    <CountContainer>
      <Text ml={2}>0</Text>
    </CountContainer>
  </PlusOneContainer>
);

export default PlusOne;
