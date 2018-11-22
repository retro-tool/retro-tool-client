import React, { useContext } from "react";
import styled from "styled-components/macro";
import { Button, Logo, StageContext } from "./";
import { space, SpaceProps } from "styled-system";

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
  const { stage, nextStage } = useContext(StageContext);

  const headerActions = {
    initial: {
      label: "Start retro",
      onClick: nextStage
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
      onClick: () => console.log("--> EXPORT")
    }
  };

  return (
    <HeaderContainer>
      <Logo />
      {stage && (
        <Button onClick={headerActions[stage].onClick}>
          {headerActions[stage].label}
        </Button>
      )}
    </HeaderContainer>
  );
};

export default Header;
