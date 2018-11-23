import React from "react";
import theme from "./theme";
import { Router } from "@reach/router";
import { createGlobalStyle, ThemeProvider } from "styled-components/macro";
import { StageProvider, SlugProvider } from "./components";
import { CreateRetro, Main } from "./routes";

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

export default () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SlugProvider>
          <StageProvider>
            <Router>
              <Main path="/:slug" />
              <CreateRetro default />
            </Router>
          </StageProvider>
        </SlugProvider>
      </ThemeProvider>
    </>
  );
};
