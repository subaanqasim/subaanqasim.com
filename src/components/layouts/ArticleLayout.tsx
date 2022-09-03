import type { IArticleFields } from "@utils/types/contentful";
import { formatDistance } from "date-fns";
import Image from "next/future/image";
import Wrapper from "../Wrapper";
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import cx from "classnames";

import {
  Link2Icon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import type { Sibling } from "../../pages/articles/[slug]";
import Link from "next/link";

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

  return (
    <Wrapper
      title={title}
      description={excerpt}
      image={featuredImage}
      datePublished={datePublished}
      dateModified={dateModified}
      authorName={author.fields.name}
      authorUrl={author.fields.linkedin}
      tags={keywords}
      type="article"
    >
      <main className="w-full">
        <article>
          <header>
            <h1>{title}</h1>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                {keywords.map((word) => (
                  <div
                    key={word}
                    className="bg rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-100 to-stone-200 py-[6px] px-[12px] tracking-wide dark:border-neutral-700 dark:from-neutral-800 dark:to-stone-900
"
                  >
                    {word}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="p-1">
                  <Link2Icon className="h-4 w-4" />
                </div>
                <div className="p-1">
                  <TwitterLogoIcon className="h-4 w-4" />
                </div>
                <div className="p-1">
                  <LinkedInLogoIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between text-sm tracking-wide">
              <div className="flex items-center">
                <Image
                  src={`https:${author.fields.headshot.fields.file.url}`}
                  alt={author.fields.headshot.fields.title}
                  width={32}
                  height={32}
                  sizes="20vw"
                  className="mr-2 h-8 w-8 rounded-full object-cover"
                  priority
                />

                <p className="text-neutral-500 dark:text-neutral-400">
                  <span>{author.fields.name}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(datePublished).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{readingTime}</span>
                </p>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400">
                {`Last updated: ${lastUpdated ? lastUpdated : "---"}`}
              </p>
            </div>
          </header>
          <hr className="border-1 mt-6 mb-12 w-full border-neutral-300 dark:border-neutral-700" />

          {children}
        </article>

        <div
          className={cx(
            "mt-10 flex flex-col-reverse gap-5 sm:flex-row",
            prevArticle ? "justify-between" : "justify-end",
          )}
        >
          {prevArticle && (
            <Link href={`/articles/${prevArticle.fields.slug}`}>
              <a className="group flex grow items-center justify-between gap-2 rounded-lg p-4 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] hocus:-translate-y-1 hocus:scale-[1.02] dark:bg-neutral-800 sm:max-w-[50%]">
                <ArrowLeftIcon className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] group-hover:-translate-x-2" />
                <div>
                  <div className="text-right text-sm tracking-wide dark:text-neutral-400">
                    Previous Article
                  </div>
                  <div className="mt-3 text-right font-medium tracking-wide">
                    {prevArticle?.fields.title}
                  </div>
                </div>
              </a>
            </Link>
          )}

          {nextArticle && (
            <Link href={`/articles/${nextArticle.fields.slug}`}>
              <a className="group flex grow items-center justify-between gap-2 rounded-lg p-4 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] hocus:-translate-y-1 hocus:scale-[1.02] dark:bg-neutral-800 sm:max-w-[50%]">
                <div>
                  <div className="text-sm tracking-wide dark:text-neutral-400">
                    Next Article
                  </div>
                  <div className="mt-3 font-medium tracking-wide">
                    {nextArticle?.fields.title}
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] group-hover:translate-x-2" />
              </a>
            </Link>
          )}
        </div>
      </main>
    </Wrapper>
  );
};

export default ArticleLayout;
