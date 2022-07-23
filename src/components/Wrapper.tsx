import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
import type { Asset } from "contentful";
import { useRouter } from "next/router";

interface CommonProps {
  title: string;
  description: string;
  image: Asset;
  noindex?: boolean;
  nofollow?: boolean;
  children?: React.ReactNode;
}

type ConditionalProps =
  | {
      type?: "article";
      datePublished: string;
      dateModified: string;
      authorName: string;
      authorUrl: string;
      tags: string[];
    }
  | {
      type?: "website";
      datePublished?: never;
      dateModified?: never;
      authorName?: never;
      authorUrl?: never;
      tags?: never;
    };

type SeoProps = CommonProps & ConditionalProps;

const Wrapper = (props: SeoProps) => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={
          props.title.includes("Subaan")
            ? props.title
            : `${props.title} | Subaan Qasim`
        }
        description={props.description}
        canonical={`https://www.subaanqasim.com${router.asPath}`}
        openGraph={{
          title: props.title.includes("Subaan")
            ? props.title
            : `${props.title} | Subaan Qasim`,
          description: props.description,
          url: `https://www.subaanqasim.com${router.asPath}`,
          locale: "en_GB",
          site_name: "Subaan Qasim",
          type: props.type,
          images: [
            {
              url: props.image.fields.file!.url,
              width: props.image.fields.file!.details.image!.width,
              height: props.image.fields.file!.details.image!.height,
              alt: props.image.fields?.title,
              type: props.image.fields.file?.contentType,
            },
          ],
          article: {
            publishedTime: props.datePublished,
            modifiedTime: props.dateModified,
            tags: props.tags,
            authors: [`${props.authorName}`],
            // TODO: add article:section og property
          },
        }}
        // TODO: additionalMetaTags={[]} for refined og article authorship?
        twitter={{
          handle: "@subaanqasim",
          site: "@subaanqasim",
          cardType: "summary_large_image",
        }}
        nofollow={props.nofollow}
        noindex={props.noindex}
      />
      {props.type === "article" && (
        <ArticleJsonLd
          type="Blog"
          title={`${props.title} | Subaan Qasim`}
          description={props.description}
          url={`https://www.subaan.qasim.com${router.asPath}`}
          images={[props.image.fields.file!.url]}
          datePublished={props.datePublished!}
          dateModified={props.dateModified}
          authorName={{
            name: props.authorName,
            url: props.authorUrl,
          }}
        />
      )}
      <div className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto">
        {props.children}
      </div>
    </>
  );
};

export default Wrapper;
