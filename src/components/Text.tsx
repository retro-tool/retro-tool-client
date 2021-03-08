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
  textStyle,
  TextStyleProps
} from "styled-system";
import { Size } from "types";

export type TextProps = ColorProps &
  DisplayProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps &
  TextStyleProps & {
    size?: Size;
    obfuscate?: boolean;
    textTransform?: string;
    letterSpacing?: number;
  };

const Text = styled.div.attrs({
  textStyle: "base",
  letterSpacing: 0
})<TextProps>`
  margin: 0;
  padding: 0;
  filter: ${({ obfuscate }) => obfuscate && "blur(5px)"};

  text-transform: ${({ textTransform }) => textTransform};
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing !== 0 && `${letterSpacing}px`};

  ${textStyle};
  ${color};
  ${display};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};
`;

const TruncatedText = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0;
`;

export { Text, TruncatedText };
