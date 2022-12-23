import type { IArticleFields } from "@utils/types/contentful";
import type { Sibling } from "../../pages/articles/[slug]";
import Link from "next/link";
import { formatDistance } from "date-fns";
import Seo from "../Seo";
import ShareArticleLinks from "../ShareArticleLinks";
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import cn from "classnames";
import useMediaQuery from "@utils/useMediaQuery";

import { CalendarIcon, TimerIcon } from "@radix-ui/react-icons";
import AuthorHoverCard from "../AuthorHoverCard";

interface IArticleLayoutProps extends IArticleFields {
  children: React.ReactNode;
  dateModified: string;
  readingTime: string;
  nextArticle: Sibling | null;
  prevArticle: Sibling | null;
}

const ArticleLayout = ({
  children,
  title,
  author,
  dateModified,
  datePublished,
  excerpt,
  featuredImage,
  keywords,
  slug,
  nextArticle,
  prevArticle,
  readingTime,
}: IArticleLayoutProps) => {
  const lastUpdated = formatDistance(
    new Date(datePublished),
    new Date(dateModified),
    {
      addSuffix: true,
    },
  );

  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <>
      <Seo
        title={title}
        description={excerpt}
        image={featuredImage}
        datePublished={datePublished}
        dateModified={dateModified}
        authorName={author.fields.name}
        authorUrl={author.fields.linkedin}
        tags={keywords}
        type="article"
      />
      <main className="w-full">
        <article>
          <header>
            <h1>{title}</h1>
            <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-4 text-xs tracking-wide">
                {keywords.map((word) => (
                  <div
                    key={word}
                    className="flex items-center justify-center rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-100 to-stone-200 py-[6px] px-[12px] text-center dark:border-neutral-700 dark:from-neutral-800 dark:to-stone-900 sm:text-left"
                  >
                    {word}
                  </div>
                ))}
              </div>
              {isDesktop && <ShareArticleLinks title={title} slug={slug} />}
            </div>

            <div className="mt-6 flex flex-col justify-center gap-6 text-sm tracking-wide sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center">
                <AuthorHoverCard author={author} />

                <div className="flex flex-col items-start sm:flex-row sm:items-center">
                  <div>{author.fields.name}</div>

                  <div className="flex gap-4 text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="ml-0 sm:ml-4" />
                      {new Date(datePublished).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <TimerIcon />
                      {readingTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-0 flex grow items-center justify-between gap-2 text-neutral-500 dark:text-neutral-400 sm:-ml-4">
                <div className="ml-0 text-neutral-500 dark:text-neutral-400 sm:ml-auto">
                  {`Last updated: ${lastUpdated ? lastUpdated : "---"}`}
                </div>

                {!isDesktop && <ShareArticleLinks title={title} slug={slug} />}
              </div>
            </div>
          </header>

          <hr className="border-1 mt-6 mb-12 w-full border-neutral-300 dark:border-neutral-700" />

          {children}
        </article>

        <div
          className={cn(
            "mt-10 flex flex-col-reverse gap-5 sm:flex-row",
            prevArticle ? "justify-between" : "justify-end",
          )}
        >
          {prevArticle && (
            <Link
              href={`/articles/${prevArticle.fields.slug}`}
              className="group flex grow items-center justify-between gap-2 rounded-lg p-4 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] hocus:-translate-y-1 hocus:scale-[1.02] dark:bg-neutral-800 sm:max-w-[50%]"
            >
              <ArrowLeftIcon className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] group-hover:-translate-x-2" />
              <div>
                <div className="text-right text-sm tracking-wide dark:text-neutral-400">
                  Previous Article
                </div>

                <div className="mt-3 text-right font-medium tracking-wide">
                  {prevArticle?.fields.title}
                </div>
              </div>
            </Link>
          )}

          {nextArticle && (
            <Link
              href={`/articles/${nextArticle.fields.slug}`}
              className="group flex grow items-center justify-between gap-2 rounded-lg p-4 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] hocus:-translate-y-1 hocus:scale-[1.02] dark:bg-neutral-800 sm:max-w-[50%]"
            >
              <div>
                <div className="text-sm tracking-wide dark:text-neutral-400">
                  Next Article
                </div>
                <div className="mt-3 font-medium tracking-wide">
                  {nextArticle?.fields.title}
                </div>
              </div>
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] group-hover:translate-x-2" />
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default ArticleLayout;
