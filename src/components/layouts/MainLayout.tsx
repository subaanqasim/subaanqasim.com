import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer";
import { trpc } from "@utils/trpc";
import Nav from "../Navbar";
import Donate from "@components/Donate";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();

  const { mutate: addView } = trpc.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <div className="fixed bottom-8 right-8 z-50">
        <Donate />
      </div>
    </>
  );
};
export default MainLayout;
