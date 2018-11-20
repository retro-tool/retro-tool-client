import styled from "styled-components/macro";
import {
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps
} from "styled-system";

type InputProps = FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps & {
    placeholder?: string;
  };

const Input = styled.input.attrs(
  (props): InputProps => ({
    placeholder: props.placeholder
  })
)<InputProps>`
  border: 0;

  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};
`;

Input.defaultProps = {
  type: "text",
  fontSize: 1,
  fontWeight: 0,
  p: 2,
  placeholder: "Say something"
};

export default Input;
