import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";

function Index() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Index;
