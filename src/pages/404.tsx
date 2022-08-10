import { useEffect } from "react";
import { getBannerImage } from "@utils/getBannerImage";
import { trpc } from "@utils/trpc";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Wrapper from "../components/Wrapper";

const NotFound = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { pathname } = useRouter();
  const { mutate: addView, data: updatedViews } =
    trpc.proxy.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <Wrapper title="404" noindex nofollow image={bannerImage}>
      <main className="flex flex-col items-center w-full text-center">
        <h1>420 - Page is too cool for you 🥵</h1>
        <div className="mt-8 text-xl font-bold">
          Trying to access this page will have dire consequences.
        </div>
        <div className="flex flex-col items-center mt-12 text-neutral-500 dark:text-neutral-400">
          <p className=" max-w-prose">
            Jk. The page you are trying to open does not exist. You may have
            mistyped the address, or the page has been moved to another URL.
          </p>
          <p className="mt-4">
            If you think this is a mistake{" "}
            <Link href="/contact">
              <a className="text-orange-700 dark:text-orange-500 hocus:underline hocus:text-orange-900 dark:hocus:text-orange-300 transition-all  decoration-2">
                please get in touch.
              </a>
            </Link>
          </p>
          <Link href="/">
            <a className="mt-16 button-primary py-5">Return to safety</a>
          </Link>
        </div>
      </main>
    </Wrapper>
  );
};

export default NotFound;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
