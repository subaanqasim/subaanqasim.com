import { ArticleLayout, components } from "@components/article";
import { Container } from "@components/ui";
import rehypeImgCmsMeta from "@utils/rehype-image-cms-meta";
import {
  allArticlesSlugQuery,
  articleBySlugQuery,
} from "@utils/sanity/queries";
import { getClient, picoSanity } from "@utils/sanity/sanity-server";
import {
  articleSchema,
  siblingArticleSchema,
} from "@utils/sanity/schema-types";
import type InferNextPropsType from "infer-next-props-type";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rt from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ZodError } from "zod";

export default function ArticlePage({
  article,
  nextArticle,
  prevArticle,
}: InferNextPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <ArticleLayout
        {...article}
        nextArticle={nextArticle}
        prevArticle={prevArticle}
        readingTime={article.readingTime}
      >
        <div className="prose prose-base prose-neutral mx-auto w-full prose-headings:relative dark:prose-invert">
          <MDXRemote
            {...article.content}
            components={{ ...components } as any}
          />
        </div>
      </ArticleLayout>
    </Container>
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

    const content = await serialize(article.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeImgCmsMeta,
          rehypeSlug,
          rehypeCodeTitles,
          rehypePrism,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor-link"],
              },
            },
          ],
        ],
        format: "mdx",
        development: false,
      },
    });

    return {
      props: {
        article: {
          ...article,
          content,
          readingTime: rt(article.content).text,
        },
        nextArticle: next ?? null,
        prevArticle: previous ?? null,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error);
    } else {
      console.error(error);
    }

    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps;
