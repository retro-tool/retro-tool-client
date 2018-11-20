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
import Textarea from "react-textarea-autosize";

type InputProps = FlexProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps & {
    placeholder?: string;
  };

const Input = styled(Textarea).attrs(
  (props): InputProps => ({
    placeholder: props.placeholder
  })
)<InputProps>`
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

Input.defaultProps = {
  type: "text",
  fontSize: 2,
  fontWeight: 0,
  p: 2,
  placeholder: "Say something"
};

export default Input;
