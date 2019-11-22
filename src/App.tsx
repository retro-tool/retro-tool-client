import React from "react";
import theme from "./theme";
import { Router } from "@reach/router";
import { createGlobalStyle, ThemeProvider } from "styled-components/macro";
import { SlugProvider } from "components/Slug.context";
import { CreateRetro, Export, Main } from "routes";

const GlobalStyle = createGlobalStyle`
  html, body { padding: 0; margin: 0; }

  * { box-sizing: border-box; }

  body {
    font-family: ${theme.fontFamily};
    background: ${theme.colors.contentGrey};
    color: ${theme.colors.dark};
  }

  input, textarea, button {
    font-family: ${theme.fontFamily};
  }

  a {
    color: ${theme.colors.link};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SlugProvider>
          <Router>
            <Main path="/:slug" />
            <Export path="/:slug/export" />
            <CreateRetro default />
          </Router>
        </SlugProvider>
      </ThemeProvider>
    </>
  );
};
