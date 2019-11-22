import styled from "styled-components/macro";
import themeGet from "@styled-system/theme-get";
import c from "color";
import { Box, BoxType } from "./UI";

interface ButtonProps extends BoxType {
  disabled?: boolean;
  variant?: string;
}

const Button = styled(Box).attrs({
  as: "button",
  borderRadius: 0,
  color: "white",
  fontSize: 2,
  lineHeight: 5,
  pl: 4,
  pr: 4,
  variant: "primary"
})<ButtonProps>`
  display: inline-flex;
  vertical-align: middle;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  border: none;
  height: 36px;
  pointer-events: ${({ disabled }) => disabled && "none"};
  opacity: ${({ disabled }) => disabled && ".5"};
  background: ${({ disabled, variant }) =>
    disabled
      ? themeGet("colors.mediumGrey")
      : variant === "secondary"
      ? themeGet("colors.secondaryGrey")
      : themeGet("colors.violet")};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px white,
      0 0 0 4px
        ${({ theme }) =>
          c(theme.colors.violet)
            .alpha(0.25)
            .rgb()
            .string()};
  }
`;

export default Button;
