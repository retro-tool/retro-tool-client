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
  SpaceProps,
  themeGet
} from "styled-system";
import c from "color";

interface ButtonProps
  extends BackgroundProps,
    ColorProps,
    DisplayProps,
    FontSizeProps,
    FontWeightProps,
    LineHeightProps,
    SpaceProps {
  disabled?: boolean;
  variant?: string;
}

const Button = styled.button<ButtonProps>`
  ${background};
  ${color};
  ${display};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};

  display: inline-flex;
  vertical-align: middle;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  border: none;
  height: 36px;
  border-radius: 3px;
  pointer-events: ${({ disabled }) => disabled && "none"};
  opacity: ${({ disabled }) => disabled && ".5"};
  background: ${({ disabled, variant }) =>
    disabled
      ? themeGet("colors.mediumGrey")
      : variant === "secondary"
      ? themeGet("colors.secondaryGrey")
      : themeGet("colors.lime")};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px white,
      0 0 0 4px
        ${({ theme }) =>
          c(theme.colors.blue)
            .alpha(0.3)
            .rgb()
            .string()};
  }
`;

Button.defaultProps = {
  fontSize: 2,
  fontWeight: 1,
  pl: 4,
  pr: 4,
  lineHeight: 5,
  variant: "primary"
};

export default Button;
