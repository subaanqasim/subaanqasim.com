import { urlForImage } from "@utils/sanity/sanity-image";
import type { SanityImageType } from "@utils/sanity/schema-types";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";

interface CommonProps {
  title: string;
  description?: string;
  image: SanityImageType;
  noindex?: boolean;
  nofollow?: boolean;
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

const SEO = ({
  title,
  description,
  image,
  noindex,
  nofollow,
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
              url: urlForImage(image).url(),
              width: image.asset.metadata.dimensions.width,
              height: image.asset.metadata.dimensions.height,
              alt: image.asset.altText ?? "",
              type: image.asset.mimeType,
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
          images={[urlForImage(image).url()]}
          datePublished={datePublished}
          dateModified={dateModified}
          authorName={{
            name: authorName,
            url: authorUrl,
          }}
        />
      )}
    </>
  );
};

export default SEO;
