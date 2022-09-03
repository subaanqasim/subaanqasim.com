import { IArticleFields } from "@utils/types/contentful";
import Wrapper from "../Wrapper";
import { formatDistance } from "date-fns";
import { Entry } from "contentful";
import Image from "next/future/image";

import {
  Link2Icon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

interface IArticleLayoutProps extends IArticleFields {
  children: React.ReactNode;
  dateModified: string;
  readingTime: string;
  nextArticle: Entry<unknown> | null;
  prevArticle: Entry<unknown> | null;
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

  console.log("next", nextArticle);
  console.log("prev", prevArticle);

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
      </main>
    </Wrapper>
  );
};

export default ArticleLayout;
