import React, { StrictMode } from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import { EditingProvider } from "../components/Providers/EditingProvider";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <SessionProvider session={pageProps.session}>
        <ToastContainer
          limit={3}
          position={"top-right"}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          draggable={false}
          newestOnTop={true}
          autoClose={1000}
          style={{ backgroundColor: "#FAF9F6" }}
          bodyStyle={{ backgroundColor: "#FAF9F6" }}
          toastStyle={{ backgroundColor: "#FAF9F6" }}
        />
        <EditingProvider>
          <Head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/images/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/images/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/images/favicon-16x16.png"
            />
          </Head>
          <Component {...pageProps} />
        </EditingProvider>
      </SessionProvider>
    </StrictMode>
  );
}
