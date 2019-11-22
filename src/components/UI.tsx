import styled from "styled-components";
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from "styled-system";

const boxProps = compose(
  background,
  border,
  color,
  layout,
  position,
  shadow,
  space,
  typography
);

export type BoxType = BackgroundProps &
  BorderProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TypographyProps;

export const Box = styled("div")<BoxType>(
  {
    boxSizing: "border-box"
  },
  boxProps
);

export type FlexType = BoxType & FlexboxProps;

export const Flex = styled(Box)<FlexType>(
  {
    display: "flex"
  },
  flexbox
);
