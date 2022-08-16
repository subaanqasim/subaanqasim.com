import React, { useEffect } from "react";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { getBannerImage } from "@utils/getBannerImage";

const SocialMediaCard: React.FC<{
  platform: string;
  handle: string;
  href: string;
  icon: JSX.IntrinsicElements["svg"];
  iconColour: string;
}> = ({ platform, handle, href, icon, iconColour }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 w-full flex flex-col items-center justify-center p-4 rounded-md">
      <div className={iconColour}>
        <>{icon}</>
      </div>
      <p className="text-xl mt-6">{platform}</p>
      <p className="text-neutral-600 dark:text-neutral-400">{handle}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer nofollow noopener"
        className="px-8 py-2 dark:bg-neutral-900 bg-neutral-50 rounded-md mt-6 hover:dark:text-orange-500 hover:text-orange-700 w-full text-center hover:scale-105 transition-all"
      >
        Follow
      </a>
    </div>
  );
};

const Contact = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { pathname } = useRouter();
  const { mutate: addView } = trpc.proxy.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <Wrapper
      title="Contact"
      description="Get in touch with me via email or connect with me on social media."
      image={bannerImage}
    >
      <header>
        <h1>Contact</h1>
      </header>

      <main>
        <p className="text-lg mt-2 text-neutral-600 dark:text-neutral-300">
          Got a question, idea, or just wanna chat? Get in touch via your
          preferred avenue below.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 max-w-xl mx-auto">
          <SocialMediaCard
            platform="Twitter"
            handle="@subaanqasim"
            href="https://twitter.com/subaanqasim"
            iconColour="text-blue-500"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                strokeWidth="0.75"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
              </svg>
            }
          />

          <SocialMediaCard
            platform="Instagram"
            handle="@subaanqasim"
            href="https://instagram.com/subaanqasim"
            iconColour="text-orange-600"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                strokeWidth="0.75"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
              </svg>
            }
          />
        </div>

        <div>Email</div>
      </main>
    </Wrapper>
  );
};

export default Contact;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
