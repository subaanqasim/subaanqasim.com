import { getBannerImage } from "@utils/getBannerImage";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Wrapper from "../components/Wrapper";

const NotFound = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper title="404" noindex nofollow image={bannerImage}>
      <main className="flex w-full flex-col items-center text-center">
        <h1>420 - Page is too cool for you 🥵</h1>
        <div className="mt-8 text-xl font-bold">
          Trying to access this page will have dire consequences.
        </div>
        <div className="mt-12 flex flex-col items-center text-neutral-500 dark:text-neutral-400">
          <p className=" max-w-prose">
            Jk. The page you are trying to open does not exist. You may have
            mistyped the address, or the page has been moved to another URL.
          </p>
          <p className="mt-4">
            If you think this is a mistake{" "}
            <Link
              href="/contact"
              className="text-orange-700 decoration-2 transition-all hocus:text-orange-900 hocus:underline dark:text-orange-500  dark:hocus:text-orange-300">
              
                please get in touch.
              
            </Link>
          </p>
          <Link href="/" className="button-primary mt-16 py-5">
            Return to safety
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
