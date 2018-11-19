import React from "react";
import styled from "styled-components/macro";
import Text from "./Text";
import { Stage } from "../types";

interface Props {
  stage?: Stage;
}

const HeaderContainer = styled.div`
  background: white;
`;

const Header = ({ stage }: Props) => (
  <HeaderContainer>
    <Text>{stage}</Text>
  </HeaderContainer>
);

Header.defaultProps = {
  stage: "initial"
};

export default Header;
