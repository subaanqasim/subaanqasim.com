import { SEO, SimpleLayout } from "@components/common";
import { Card, Container } from "@components/ui";
import {
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@utils/formatDate";
import { getBannerImage } from "@utils/getCommonImages";
import { getReadingTime } from "@utils/reading-time";
import { allArticlesQuery } from "@utils/sanity/queries";
import { getClient } from "@utils/sanity/sanity-server";
import { articleSchema } from "@utils/sanity/schema-types";
import { type InferGetStaticPropsType } from "next";
import { useState } from "react";
import { ZodError } from "zod";

type ArticleProps = {
  article: InferGetStaticPropsType<typeof getStaticProps>["articles"][0];
};

function Article({ article }: ArticleProps) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title as="h3" href="#" className="group/border">
          {article.title}
        </Card.Title>

        {/* Mobile */}
        <Card.Eyebrow as="div" decorate className="gap-3 md:hidden">
          <div className="flex items-center">
            <CalendarDaysIcon className="mr-1 h-4 w-4" aria-hidden="true" />
            <time dateTime={article.datePublished}>
              {formatDate(article.datePublished)}
            </time>
          </div>
          /
          <div className="flex items-center">
            <ClockIcon className="mr-1 h-4 w-4" />
            <span
              aria-label={`${article.readingTime.minutes} ${article.readingTime.minOrMins} read`}
            >
              {`${article.readingTime.minutes} ${article.readingTime.minOrMins}`}
            </span>
          </div>
          /
          <div className="flex items-center">
            <EyeIcon className="mr-1 h-4 w-4" />
            <span aria-label={`9999 views`}>9999</span>
          </div>
        </Card.Eyebrow>

        <Card.Description>{article.excerpt}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>

      {/* Desktop */}
      <Card.Eyebrow as="div" className="mt-1 hidden space-y-1 md:block">
        <div className="flex items-center">
          <CalendarDaysIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          <time dateTime={article.datePublished}>
            {formatDate(article.datePublished)}
          </time>
        </div>

        <div className="flex items-center">
          <ClockIcon className="mr-1 h-4 w-4" />
          <span
            aria-label={`${article.readingTime.minutes} ${article.readingTime.minOrMins} read`}
          >
            {`${article.readingTime.minutes} ${article.readingTime.minOrMins}`}
          </span>
        </div>

        <div className="flex items-center">
          <EyeIcon className="mr-1 h-4 w-4" />
          <span aria-label={`9999 views`}>9999</span>
        </div>
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesPage({
  bannerImage,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <SimpleLayout
        title="Articles"
        intro="Thoughts and unadulterated streams of consciousness about Medicine, tech and life."
      >
        <div className="relative my-6 mx-auto max-w-3xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 ml-3 flex items-center">
            <MagnifyingGlassIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
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
              <XCircleIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </div>
          )}
        </div>

        {search.length === 0 && (
          <div className="mx-auto max-w-3xl">
            <h2 className="mt-16 mb-4 text-2xl font-semibold sm:mt-20 md:text-3xl">
              Featured
            </h2>
            <div className="flex flex-col space-y-16 md:border-l md:border-neutral-100 md:py-2 md:pl-6 md:dark:border-neutral-700/60">
              {/* {filteredArticles.map((article) => (
                <Article key={article._id} article={article} />
              ))} */}
              <p className="text-center text-xl font-medium">
                Nothing here... yet. Check back soon! 🔜
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          <h2 className="mt-16 mb-4 text-2xl font-semibold sm:mt-20 md:text-3xl">
            All Articles
          </h2>
          <div className="flex flex-col space-y-16 md:border-l md:border-neutral-100 md:py-2 md:pl-6 md:dark:border-neutral-700/60">
            {filteredArticles.length === 0 && (
              <p className="text-center text-2xl font-semibold">
                {/* No articles found 😢 */}
                Intense writing in progress! 🥵
              </p>
            )}

            {filteredArticles.map((article) => (
              <Article key={article._id} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>

      <Container className="mt-16 sm:mt-32">
        <main className="w-full"></main>
      </Container>
    </>
  );
}

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
        _id: true,
        datePublished: true,
      })
      .array()
      .parse(articleData);

    const articlesWithReadingTime = articles.map((article) => ({
      ...article,
      readingTime: getReadingTime(article.content),
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
    } else {
      console.error(error);
    }

    return {
      props: {
        bannerImage,
        articles: [],
      },
    };
  }
};
