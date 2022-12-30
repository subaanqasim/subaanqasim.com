import { Card } from "@components/ui/Card";
import {
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@utils/formatDate";
import { type ReadingTime } from "@utils/reading-time";
import { type ArticleInListSchemaType } from "@utils/sanity/schema-types";

type ArticleCardProps = {
  articleData: ArticleInListSchemaType & {
    readingTime: ReadingTime;
  };
};

export default function ArticleCard({ articleData }: ArticleCardProps) {
  const { datePublished, excerpt, readingTime, slug, title } = articleData;

  return (
    <Card as="article">
      <Card.Title as="h3" href={`/articles/${slug.current}`}>
        {title}
      </Card.Title>
      <Card.Eyebrow as="div" decorate className="gap-3">
        <div className="flex items-center">
          <CalendarDaysIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          <time dateTime={datePublished}>{formatDate(datePublished)}</time>
        </div>
        /
        <div className="flex items-center">
          <ClockIcon className="mr-1 h-4 w-4" />
          <span
            aria-label={`${readingTime.minutes} ${readingTime.minOrMins} read`}
          >
            {`${readingTime.minutes} ${readingTime.minOrMins}`}
          </span>
        </div>
        /
        <div className="flex items-center">
          <EyeIcon className="mr-1 h-4 w-4" />
          <span aria-label={`9999 views`}>9999</span>
        </div>
      </Card.Eyebrow>
      <Card.Description>{excerpt}</Card.Description>
      <Card.Cta className="lg:ml-auto">Read article</Card.Cta>
    </Card>
  );
}
