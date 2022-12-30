import { type SiblingArticleType } from "@utils/sanity/schema-types";
import Link from "next/link";
import cn from "classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type SiblingLinkProps = {
  nextArticle: SiblingArticleType;
  prevArticle: SiblingArticleType;
};

export default function SiblingLinks({
  nextArticle,
  prevArticle,
}: SiblingLinkProps) {
  return (
    <div
      className={cn(
        "mt-10 flex flex-col-reverse gap-5 sm:flex-row",
        prevArticle ? "justify-between" : "justify-end",
      )}
    >
      {prevArticle && (
        <Link
          href={`/articles/${prevArticle.slug.current}`}
          className="group flex grow items-center justify-between gap-2 rounded-lg p-4 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] hocus:-translate-y-1 hocus:scale-[1.02] dark:bg-neutral-800 sm:max-w-[50%]"
        >
          <ArrowLeftIcon className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] group-hover:-translate-x-2" />
          <div>
            <div className="text-right text-sm tracking-wide dark:text-neutral-400">
              Previous Article
            </div>

            <div className="mt-3 text-right font-medium tracking-wide">
              {prevArticle.title}
            </div>
          </div>
        </Link>
      )}

      {nextArticle && (
        <Link
          href={`/articles/${nextArticle.slug.current}`}
          className="group flex grow items-center justify-between gap-2 rounded-lg p-4 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] hocus:-translate-y-1 hocus:scale-[1.02] dark:bg-neutral-800 sm:max-w-[50%]"
        >
          <div>
            <div className="text-sm tracking-wide dark:text-neutral-400">
              Next Article
            </div>
            <div className="mt-3 font-medium tracking-wide">
              {nextArticle.title}
            </div>
          </div>
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(.5,0,.15,1)] group-hover:translate-x-2" />
        </Link>
      )}
    </div>
  );
}
