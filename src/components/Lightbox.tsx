import styled from "styled-components/macro";
import { space, SpaceProps, width, WidthProps } from "styled-system";
import c from "color";
import { DialogContent, DialogOverlay } from "@reach/dialog";

const LightboxOverlay = styled(DialogOverlay)`
  background: ${({ theme }) =>
    c(theme.colors.dark)
      .alpha(0.3)
      .rgb()
      .string()};
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`;

interface LightboxContentProps extends SpaceProps, WidthProps {}

const LightboxContent = styled(DialogContent)<LightboxContentProps>`
  background: white;
  outline: none;
  border-radius: 6px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.16), 0 3px 8px rgba(0, 0, 0, 0.16);

  ${space}
  ${width}
`;

LightboxContent.defaultProps = {
  mt: "10vh",
  mx: "auto",
  p: 5,
  width: ["95vw", null, "500px"]
};

export { LightboxOverlay, LightboxContent };
