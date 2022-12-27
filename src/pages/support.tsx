import { useState } from "react";
import { type InferGetStaticPropsType } from "next";
import { SEO } from "@components/common";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import cn from "classnames";
import { getBannerImage } from "@utils/getBannerImage";
import { Button, Container } from "@components/ui";

const Support = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [inputEmail, setInputEmail] = useState("");
  const { query } = useRouter();
  const { data: session } = useSession();

  const isSuccess = query.success === "true";
  const userEmail = query.email;

  return (
    <>
      <SEO
        title="Support"
        description="Kind words from donations and supporters."
        image={bannerImage}
      />
      <Container className="mt-16 sm:mt-32">
        <>
          <header>
            <h1>Support</h1>
            {isSuccess && <h3 className="mt-12">thanks my dude 🥹</h3>}
            {!session && (
              <p className="mt-3 max-w-prose">
                Sign in using the email you used to tip to leave a message!
                (entirely optional ofc)
              </p>
            )}
          </header>
        </>
        {!session && (
          <form
            className="mt-10 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              signIn("email", { email: userEmail ? userEmail : inputEmail });
            }}
          >
            {!userEmail && (
              <div className="mx-auto max-w-sm">
                <label htmlFor="email" className="text-lg font-medium">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="tim@apple.com"
                  className={cn(
                    "mt-1 block w-full rounded-md py-2 px-4",
                    "bg-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-600",
                    "border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black",
                  )}
                />
              </div>
            )}
            <div className="mx-auto mt-4 max-w-sm">
              <Button
                variant="primary"
                glowColour="orange-yellow"
                type="submit"
              >
                Sign in with email
              </Button>
            </div>
          </form>
        )}

        <p className="mx-auto mt-24 text-center font-semibold text-neutral-700 dark:text-neutral-300">
          Message board functionality coming soon!!
        </p>
        <p className="mx-auto mt-4 text-center text-neutral-500 dark:text-neutral-400">
          ur support is unbeaten 👉🏽👈🏽
        </p>
      </Container>
    </>
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
