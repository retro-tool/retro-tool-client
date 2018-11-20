import React from "react";
import { Header, Content } from "../components";
import { RouteComponentProps } from "@reach/router";

type Props = RouteComponentProps;

const Main = (props: Props) => (
  <>
    <Header />
    <Content />
  </>
);

export default Main;
