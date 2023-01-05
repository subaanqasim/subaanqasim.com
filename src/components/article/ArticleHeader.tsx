import { formatDate } from "@utils/formatDate";
import ShareArticleLinks from "./ShareArticleLinks";
import AuthorHoverCard from "./AuthorHoverCard";
import {
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { type ReadingTime } from "@utils/reading-time";
import { type AuthorType } from "@utils/sanity/schema-types";
import { formatDistance } from "date-fns";
import Balancer from "react-wrap-balancer";

type ArticleHeaderProps = {
  title: string;
  datePublished: string;
  updatedAt: string;
  readingTime?: ReadingTime;
  author: AuthorType;
  slug: string;
};

export default function ArticleHeader({
  title,
  datePublished,
  updatedAt,
  readingTime,
  author,
  slug,
}: ArticleHeaderProps) {
  const lastUpdated = formatDistance(
    new Date(datePublished),
    new Date(updatedAt),
    {
      addSuffix: true,
    },
  );

  return (
    <header className="flex flex-col border-b pb-4 dark:border-neutral-100/30">
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-5xl">
        <Balancer ratio={0.75}>{title}</Balancer>
      </h1>

      <div className="mt-2 flex items-center justify-between gap-1 text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <AuthorHoverCard author={author} />
          <span>{author.name}</span>
        </div>

        <ShareArticleLinks title={title} slug={slug} />
      </div>

      <div className="order-first flex flex-col justify-between gap-2 text-sm text-neutral-500 dark:text-neutral-400 xs:flex-row xs:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <span className="h-4 w-0.5 rounded-full bg-neutral-500 dark:bg-neutral-400" />
          <div className="flex items-center">
            <CalendarDaysIcon className="mr-1 h-4 w-4" aria-hidden="true" />
            <time dateTime={datePublished} className="flex items-center">
              <span>{formatDate(datePublished)}</span>
            </time>
          </div>
          {readingTime && (
            <>
              /
              <div className="flex items-center">
                <ClockIcon className="mr-1 h-4 w-4" />
                <span
                  aria-label={`${readingTime.minutes} ${readingTime.minuteOrMinutes} read`}
                >
                  {`${readingTime.minutes} min`}
                </span>
              </div>
            </>
          )}
          /
          <div className="flex items-center">
            <EyeIcon className="mr-1 h-4 w-4" />
            <span aria-label={`9999 views`}>9999</span>
          </div>
        </div>

        <span>{`Last updated: ${lastUpdated ? lastUpdated : "---"}`}</span>
      </div>
    </header>
  );
}
