import styled from "styled-components/macro";
import { Box, BoxType, Flex, FlexType } from "./UI";

const BaseItemContainer = styled(Box).attrs<BoxType>({
  pl: [3, null, null, null, 4],
  pr: [3, null, null, null, 4],
  pt: [3, null, null, null, 3],
  pb: [3, null, null, null, 3]
})`
  position: relative;
`;

const ItemLeft = styled(Flex).attrs<FlexType>({
  mr: 1
})`
  flex: 0 0 28px;
`;

const ItemText = styled(Flex)<FlexType>`
  flex: 1;
`;

export { BaseItemContainer, ItemLeft, ItemText };
