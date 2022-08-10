import { getBannerImage } from "@utils/getBannerImage";
import { trpc } from "@utils/trpc";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArticlePost from "../../components/ArticlePost";
import Wrapper from "../../components/Wrapper";

const articles = [
  {
    title: "I Hope I Actually End Up Writing Stuff This Time",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    slug: "",
  },
  {
    title: "It's Pretty Hard to Think of Filler Content",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    slug: "",
  },
];

const Articles = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = useState("");

  const { pathname } = useRouter();
  const { mutate: addView, data: updatedViews } =
    trpc.proxy.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Wrapper
      title="Articles"
      description="Thoughts and unadulterated streams of consciousness about Medicine, tech and life."
      image={bannerImage}
    >
      <header>
        <h1>Articles</h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-md ">
          Thoughts and unadulterated streams of consciousness about Medicine,
          tech, life, and random projects I&apos;m working on.
        </p>
      </header>
      <main className="w-full">
        <div className="relative my-6">
          <div className="flex absolute inset-y-0 left-0 items-center ml-3 pointer-events-none">
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-neutral-500 dark:text-neutral-400"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <input
            type="text"
            value={search}
            aria-label="Search articles"
            className="block px-4 py-2 pl-10 w-full text-sm text-neutral-600 bg-neutral-100 rounded-lg border border-neutral-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-300 dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="Search articles"
            onChange={(e) => setSearch(e.target.value)}
          />

          {search.length !== 0 && (
            <div
              className="flex absolute inset-y-0 right-0 items-center mr-3 p-1 cursor-pointer hover:scale-[1.1] transition-transform"
              onClick={() => setSearch("")}
            >
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-neutral-500 dark:text-neutral-400"
              >
                <path
                  d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {search.length === 0 && (
          <>
            <h2 className="mb-4">Featured</h2>

            <div className="flex flex-col gap-6">
              <ArticlePost
                title="This is Definitely Not a Featured Post"
                excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                slug=""
              />
            </div>
          </>
        )}

        <h2 className="mt-8 mb-4">All Articles</h2>

        <div className="flex flex-col gap-6">
          {filteredArticles.length === 0 && (
            <p className="text-2xl text-center font-semibold">
              No articles found 😢
            </p>
          )}

          {filteredArticles.map((article) => (
            <ArticlePost
              key={article.title}
              title={article.title}
              excerpt={article.excerpt}
              slug={article.slug}
            />
          ))}
        </div>
      </main>
    </Wrapper>
  );
};

export default Articles;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
