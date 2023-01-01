import { ArticleLayout } from "@components/article";
import { MdxComponents } from "@components/mdx";
import { getReadingTime } from "@utils/reading-time";
import {
  allArticlesSlugQuery,
  articleBySlugQuery,
} from "@utils/sanity/queries";
import { getClient, picoSanity } from "@utils/sanity/sanity-server";
import {
  articleSchema,
  siblingArticleSchema,
} from "@utils/sanity/schema-types";
import { serializeMDX } from "@utils/serializeMDX";
import type InferNextPropsType from "infer-next-props-type";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { MDXRemote } from "next-mdx-remote";
import { ZodError } from "zod";

export default function ArticlePage({
  article,
  nextArticle,
  prevArticle,
}: InferNextPropsType<typeof getStaticProps>) {
  return (
    <ArticleLayout
      article={article}
      nextArticle={nextArticle}
      prevArticle={prevArticle}
      readingTime={article.readingTime}
    >
      <MDXRemote
        {...article.content}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        components={{ ...MdxComponents } as any}
      />
    </ArticleLayout>
  );
}

export const getStaticPaths = (async () => {
  const articleSlugs: string[] = await picoSanity.fetch(allArticlesSlugQuery);

  return {
    paths: articleSlugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  try {
    // Get entry by slug
    const { articleData, nextData, previousData } = await getClient(
      preview,
    ).fetch(articleBySlugQuery, {
      slug: params?.slug,
    });

    const article = articleSchema.parse(articleData);
    const next = siblingArticleSchema.parse(nextData);
    const previous = siblingArticleSchema.parse(previousData);

    const content = await serializeMDX(article.content);

    return {
      props: {
        article: {
          ...article,
          content,
          readingTime: getReadingTime(article.content),
        },
        nextArticle: next ?? null,
        prevArticle: previous ?? null,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.flatten());
    } else {
      console.error(error);
    }

    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps;
