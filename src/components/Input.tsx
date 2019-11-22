import React, { useEffect, useRef } from "react";
import styled from "styled-components/macro";
import themeGet from "@styled-system/theme-get";
import { Box, BoxType } from "./UI";
import c from "color";
import Textarea, { TextareaAutosizeProps } from "react-textarea-autosize";

const toShadow = (color: string): string =>
  c(color)
    .alpha(0.05)
    .rgb()
    .string();

type InputProps = TextareaAutosizeProps & {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange: (value: string) => void;
  shouldFocus?: boolean;
  value: string;
};

const Input = ({
  className,
  placeholder,
  onSubmit,
  onChange,
  shouldFocus,
  value,
  ...rest
}: InputProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const HandleOnKeyDown = (evt: any): void => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      onSubmit && onSubmit(evt.target.value);
    }
  };

  const HandleChange = (evt: any): void => {
    onChange(evt.target.value);
  };

  useEffect(() => {
    if (shouldFocus && inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, [inputEl, shouldFocus]);

  return (
    <Textarea
      className={className}
      placeholder={placeholder}
      onKeyDown={HandleOnKeyDown}
      onChange={HandleChange}
      value={value}
      // @ts-ignore
      inputRef={inputEl}
      {...rest}
    />
  );
};

type StyledInputProps = BoxType & TextareaAutosizeProps & InputProps;

const StyledInput = styled(Box)<StyledInputProps>`
  resize: none;
  overflow: hidden;
  flex: 1 1 auto;

  &:focus {
    outline: none;
    background: ${({ theme }) => toShadow(theme.colors.violet)};
    transition: border-color 0.5s;
    border-color: ${themeGet("colors.violet")};
  }

  &:disabled {
    background: ${themeGet("colors.contentGrey")};
    opacity: 0.8;
  }

  &:focus + * svg {
    transition: fill 0.5s;
    fill: ${themeGet("colors.violet")};
  }
`;

// @ts-ignore
StyledInput.defaultProps = {
  as: Input,
  borderRadius: 1,
  borderWidth: 2,
  borderColor: "borderGrey",
  type: "text",
  fontSize: 2,
  fontWeight: 0,
  p: 2,
  ml: 2,
  placeholder: "Say something"
};

export default StyledInput;
