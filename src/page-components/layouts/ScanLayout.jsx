import React from "react";
import Head from "next/head";
import GlobalNavbar from "../components/Navbar/GlobalNavbar";

export const ScanLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>PickMeFood | Scan</title>
      </Head>
      <div className="grid grid-cols-[auto,1fr]">
        <GlobalNavbar className="border-r border-black-200 pr-4" />
        <main className="p-6">{children}</main>
      </div>
    </>
  );
};
