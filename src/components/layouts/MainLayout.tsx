import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer";
import { trpc } from "@utils/trpc";
import Nav from "../Navbar";

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
    </>
  );
};
export default MainLayout;
