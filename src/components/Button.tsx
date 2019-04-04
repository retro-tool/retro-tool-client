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

interface ButtonProps
  extends BackgroundProps,
    ColorProps,
    DisplayProps,
    FontSizeProps,
    FontWeightProps,
    LineHeightProps,
    SpaceProps {
  disabled?: boolean;
}

const Button = styled.button.attrs(({ disabled, theme }) => ({
  background: disabled ? theme.colors.mediumGrey : theme.colors.lime
}))<ButtonProps>`
  display: inline-flex;
  vertical-align: middle;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  pointer-events: ${({ disabled }) => disabled && "none"};
  opacity: ${({ disabled }) => disabled && ".5"};

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
  pl: 4,
  pr: 4,
  pt: 2,
  pb: 2,
  lineHeight: 5
};

export default Button;
