import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main style={{ flexGrow: 1, paddingTop: "64px" }}>{children}</main>
  </>
);
export default Layout;
