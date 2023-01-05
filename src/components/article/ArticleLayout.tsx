import { SEO } from "@components/common";
import { Container } from "@components/ui";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { type ReadingTime } from "@utils/reading-time";
import type {
  ArticleType,
  ProjectType,
  SiblingArticleType,
} from "@utils/sanity/schema-types";
import { useRouter } from "next/router";
import ArticleHeader from "./ArticleHeader";
import Prose from "./Prose";
import SiblingLinks from "./SiblingLinks";

type ArticleLayoutProps = {
  children: React.ReactNode;
  readingTime?: ReadingTime;
  nextArticle?: SiblingArticleType;
  prevArticle?: SiblingArticleType;
  article: Omit<ArticleType, "content"> | Omit<ProjectType, "content">;
};

export default function ArticleLayout({
  children,
  nextArticle,
  prevArticle,
  readingTime,
  article,
}: ArticleLayoutProps) {
  const router = useRouter();

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.featureImage}
        datePublished={article.datePublished}
        dateModified={article._updatedAt}
        authorName={article.author.name}
        authorUrl={article.author.socials.website ?? "https://subaanqasim.com"}
        tags={article.tags}
        type="article"
      />
      <Container className="mt-16 lg:mt-32">
        <div className="w-full">
          <div className="xl:relative">
            <div className="mx-auto max-w-2xl">
              <button
                type="button"
                onClick={() => router.push("/articles")}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 transition dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0 dark:ring-white/10 dark:hover:border-neutral-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-neutral-500 transition group-hover:stroke-neutral-700 dark:stroke-neutral-500 dark:group-hover:stroke-neutral-400" />
              </button>

              <article>
                <ArticleHeader
                  title={article.title}
                  datePublished={article.datePublished}
                  updatedAt={article._updatedAt}
                  readingTime={readingTime}
                  author={article.author}
                  slug={article.slug.current}
                />
                <Prose className="mt-8">{children}</Prose>
              </article>
            </div>
          </div>
          <SiblingLinks nextArticle={nextArticle} prevArticle={prevArticle} />
        </div>
      </Container>
    </>
  );
}
