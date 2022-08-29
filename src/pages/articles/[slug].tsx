import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import type { IArticle } from "@utils/types/contentful";
import { ParsedUrlQuery } from "querystring";
import { cda } from "@utils/contentful";
import Wrapper from "../../components/Wrapper";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rt from "reading-time";
import { components } from "../../components/MdxComponents";

interface IParams extends ParsedUrlQuery {
  slug: string;
  nextArticle?: string;
  prevArticle?: string;
}

const Article = ({
  article,
  nextArticle,
  prevArticle,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(article.content.compiledSource);
  return (
    <Wrapper
      title={article.fields.title}
      description={article.fields.excerpt}
      image={article.fields.featuredImage}
    >
      <h1>{article?.fields.title}</h1>
      <main className="prose prose-neutral mx-auto mt-4 w-full dark:prose-invert">
        <MDXRemote {...article.content} components={{ ...components } as any} />
      </main>
    </Wrapper>
  );
};

export default Article;

export const getStaticPaths = async () => {
  const entries = await cda.getEntries({
    content_type: "article",
    select: "fields.slug",
  });

  const paths = entries.items as IArticle[];

  return {
    paths: paths.map((path) => ({
      params: {
        slug: path.fields.slug,
      },
    })),

    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<IParams>,
) => {
  // Get entry by slug
  const entry = await cda.getEntries({
    content_type: "article",
    "fields.slug[in]": context.params?.slug,
  });

  const article = entry.items[0] as IArticle;
  const notFound = !article ? true : false;

  // Get next and previous article
  const next = await cda.getEntries({
    content_type: "article",
    select: "fields.slug,fields.title",
    order: "fields.datePublished",
    "fields.datePublished[gt]": article.fields.datePublished,
    limit: 1,
  });

  const prev = await cda.getEntries({
    content_type: "article",
    select: "fields.slug,fields.title",
    order: "fields.datePublished",
    "fields.datePublished[lt]": article.fields.datePublished,
    limit: 1,
  });

  let body = article.fields.body;

  // concat body2 if super long article as max 50k characters for one field in Contentful
  if (article.fields.body2) {
    body += article.fields.body2;
  }

  const content = await serialize(body, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
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
    },
  });

  return {
    notFound,
    props: {
      article: {
        ...article,
        content,
        readingTime: rt(article.fields.body).text,
      },
      nextArticle: next.items[0] || null,
      prevArticle: prev.items[0] || null,
    },
  };
};
