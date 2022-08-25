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
    paths: paths.map((path, i) => ({
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

  //TODO: Get title, number, for next and previous article

  return {
    notFound,
    props: {
      article,
      // nextArticle:
      // prevArticle:
    },
  };
};
