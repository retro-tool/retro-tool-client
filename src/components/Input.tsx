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
    .alpha(0.2)
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
  value
}: InputProps) => {
  const inputEl = useRef(null);

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
    // @ts-ignore
    shouldFocus && inputEl && inputEl.current.focus();
  }, [inputEl]);

  return (
    <Textarea
      className={className}
      placeholder={placeholder}
      onKeyDown={HandleOnKeyDown}
      onChange={HandleChange}
      value={value}
      // @ts-ignore
      inputRef={inputEl}
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
  background: ${themeGet("colors.contentGrey")};
  border: 0;
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
    box-shadow: ${({ theme }) =>
      `0 0 0 3px ${toShadow(theme.colors.lime)}, 0 0 0 1px rgba(0,0,0,.1)`};
    background: white;
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
