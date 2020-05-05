import React from "react";
import theme from "./theme";
import { Router } from "@reach/router";
import { createGlobalStyle, ThemeProvider } from "styled-components/macro";
import { SlugProvider } from "components/Slug.context";
import { CreateRetro, Export, Main, Landing } from "routes";
import c from "color";

const GlobalStyle = createGlobalStyle`
  html, body { padding: 0; margin: 0; }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizelegibility;
  }

  h1, h2, h3 {
    font-weight: normal;
  }

  body {
    font-family: ${theme.fontFamily};
    background: ${theme.colors.contentGrey};
    color: ${theme.colors.dark};
  }

  input, textarea, button {
    font-family: ${theme.fontFamily};
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${theme.colors.link};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }

    :focus {
      outline: none;
      border-radius: ${theme.radii[0]};
      box-shadow: 0 0 0 3px white,
        0 0 0 6px
          ${c(theme.colors.violet)
            .alpha(0.25)
            .rgb()
            .string()};
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
            <Landing path="/" />
            <Main path="/:slug" />
            <Export path="/:slug/export" />
            <CreateRetro path="/new" />
            <CreateRetro default />
          </Router>
        </SlugProvider>
      </ThemeProvider>
    </>
  );
};
