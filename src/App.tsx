import React from "react";
import theme from "./theme";
import { createGlobalStyle, ThemeProvider } from "styled-components/macro";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "services/api";
import { Router } from "@reach/router";
import { SlugProvider } from "components/Slug.context";
import { Toaster } from "react-hot-toast";
import { CreateRetro, Export, Main, Landing } from "routes";
import c from "color";

const GlobalStyle = createGlobalStyle`
  html, body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
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

  ul.unstyled, ol.unstyled {
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

export default () => (
  <>
    <GlobalStyle />
    <Toaster />
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  </>
);
