import { NextSeo, ArticleJsonLd } from "next-seo";
import type { Asset } from "contentful";
import { useRouter } from "next/router";
import Donate from "./Donate";

interface CommonProps {
  title: string;
  description?: string;
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

const Wrapper = ({
  title,
  description,
  image,
  noindex,
  nofollow,
  children,
  type,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  tags,
}: SeoProps) => {
  const router = useRouter();

  const seoDescription = description
    ? description
    : "Medical Student, full stack developer, and wannabe data scientist. Posting projects, thoughts and unadulterated streams of consciousness.";

  return (
    <>
      <NextSeo
        title={title.includes("Subaan") ? title : `${title} | Subaan Qasim`}
        description={seoDescription}
        canonical={`https://subaanqasim.com${router.asPath}`}
        openGraph={{
          title: title.includes("Subaan") ? title : `${title} | Subaan Qasim`,
          description: seoDescription,
          url: `https://subaanqasim.com${router.asPath}`,
          locale: "en_GB",
          site_name: "Subaan Qasim",
          type: type,
          images: [
            {
              url: image.fields.file!.url.startsWith("//")
                ? `https:${image.fields.file!.url}`
                : image.fields.file!.url,
              width: image.fields.file!.details.image!.width,
              height: image.fields.file!.details.image!.height,
              alt: image.fields?.title,
              type: image.fields.file?.contentType,
            },
          ],
          article: {
            publishedTime: datePublished,
            modifiedTime: dateModified,
            tags: tags,
            authors: [`${authorName}`],
            // TODO: add article:section og property
          },
        }}
        // TODO: additionalMetaTags={[]} for refined og article authorship?
        twitter={{
          handle: "@subaanqasim",
          site: "@subaanqasim",
          cardType: "summary_large_image",
        }}
        nofollow={nofollow}
        noindex={noindex}
      />
      {type === "article" && (
        <ArticleJsonLd
          type="Blog"
          title={`${title} | Subaan Qasim`}
          description={seoDescription}
          url={`https://www.subaanqasim.com${router.asPath}`}
          images={[
            image.fields.file!.url.startsWith("//")
              ? `https:${image.fields.file!.url}`
              : image.fields.file!.url,
          ]}
          datePublished={datePublished!}
          dateModified={dateModified}
          authorName={{
            name: authorName,
            url: authorUrl,
          }}
        />
      )}
      <div className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto">
        {children}
      </div>
      <div className="fixed bottom-8 left-8">
        <Donate />
      </div>
    </>
  );
};

export default Wrapper;
