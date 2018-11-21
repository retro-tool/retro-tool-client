import React from "react";
import styled from "styled-components/macro";
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
import Textarea, { TextareaAutosizeProps } from "react-textarea-autosize";

type InputProps = TextareaAutosizeProps & {
  placeholder?: string;
  onSubmit?: (target: any) => void;
};

const Input = ({ className, placeholder, onKeyDown, onSubmit }: InputProps) => {
  const HandleOnKeyDown = (evt: any): void => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      onSubmit && onSubmit(evt.target);
    }
  };

  return (
    <Textarea
      className={className}
      placeholder={placeholder}
      onKeyDown={HandleOnKeyDown}
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
  border: 0;
  resize: none;

  ${flex};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};

  &:focus {
    outline: none;
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
