import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { RouteComponentProps } from "@reach/router";

type Props = RouteComponentProps;

const Main = (props: Props) => (
  <>
    <Header />
  </>
);

export default Main;
