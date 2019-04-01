import styled from "styled-components/macro";
import {
  background,
  BackgroundProps,
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
import theme from "../theme";

type Props = BackgroundProps &
  ColorProps &
  DisplayProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps;

const Button = styled.button<Props>`
  display: inline-flex;
  vertical-align: middle;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 3px;

  ${background};
  ${color};
  ${display};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};

  &:focus {
    outline: none;
  }
`;

Button.defaultProps = {
  fontSize: 2,
  fontWeight: 1,
  background: theme.colors.lime,
  pl: 4,
  pr: 4,
  pt: 2,
  pb: 2
};

export default Button;
