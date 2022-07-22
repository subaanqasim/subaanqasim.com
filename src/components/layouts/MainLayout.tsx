import useMediaQuery from "@utils/useMediaQuery";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isDesktop ? <Navbar /> : <MobileNavbar />}
      {children}
    </>
  );
};
export default MainLayout;
