import styled from "styled-components/macro";
import { space, SpaceProps } from "styled-system";

type ItemContainerProps = SpaceProps;

const BaseItemContainer = styled.div.attrs<ItemContainerProps>({
  pl: [3, null, null, null, 4],
  pr: [3, null, null, null, 4],
  pt: [3, null, null, null, 3],
  pb: [3, null, null, null, 3]
})`
  ${space};

  position: relative;
`;

type ItemLeftProps = SpaceProps;

const ItemLeft = styled.div.attrs<ItemLeftProps>({
  mr: 1
})`
  ${space};

  flex: 0 0 28px;
`;

const ItemText = styled.div`
  display: flex;
  flex: 1;
`;

export { BaseItemContainer, ItemLeft, ItemText };
