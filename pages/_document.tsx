import React, { StrictMode } from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <StrictMode>
      <Html>
        <Head />
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    </StrictMode>
  );
}
