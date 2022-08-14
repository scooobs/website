import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Spotify } from "./Spotify";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Conal O'Leary" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="h-20" />
    {children}
    <footer className="flex fixed bottom-0 inset-x-0 py-1 items-center justify-center">
      <Spotify />
    </footer>
  </div>
);

export default Layout;
