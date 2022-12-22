import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer";
import { trpc } from "@utils/trpc";
import Nav from "../NewNavbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();

  const { mutate: addView } = trpc.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <>
      <Nav />
      <div className="mt-40 mb-16 flex flex-col justify-center px-8">
        {children}
      </div>
      <Footer />
    </>
  );
};
export default MainLayout;
