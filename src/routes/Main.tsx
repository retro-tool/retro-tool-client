import React from "react";
import { Header, Content } from "../components";
import { RouteComponentProps } from "@reach/router";
import { Slug } from "../types";

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Main = (props: Props) => (
  <>
    <Header />
    {/*
    // @ts-ignore */}
    <Content slug={props.slug} />
  </>
);

export default Main;
