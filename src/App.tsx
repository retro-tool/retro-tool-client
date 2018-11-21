import React, { useEffect, useState } from "react";
import theme from "./theme";
import gql from "graphql-tag";
import { Router } from "@reach/router";
import { createGlobalStyle, ThemeProvider } from "styled-components/macro";
// @ts-ignore
import { client, subscriptionClient } from "./services/api";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import Main from "./routes/Main";

interface FontShape {
  style: string;
  weight: string;
  woff2: string;
}

const FontFaceName = "Xing Sans";
const FontFaceDefs = [
  {
    style: "normal",
    weight: "normal",
    woff2: "/fonts/xing-sans.woff"
  },
  {
    style: "italic",
    weight: "normal",
    woff2: "/fonts/xing-sans-italic.woff"
  },
  {
    style: "normal",
    weight: "bold",
    woff2: "/fonts/xing-sans-bold.woff"
  },
  {
    style: "italic",
    weight: "bold",
    woff2: "/fonts/xing-sans-bold-italic.woff"
  }
];

const defineFontFace = (FontFaceDefs: FontShape[]): string[] =>
  FontFaceDefs.map(
    FontFaceDef => `
    @font-face {
      font-family: ${FontFaceName};
      src: url(${FontFaceDef.woff2}) format('woff2');
      font-weight: ${FontFaceDef.weight};
      font-style: ${FontFaceDef.style};
    }
  `
  );

const GlobalStyle = createGlobalStyle`
  ${defineFontFace(FontFaceDefs)}

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
`;

// interface Data {
//   currentUser: {
//     uuid: string;
//   };
// }

export default () => {
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            currentUser {
              uuid
            }
          }
        `
      })
      // @ts-ignore
      .then(({ data: { currentUser: { uuid } } }) => setUuid(uuid));
  }, []);

  if (!uuid) return null;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={subscriptionClient(uuid)}>
          <ApolloHooksProvider client={subscriptionClient(uuid)}>
            <Router>
              <Main path="/:slug" />
            </Router>
          </ApolloHooksProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};
