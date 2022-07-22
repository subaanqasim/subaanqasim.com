import useMediaQuery from "@utils/useMediaQuery";
import Footer from "../Footer";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isDesktop ? <Navbar /> : <MobileNavbar />}
      <main className="flex flex-col justify-center px-8">{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
