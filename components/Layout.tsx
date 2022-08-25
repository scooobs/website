import React, { ReactNode } from "react";
import Head from "next/head";
import { Spotify } from "./Spotify";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Conal O'Leary" }: Props) => (
  <div className="flex flex-col">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="h-20" />
    <div className="mb-10">{children}</div>
    <footer className="flex pb-1 items-center justify-center">
      <Spotify />
    </footer>
  </div>
);

export { Layout };
