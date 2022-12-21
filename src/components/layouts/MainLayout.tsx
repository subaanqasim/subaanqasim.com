import { useEffect } from "react";
import { useRouter } from "next/router";
import useMediaQuery from "@utils/useMediaQuery";
import Footer from "../Footer";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";
import { trpc } from "@utils/trpc";
import Nav from "../NewNavbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { pathname } = useRouter();

  const { mutate: addView, data: updatedViews } =
    trpc.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <>
      {/* {isDesktop ? <Navbar /> : <MobileNavbar />} */}
      <Nav />
      <div className="mt-40 mb-16 flex flex-col justify-center px-8">
        {children}
      </div>
      <Footer />
    </>
  );
};
export default MainLayout;
