import React, { useRef, useState } from "react";
import styled from "styled-components/macro";
import themeGet from "@styled-system/theme-get";
import { Link } from "@reach/router";
import { Button, LightboxContent, LightboxOverlay, Text } from "components";
import { Clear } from "styled-icons/material/Clear";
import { Help } from "styled-icons/material/Help";
import { Box } from "./UI";
import { ReactComponent as RetroToolLogo } from "../assets/retrotool_compact.svg";

const CloseIcon = styled(Clear)`
  width: ${themeGet("space.5")}px;
  margin-right: -8px;
  margin-left: 6px;
`;

const HelpIcon = styled(Help)`
  height: ${themeGet("space.5")}px;
  width: ${themeGet("space.5")}px;
  color: ${themeGet("colors.secondaryGrey")};

  &:hover {
    color: ${themeGet("colors.link")};
    cursor: pointer;
  }
`;

const About = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  return (
    <>
      <HelpIcon onClick={() => setOpen(true)} />
      <LightboxOverlay
        isOpen={open}
        onDismiss={() => setOpen(false)}
        initialFocusRef={buttonRef}
      >
        <LightboxContent width={["95vw", null, "400px"]}>
          <Box textAlign="center" mb={4}>
            <RetroToolLogo color="grey" />
          </Box>
          <Text mb={3}>
            <b>Retro tool</b> is totally anonymous and doesn't track or store
            any personal information. You can read more about it in our{" "}
            <Link to="/">landing page</Link>.
          </Text>
          <Text mb={3}>
            Developed by{" "}
            <a href="https://twitter.com/uesteibar">Unai Esteibar</a>,{" "}
            <a href="https://twitter.com/marciobarrios">Marcio Barrios</a>,{" "}
            <a href="https://twitter.com/andrzej_trzaska">Andrzej Trzaska</a>,{" "}
            <a href="https://twitter.com/iamsilesc">Christian Siles</a> and{" "}
            <a href="https://twitter.com/Rude">Rude Ayelo</a>.
          </Text>
          <Text mb={3}>
            This tool is free and open source:{" "}
            <a href="https://github.com/retro-tool">
              https://github.com/retro-tool
            </a>
          </Text>
          <Box textAlign="center">
            <Button
              bg="mediumGrey"
              onClick={() => setOpen(false)}
              ref={buttonRef}
              mt={6}
            >
              Close
              <CloseIcon />
            </Button>
          </Box>
        </LightboxContent>
      </LightboxOverlay>
    </>
  );
};

export { About };
