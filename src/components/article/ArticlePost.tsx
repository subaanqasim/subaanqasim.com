import { type ReadingTime } from "@utils/reading-time";
import Link from "next/link";

interface ArticlePostProps {
  title: string;
  excerpt: string;
  slug: string;
  readingTime: ReadingTime;
}

const ArticlePost = ({
  title,
  excerpt,
  slug,
  readingTime,
}: ArticlePostProps) => {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group rounded-md border-[3px] border-neutral-300 p-4 transition duration-[250ms] ease-[cubic-bezier(0.5,0,0.15,1)] hover:-translate-y-2 hover:scale-[1.01] dark:border-neutral-600"
    >
      <div className="flex flex-col items-baseline justify-between gap-0 sm:flex-row sm:gap-6">
        <h3 className="text-lg font-medium transition-all duration-[250ms] ease-[cubic-bezier(0.5,0,0.15,1)] group-hover:text-orange-700 dark:group-hover:text-orange-500 sm:text-xl">
          {title}
        </h3>

        <p className=" text-neutral-500 dark:text-neutral-500">
          {readingTime.words}
        </p>
      </div>
      <p className="mt-1 text-neutral-600 transition-all duration-[250ms] ease-[cubic-bezier(0.5,0,0.15,1)] group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
        {excerpt}
      </p>
    </Link>
  );
};

export default ArticlePost;
