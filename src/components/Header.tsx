import React, { useContext } from "react";
import styled from "styled-components/macro";
import { Button, Logo, Text, StageContext } from "./";
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

  return (
    <HeaderContainer>
      <Logo />
      <Text>{stage}</Text>
      <Button onClick={nextStage}>Next</Button>
    </HeaderContainer>
  );
};

Header.defaultProps = {
  stage: "initial"
};

export default Header;
