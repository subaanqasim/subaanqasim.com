import { IArticleFields } from "@utils/types/contentful";
import Wrapper from "../Wrapper";
import { formatDistance } from "date-fns";

interface IArticleLayoutProps extends IArticleFields {
  children: React.ReactNode;
  dateModified: string;
}

const ArticleLayout = ({
  children,
  title,
  author,
  dateModified,
  datePublished,
  excerpt,
  featuredImage,
  keywords,
}: IArticleLayoutProps) => {
  const lastUpdated = formatDistance(
    new Date(datePublished),
    new Date(dateModified),
    {
      addSuffix: true,
    },
  );

  return (
    <Wrapper
      title={title}
      description={excerpt}
      image={featuredImage}
      datePublished={datePublished}
      dateModified={dateModified}
      authorName={author.fields.name}
      authorUrl={author.fields.linkedin}
      tags={keywords}
      type="article"
    >
      <main>
        <article>
          <header>
            <h1>{title}</h1>
            <p>{author.fields.name}</p>
            <p>
              {`Published: ${new Date(datePublished).toLocaleDateString(
                "en-GB",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}`}
            </p>
            <p>{`Last updated: ${lastUpdated ? lastUpdated : "---"}`}</p>
          </header>

          {children}
        </article>
      </main>
    </Wrapper>
  );
};

export default ArticleLayout;
