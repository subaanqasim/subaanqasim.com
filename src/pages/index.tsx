import Bounce from "@components/Bounce";
import { Card } from "@components/Card";
import { Container } from "@components/Container";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@components/Icons";
import PhotoMarquee from "@components/PhotoMarquee";
import Seo from "@components/Seo";
import { cda } from "@utils/contentful";
import { formatDate } from "@utils/formatDate";
import { getBannerImage } from "@utils/getBannerImage";
import { random } from "@utils/random";
import { type InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import rt from "reading-time";
import { type IArticle } from "@utils/types/contentful";

function SeeMoreLink({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="group mt-12 inline-flex items-center transition-all hover:text-neutral-500 dark:hover:text-neutral-400"
    >
      {text}
      <svg
        width="16"
        height="16"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 transition-transform duration-[400ms] ease-[cubic-bezier(.5,0,.15,1)] group-hover:translate-x-2"
      >
        <path
          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </Link>
  );
}

function SocialLink({
  icon: Icon,
  ...props
}: {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
} & JSX.IntrinsicElements["a"]) {
  const num = random(7, 25);
  const positiveOrNegativeNum = Math.random() < 0.5 ? num : -num;

  return (
    <Bounce method="hover" bounceConfig={{ rotation: positiveOrNegativeNum }}>
      <a
        {...props}
        className="group -m-1 flex items-center p-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="h-6 w-6 fill-neutral-500 transition group-hover:fill-neutral-600 dark:fill-neutral-400 dark:group-hover:fill-neutral-300" />
      </a>
    </Bounce>
  );
}

function ArticleCard({ articleData }: { articleData: IArticle }) {
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

export default function Home({
  bannerImage,
  profileImage,
  photos,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo
        title="Subaan Qasim | Medical Student & Software Developer"
        image={bannerImage}
        type="website"
      />
      <Container className="mt-9">
        <div className="flex justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              <span className="bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Medical student
              </span>
              ,{" "}
              <a
                href="https://gettingit.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="decoration underline decoration-amber-500 transition-colors hocus:text-amber-500"
              >
                podcaster
              </a>{" "}
              & <br className="max-xs:hidden" />
              <span className="bg-gradient-to-br from-teal-500 to-blue-500 bg-clip-text text-transparent">
                full-stack engineer.
              </span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              I’m Subaan, a medical student and tech enthusiast based in London.
              <br />
              Welcome to my section of the internet where I post my projects,
              thoughts and unadulterated streams of consciousness.
            </p>
            <div className="mt-6 flex gap-6">
              <SocialLink
                href="https://twitter.com/subaanqasim"
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
              <SocialLink
                href="https://instagram.com/subaanqasim"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://github.com/subaanqasim"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://linkedin.com/in/subaan-qasim/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </div>
          </div>
          <Image
            src={`https:${profileImage.fields.file.url}`}
            width={profileImage.fields.file?.details.image?.width}
            height={profileImage.fields.file?.details.image?.height}
            alt="Subaan Qasim"
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 250px, 0px"
            priority
            className="aspect-[4/5] rounded-xl object-cover max-lg:hidden lg:w-64 xl:w-80"
          />
        </div>
      </Container>
      <div className="relative mt-32 sm:mt-48">
        <PhotoMarquee photos={photos} />
      </div>

      <Container className="md:28 mt-24" id="work">
        <h2 className="text-3xl font-bold md:text-5xl">Featured Articles</h2>
        <div className="mt-12 flex flex-col gap-16">
          {articles.map((article) => (
            <ArticleCard key={article.fields.slug} articleData={article} />
          ))}
        </div>

        <SeeMoreLink text="Read all articles" href="/articles" />
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();
  const profileImage = await cda.getAsset("3Cgp43AjBUNejadXB6C5hu");

  const { items } = await cda.getEntries({
    content_type: "article",
    order: "-fields.datePublished",
  });

  const photos = await cda.getAssets({
    "metadata.tags.sys.id[all]": "photography",
  });

  return {
    props: {
      bannerImage,
      profileImage,
      photos,
      articles: items as IArticle[],
    },
  };
};
