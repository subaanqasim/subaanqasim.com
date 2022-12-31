import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  SEO,
  TwitterIcon,
} from "@components/common";
import {
  ArticleCard,
  BrainPreview,
  PhotoMarquee,
  SocialLink,
} from "@components/home";
import Newsletter from "@components/Newsletter";
import { ProjectCard } from "@components/project";
import { Button, Container } from "@components/ui";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { getBannerImage, getProfileImage } from "@utils/getCommonImages";
import { getReadingTime } from "@utils/reading-time";
import { allArticlesQuery, allPhotographyQuery } from "@utils/sanity/queries";
import { urlForImage } from "@utils/sanity/sanity-image";
import { getClient } from "@utils/sanity/sanity-server";
import {
  articleInListSchema,
  sanityImageAssetSchema,
} from "@utils/sanity/schema-types";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { ZodError } from "zod";
import { projects } from "./projects";

export default function Home({
  bannerImage,
  profileImage,
  photos,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO
        title="Subaan Qasim | Medical Student & Software Developer"
        image={bannerImage}
        type="website"
      />
      <Container className="mt-9">
        <div className="flex justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-5xl">
              <span className="bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Medical student
              </span>
              ,{" "}
              <br className="hidden min-[692px]:block min-[735px]:hidden min-[1069px]:block min-[1115px]:hidden" />
              <a
                href="https://gettingit.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="decoration underline decoration-amber-500 transition-colors hocus:text-amber-500"
              >
                podcaster
              </a>{" "}
              & <br className="max-xs:hidden" />
              <span className="bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text text-transparent">
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
            <div className="mt-12 flex w-full flex-col items-center gap-6 xs:max-w-sm xs:flex-row">
              <Button
                as="a"
                href="#work"
                variant="primary"
                glowColour="cyan-blue"
                size="large"
                className="w-full"
              >
                My Work
              </Button>
              <Button
                as={Link}
                href="/about"
                variant="secondary"
                size="large"
                className="w-full"
              >
                About Me
              </Button>
            </div>
          </div>
          <Image
            src={urlForImage(profileImage.asset).url()}
            width={profileImage.asset.metadata.dimensions.width}
            height={profileImage.asset.metadata.dimensions.height}
            alt="Subaan Qasim"
            placeholder="blur"
            blurDataURL={profileImage.asset.metadata.lqip}
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 250px, 0px"
            priority
            className="aspect-[4/5] h-full rounded-xl object-cover max-lg:hidden lg:max-w-[250px] xl:max-w-xs"
          />
        </div>
      </Container>
      <div className="relative mt-32 sm:mt-48">
        <PhotoMarquee photos={photos} />
      </div>

      <Container className="mt-24 md:mt-28" id="work">
        <div className="mx-auto grid  grid-cols-1 gap-y-20  lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">
              Featured Articles
            </h2>
            <div className="mt-12 flex flex-col gap-16">
              {articles.map((article) => (
                <ArticleCard key={article._id} articleData={article} />
              ))}
            </div>
            <Button
              as={Link}
              href="/articles"
              variant="tertiary"
              size="small"
              className="mt-12"
            >
              Read all articles
              <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="space-y-10 lg:ml-16 xl:ml-24">
            <Newsletter />
            <BrainPreview />
          </div>
        </div>

        <h2 className="mt-16 text-3xl font-bold md:text-5xl">
          Featured Projects
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Button
          as={Link}
          href="/projects"
          variant="tertiary"
          size="small"
          className="mt-12"
        >
          See more projects
          <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Button>
      </Container>
    </>
  );
}

export const getStaticProps = (async ({ preview = false }) => {
  const client = getClient(preview);

  const bannerImage = await getBannerImage();
  const profileImage = await getProfileImage();

  try {
    const photosData = await client.fetch(allPhotographyQuery);
    const photos = sanityImageAssetSchema.array().nonempty().parse(photosData);

    const articleData = await client.fetch(allArticlesQuery);
    const articles = articleInListSchema.array().nonempty().parse(articleData);
    const articlesWithReadingTime = articles.map((article) => ({
      ...article,
      readingTime: getReadingTime(article.content),
    }));

    return {
      props: {
        bannerImage,
        profileImage,
        photos,
        articles: articlesWithReadingTime,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      error = error.flatten();
      console.error(error);
    } else {
      console.error(error);
    }

    return {
      props: {
        bannerImage,
        profileImage,
        photos: [],
        articles: [],
      },
    };
  }
}) satisfies GetStaticProps;
