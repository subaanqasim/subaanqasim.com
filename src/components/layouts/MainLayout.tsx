import useMediaQuery from "@utils/useMediaQuery";
import React from "react";
import Footer from "../Footer";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? <Navbar /> : <MobileNavbar />}
      <div className="flex flex-col justify-center px-8 mt-40 mb-16">
        {children}
      </div>
      <Footer />
    </>
  );
};
export default MainLayout;
