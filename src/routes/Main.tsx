import React, { Suspense } from "react";
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
    <Suspense fallback={<div>Loading Content</div>}>
      {/*
        // @ts-ignore */}
      <Content slug={props.slug} />
    </Suspense>
  </>
);

export default Main;
