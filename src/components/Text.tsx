import styled from "styled-components/macro";
import {
  color,
  ColorProps,
  display,
  DisplayProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps
} from "styled-system";

type Props = ColorProps &
  DisplayProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps;

const Text = styled.span<Props>`
  margin: 0;
  padding: 0;

  ${color};
  ${display};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};
`;

Text.defaultProps = {
  fontSize: 1
};

export default Text;
