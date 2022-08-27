import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { cda } from "@utils/contentful";
import type { IArticle } from "@utils/types/contentful";

interface IParams extends ParsedUrlQuery {
  slug: string;
  nextArticle?: string;
  prevArticle?: string;
}

const Article = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(props);
  return (
    <>
      <h1>Article</h1>
      <h2>{props.article?.fields.title}</h2>
    </>
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

  return {
    notFound,
    props: {
      article,
      nextArticle: next.items[0] || null,
      prevArticle: prev.items[0] || null,
    },
  };
};
