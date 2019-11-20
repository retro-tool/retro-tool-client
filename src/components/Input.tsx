import React, { useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { themeGet } from "styled-system";
import {
  flex,
  FlexProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps
} from "styled-system";
import c from "color";
import Textarea, { TextareaAutosizeProps } from "react-textarea-autosize";

const toShadow = (col: string): string =>
  c(col)
    .alpha(0.25)
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

type StyledInputProps = FlexProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps &
  TextareaAutosizeProps &
  InputProps;

const StyledInput = styled(Input)<StyledInputProps>`
  border: 1px solid ${themeGet("colors.borderGrey")};
  border-radius: 3px;
  resize: none;
  overflow: hidden;

  ${flex};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => `0 0 0 4px ${toShadow(theme.colors.lime)}`};
    border-color: ${themeGet("colors.lime")};
  }

  &:disabled {
    background: ${themeGet("colors.contentGrey")};
    opacity: 0.8;
  }
`;

StyledInput.defaultProps = {
  type: "text",
  fontSize: 2,
  fontWeight: 0,
  p: 2,
  placeholder: "Say something"
};

export default StyledInput;
