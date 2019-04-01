import React, { useContext, useState } from "react";
import styled from "styled-components/macro";
import { Button, Logo, SlugContext, StatusContext, Text } from "./";
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
  const { status, nextStatus } = useContext(StatusContext);
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
        nextStatus();
      }
    },
    review: {
      label: "Add action items",
      onClick: nextStatus
    },
    actions: {
      label: "Finish retro",
      onClick: nextStatus
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
          In the next step everybody will see all topics and topics can be
          voted.
        </Text>
        <Button onClick={headerActions[status].onConfirm}>
          {headerActions[status].label}
        </Button>
      </Modal>
      <HeaderContainer>
        <Logo />
        {status && (
          <Button onClick={headerActions[status].onClick}>
            {headerActions[status].label}
          </Button>
        )}
      </HeaderContainer>
    </>
  );
};

export { HeaderContainer };
export default Header;
