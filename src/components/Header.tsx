import React, { useContext, useState } from "react";
import styled from "styled-components/macro";
import { Button, Logo, SlugContext, StageContext, Text } from "./";
import { space, SpaceProps } from "styled-system";
import Modal from "react-responsive-modal";
import { Redirect } from "@reach/router";

type HeaderProps = SpaceProps;

const HeaderContainer = styled.div<HeaderProps>`
  align-items: center;
  background: white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  height: 48px;
  justify-content: space-between;

  ${space}
`;

HeaderContainer.defaultProps = {
  pl: 4,
  pr: 4
};

const Header = () => {
  const { slug } = useContext(SlugContext);
  const { stage, nextStage } = useContext(StageContext);
  const [confirm, setConfirm] = useState(false);
  const [raw, setRaw] = useState(false);

  const headerActions = {
    initial: {
      label: "Start retro",
      onClick: () => {
        setConfirm(true);
      },
      onConfirm: () => {
        setConfirm(false);
        nextStage();
      }
    },
    review: {
      label: "Add action items",
      onClick: nextStage
    },
    actions: {
      label: "Finish retro",
      onClick: nextStage
    },
    final: {
      label: "Export",
      onClick: () => {
        setRaw(true);
      }
    }
  };

  if (raw) return <Redirect noThrow to={`/${slug}/export`} />;

  return (
    <>
      <Modal open={confirm} onClose={() => setConfirm(false)} center>
        <Text size="title">Are you sure?</Text>
        <Text mt={3} mb={3}>
          In the next stage everybody will see all topics and topics can be
          voted.
        </Text>
        <Button onClick={headerActions[stage].onConfirm}>
          {headerActions[stage].label}
        </Button>
      </Modal>
      <HeaderContainer>
        <Logo />
        {stage && (
          <Button onClick={headerActions[stage].onClick}>
            {headerActions[stage].label}
          </Button>
        )}
      </HeaderContainer>
    </>
  );
};

export { HeaderContainer };
export default Header;
