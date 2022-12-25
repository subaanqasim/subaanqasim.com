import { Card } from "@components/ui/Card";
import {
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@utils/formatDate";
import { type IArticle } from "@utils/types/contentful";
import rt from "reading-time";

export default function ArticleCard({
  articleData,
}: {
  articleData: IArticle;
}) {
  const article = articleData.fields;
  const readingTime = rt(article.body + article.body2);
  const roundedMins = Math.round(readingTime.minutes);
  // if 0, return 1 (so 1min is minimum)
  const minutes = roundedMins === 0 ? 1 : roundedMins;

  return (
    <Card as="article">
      <Card.Title as="h3" href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="div" decorate className="gap-3">
        <div className="flex items-center">
          <CalendarDaysIcon className="mr-1 h-4 w-4" aria-hidden="true" />
          <time dateTime={article.datePublished}>
            {formatDate(article.datePublished)}
          </time>
        </div>
        /
        <div className="flex items-center">
          <ClockIcon className="mr-1 h-4 w-4" />
          <span
            aria-label={`${minutes} ${minutes > 1 ? "minutes" : "minute"} read`}
          >
            {`${minutes} min`}
          </span>
        </div>
        /
        <div className="flex items-center">
          <EyeIcon className="mr-1 h-4 w-4" />
          <span aria-label={`9999 views`}>9999</span>
        </div>
      </Card.Eyebrow>
      <Card.Description>{article.excerpt}</Card.Description>
      <Card.Cta className="lg:ml-auto">Read article</Card.Cta>
    </Card>
  );
}
