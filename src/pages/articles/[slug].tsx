import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { cda } from "@utils/contentful";
import type { IArticle } from "@utils/types/contentful";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Wrapper from "../../components/Wrapper";
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
  return (
    <Wrapper
      title={article.fields.title}
      description={article.fields.excerpt}
      image={article.fields.featuredImage}
    >
      <h1>Article</h1>
      <h2>{article?.fields.title}</h2>
      <MDXRemote {...article.content} />
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

  const content = await serialize(body);

  return {
    notFound,
    props: {
      article: {
        ...article,
        content,
      },
      nextArticle: next.items[0] || null,
      prevArticle: prev.items[0] || null,
    },
  };
};
