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
  SpaceProps,
  variant
} from "styled-system";
import { Size } from "../types";

const size = variant({
  key: "text",
  prop: "size"
});

export type TextProps = ColorProps &
  DisplayProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps & {
    size?: Size;
  };

const Text = styled.div<TextProps>`
  margin: 0;
  padding: 0;

  ${size};

  ${color};
  ${display};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};
`;

Text.defaultProps = {
  size: "base"
};

export default Text;
