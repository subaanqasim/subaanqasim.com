import { useEffect, useState } from "react";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import cx from "classnames";
import { trpc } from "@utils/trpc";
import { getBannerImage } from "@utils/getBannerImage";

const Support = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [inputEmail, setInputEmail] = useState("");
  const { query, pathname } = useRouter();
  const { data: session } = useSession();

  const { mutate: addView, data: updatedViews } =
    trpc.proxy.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  const isSuccess = query.success === "true";
  const userEmail = query.email;

  return (
    <Wrapper
      title="Support"
      description="Kind words from donations and supporters."
      image={bannerImage}
    >
      <>
        <header>
          <h1>Support</h1>
          {isSuccess && <h3 className="mt-12">thanks my dude 🥹</h3>}
          {!session && (
            <p className="max-w-prose mt-3">
              Sign in using the email you used to tip to leave a message!
              (entirely optional ofc)
            </p>
          )}
        </header>
      </>

      {!session && (
        <form
          className="w-full mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            signIn("email", { email: userEmail ? userEmail : inputEmail });
          }}
        >
          {!userEmail && (
            <div className="max-w-sm mx-auto">
              <label htmlFor="email" className="font-medium text-lg">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="tim@apple.com"
                className={cx(
                  "block w-full rounded-md py-2 px-4 mt-1",
                  "placeholder:text-neutral-500 dark:placeholder:text-neutral-600 bg-neutral-100",
                  "border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black",
                )}
              />
            </div>
          )}
          <div className="max-w-sm mx-auto mt-4">
            <button className="button-primary w-full" type="submit">
              Sign in with email
            </button>
          </div>
        </form>
      )}

      <p className="text-neutral-700 dark:text-neutral-300 mt-24 mx-auto text-center font-semibold">
        Message board functionality coming soon!!
      </p>
      <p className="text-neutral-500 dark:text-neutral-400 mt-4 mx-auto text-center">
        ur support is unbeaten 👉🏽👈🏽
      </p>
    </Wrapper>
  );
};

export default Support;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
