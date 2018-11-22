import React, { Suspense, useEffect, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { Header, Content, SlugContext } from "../components";
import { Slug } from "../types";

interface Props
  extends RouteComponentProps<{
    slug: Slug;
  }> {}

const Main = (props: Props) => {
  const { setSlug } = useContext(SlugContext);

  useEffect(
    () => {
      // @ts-ignore
      setSlug(props.slug);
    },
    [props.slug]
  );

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading Content</div>}>
        <Content />
      </Suspense>
    </>
  );
};

export default Main;
