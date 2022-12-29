import { ArticlePost } from "@components/article";
import { SEO } from "@components/common";
import { Container } from "@components/ui";
import { getBannerImage } from "@utils/getBannerImage";
import { allArticlesQuery } from "@utils/sanity/queries";
import { getClient } from "@utils/sanity/sanity-server";
import { articleSchema } from "@utils/sanity/schema-types";
import { type InferGetStaticPropsType } from "next";
import { useState } from "react";
import rt from "reading-time";
import { ZodError } from "zod";

const Articles = ({
  bannerImage,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <SEO
        title="Articles"
        description="Thoughts and unadulterated streams of consciousness about Medicine, tech and life."
        image={bannerImage}
      />
      <Container className="mt-16 sm:mt-32">
        <header>
          <h1>Articles</h1>
          <p className="mt-4 max-w-md text-neutral-500 dark:text-neutral-400 ">
            Thoughts and unadulterated streams of consciousness about Medicine,
            tech, life, and random projects I&apos;m working on.
          </p>
        </header>
        <main className="w-full">
          <div className="relative my-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 ml-3 flex items-center">
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
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
              className="block w-full rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-2 pl-10 text-sm text-neutral-600 focus:border-orange-500 focus:ring-orange-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:placeholder-neutral-400 dark:focus:border-orange-500 dark:focus:ring-orange-500"
              placeholder="Search articles"
              onChange={(e) => setSearch(e.target.value)}
            />

            {search.length !== 0 && (
              <div
                className="absolute inset-y-0 right-0 mr-3 flex cursor-pointer items-center p-1 transition-transform hover:scale-[1.1]"
                onClick={() => setSearch("")}
              >
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
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
                <p className="text-center text-xl font-medium">
                  Nothing here... yet. Check back soon! 🔜
                </p>
              </div>
            </>
          )}

          <h2 className="mt-8 mb-4">All Articles</h2>

          <div className="flex flex-col gap-6">
            {filteredArticles.length === 0 && (
              // <p className="text-center text-2xl font-semibold">
              //   No articles found 😢
              // </p>
              <p className="text-center text-2xl font-semibold">
                Intense writing in progress! 🥵
              </p>
            )}

            {filteredArticles.map((article) => (
              <ArticlePost
                key={article.title}
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug.current}
                readingTime={article.readingTime}
              />
            ))}
          </div>
        </main>
      </Container>
    </>
  );
};

export default Articles;

export const getStaticProps = async ({ preview = false }) => {
  const bannerImage = await getBannerImage();

  const articleData = await getClient(preview).fetch(allArticlesQuery);

  try {
    const articles = articleSchema
      .pick({
        content: true,
        excerpt: true,
        slug: true,
        title: true,
      })
      .array()
      .parse(articleData);

    const articlesWithReadingTime = articles.map((article) => ({
      ...article,
      readingTime: rt(article.content).text,
    }));

    return {
      props: {
        bannerImage,
        articles: articlesWithReadingTime,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.format());
    } else console.error(error);
  }
};
