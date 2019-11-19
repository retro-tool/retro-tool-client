import React from "react";
import { Location } from "@reach/router";
import { Slug } from "../types";

type SlugContextValue = {
  slug: Slug;
};

const SlugContext = React.createContext<SlugContextValue | undefined>(
  undefined
);

type SlugProviderProps = {
  value?: SlugContextValue;
  children: React.ReactNode;
};

const SlugProvider = (props: SlugProviderProps) => (
  <Location>
    {({ location }) => {
      const slug = location.pathname.split("/")[1];
      return <SlugContext.Provider value={{ slug }} {...props} />;
    }}
  </Location>
);

const useSlug = () => {
  const context = React.useContext(SlugContext);

  if (!context) {
    throw new Error("useSlug must be used within a SlugProvider");
  }

  const { slug } = context;

  return slug;
};

export { SlugProvider, useSlug };
