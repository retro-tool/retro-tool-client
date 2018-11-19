import React from "react";
import { Router } from "@reach/router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Main from "./routes/Main";

const GlobalStyle = createGlobalStyle`
  html, body { padding: 0; margin: 0; }

  body {
    font-family:
      "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: #ececec;
  }
`;

export default () => (
  <>
    <GlobalStyle />
    <Router>
      <Main path="/" />
    </Router>
  </>
);
