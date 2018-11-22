import React, { useState } from "react";
import { Slug } from "../types";

export const SlugContext = React.createContext({
  slug: "",
  setSlug: (slug: Slug) => {}
});

export default ({ children }) => {
  const [slug, setSlug] = useState("");

  return (
    // @ts-ignore
    <SlugContext.Provider value={{ slug, setSlug }}>
      {children}
    </SlugContext.Provider>
  );
};
