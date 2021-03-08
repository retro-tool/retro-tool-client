import styled from "styled-components/macro";
import themeGet from "@styled-system/theme-get";
import c from "color";
import { Box, BoxType } from "./UI";
import { buttonStyle } from "styled-system";
import { buttons } from "theme";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = keyof typeof buttons;

interface ButtonProps extends BoxType {
  disabled?: boolean;
  variant?: ButtonVariant;
}

const Button = styled(Box).attrs({
  as: "button",
  lineHeight: 5
})<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>`
  display: inline-flex;
  vertical-align: middle;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  border: none;
  height: 36px;

  :hover,
  :focus {
    outline: none;
    box-shadow: 0 0 0 1px white,
      0 0 0 4px
        ${({ theme }) =>
          c(theme.colors.violet)
            .alpha(0.25)
            .rgb()
            .string()};
  }

  :hover {
    text-decoration: none;
  }

  ${buttonStyle};

  pointer-events: ${({ disabled }) => disabled && "none"};
  opacity: ${({ disabled }) => disabled && ".5"};
  background: ${({ disabled }) => disabled && themeGet("colors.mediumGrey")};
`;

Button.defaultProps = {
  variant: "primary",
  type: "button"
};

export default Button;
