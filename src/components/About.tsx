import React, { useContext, useRef, useState } from "react";
import styled from "styled-components/macro";
import { space, SpaceProps, themeGet } from "styled-system";
import { Button, LightboxContent, LightboxOverlay, Text } from "./";
import { Clear } from "styled-icons/material/Clear";
import { Help } from "styled-icons/material/Help";

const CloseIcon = styled(Clear)`
  width: ${themeGet("space.5")}px;
  margin-right: -8px;
  margin-left: 6px;
`;

const HelpIcon = styled(Help)`
  height: ${themeGet("space.5")}px;
  width: ${themeGet("space.5")}px;
  color: ${themeGet("colors.mediumGrey")};

  &:hover {
    color: ${themeGet("colors.link")};
    cursor: pointer;
  }
`;

const AboutFooter = styled.div`
  text-align: center;
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
          <Text mb={3}>
            <b>
              <i>XING Retro</i>
            </b>{" "}
            is totally anonymous and doesn't track or store any personal
            information.
          </Text>
          <Text mb={3}>
            If you have any feedback or feature request, please address yourself
            to our dedicated <i>Slack</i> channel{" "}
            <b>
              <a href="https://nw-all.slack.com/messages/CGVSU7D9D">
                #nw-xing-retro-help
              </a>
            </b>{" "}
            where we'll politely disagree with your ideas and completely ignore
            them. Or we might just like it and implement them right away. I
            don't know just give it a try.
          </Text>
          <Text>
            Deveolped by <b>Unai Esteibar</b>, <b>Marcio Barrios</b>,{" "}
            <b>Andrzej Trzaska</b> and <b>Rude Ayelo</b>. You can find the
            source code at{" "}
            <a href="https://source.xing.com/xing-retro">
              source.xing.com/xing-retro
            </a>
            .
          </Text>
          <AboutFooter>
            <Button
              bg="mediumGrey"
              onClick={() => setOpen(false)}
              ref={buttonRef}
              mt={6}
            >
              Close
              <CloseIcon />
            </Button>
          </AboutFooter>
        </LightboxContent>
      </LightboxOverlay>
    </>
  );
};

export { About };
