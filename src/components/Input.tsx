import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components/macro";
import themeGet from "@styled-system/theme-get";
import { Box, BoxType } from "./UI";
import c from "color";
import Textarea, { TextareaAutosizeProps } from "react-textarea-autosize";

/**
 * STYLES
 */
const toShadow = (color: string): string =>
  c(color)
    .alpha(0.05)
    .rgb()
    .string();

/**
 * TYPES
 */
type InputProps = TextareaAutosizeProps & {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange: (value: string) => void;
  shouldFocus?: boolean;
  value: string;
};

type PasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onSubmit?: (value: string) => void;
  onChange: (value: string) => void;
  shouldFocus?: boolean;
  value: string;
};

type StyledInputProps = BoxType & TextareaAutosizeProps & InputProps;

type StyledPasswordProps = BoxType & TextareaAutosizeProps & InputProps;

/**
 * COMPONENTS
 */
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

const inputStyles = css`
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

const StyledInput = styled(Box)<StyledInputProps>`
  ${inputStyles}
`;

// @ts-ignore
StyledInput.defaultProps = {
  as: Input,
  borderRadius: 1,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "borderGrey",
  type: "text",
  fontSize: [3, 2],
  fontWeight: 0,
  p: 2,
  ml: 2,
  placeholder: "Say something"
};

const Password = ({
  className,
  placeholder,
  onSubmit,
  onChange,
  shouldFocus,
  value,
  ...rest
}: PasswordProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const HandleChange = (evt: any): void => {
    onChange(evt.target.value);
  };

  useEffect(() => {
    if (shouldFocus && inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, [inputEl, shouldFocus]);

  return (
    <input
      type="password"
      className={className}
      placeholder={placeholder}
      onChange={HandleChange}
      value={value}
      ref={inputEl}
      {...rest}
    />
  );
};

const StyledPassword = styled(Box)<StyledPasswordProps>`
  ${inputStyles}
`;

// @ts-ignore
StyledPassword.defaultProps = {
  as: Password,
  borderRadius: 1,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "borderGrey",
  fontSize: [3, 2],
  fontWeight: 0,
  p: 2,
  ml: 2,
  placeholder: "Say something"
};

export { StyledInput as Input, StyledPassword as Password };
