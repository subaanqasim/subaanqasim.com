import Link from "next/link";

interface ArticlePostProps {
  title: string;
  excerpt: string;
  slug: string;
}

const ArticlePost = ({ title, excerpt, slug }: ArticlePostProps) => {
  return (
    <Link href={`/articles/${slug}`}>
      <a className="group hover:-translate-y-2 hover:scale-[1.01] transition duration-[250ms] ease-[cubic-bezier(0.5,0,0.15,1)] border-[3px] rounded-md p-4 border-neutral-300 dark:border-neutral-600">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-1 sm:gap-6">
          <h3 className="text-lg sm:text-xl font-medium group-hover:text-orange-700 dark:group-hover:text-orange-500 transition-all duration-[250ms] ease-[cubic-bezier(0.5,0,0.15,1)]">
            {title}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-500 ">13 min read</p>
        </div>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-all duration-[250ms] ease-[cubic-bezier(0.5,0,0.15,1)]">
          {excerpt}
        </p>
      </a>
    </Link>
  );
};

export default ArticlePost;
