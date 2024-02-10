import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Main = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div className="bg-white text-black">
      {noHeaderFooter || <Navbar />}
      <Outlet />
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
