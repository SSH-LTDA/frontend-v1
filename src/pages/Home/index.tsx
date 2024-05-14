import React from "react";
import Header from "../../components/Header.tsx";
import { Outlet } from "react-router-dom";

function Index() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Index;
