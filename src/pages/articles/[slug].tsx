import { type GetStaticPropsContext } from "next";
import { type IArticle } from "@utils/types/contentful";
import { type ParsedUrlQuery } from "querystring";
import { cda } from "@utils/contentful";
import type InferNextPropsType from "infer-next-props-type";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeImgCmsMeta from "@utils/rehype-image-cms-meta";
import rt from "reading-time";
import { components } from "@components/article";
import { ArticleLayout } from "@components/article";

interface IParams extends ParsedUrlQuery {
  slug: string;
  nextArticle?: string;
  prevArticle?: string;
}

export type Sibling = Pick<IArticle, "sys"> & {
  fields: Pick<IArticle["fields"], "slug" | "title">;
};

const Article = ({
  article,
  nextArticle,
  prevArticle,
}: InferNextPropsType<typeof getStaticProps>) => {
  return (
    <ArticleLayout
      {...article.fields}
      dateModified={article.sys.updatedAt}
      nextArticle={nextArticle}
      prevArticle={prevArticle}
      readingTime={article.readingTime}
    >
      <div className="prose prose-base prose-neutral mx-auto w-full prose-headings:relative dark:prose-invert">
        <MDXRemote {...article.content} components={{ ...components } as any} />
      </div>
    </ArticleLayout>
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

  if (!article) {
    return {
      notFound: true,
    };
  }

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
    order: "-fields.datePublished",
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
    },
  });

  return {
    props: {
      article: {
        ...article,
        content,
        readingTime: rt(body).text,
      },
      nextArticle: (next.items[0] as Sibling) || null,
      prevArticle: (prev.items[0] as Sibling) || null,
    },
  };
};
