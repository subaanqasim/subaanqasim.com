import Seo from "../components/Seo";
import { cda } from "@utils/contentful";
import { type InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import FeaturedPost from "src/components/FeaturedPost";
import { getBannerImage } from "@utils/getBannerImage";
import { Container } from "@components/Container";
import {
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
} from "@components/Icons";

function SeeMoreLink({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center transition-all hover:text-neutral-500 dark:hover:text-neutral-400"
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

function SocialLink({ icon: Icon, ...props }: any) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-neutral-500 transition group-hover:fill-neutral-600 dark:fill-neutral-400 dark:group-hover:fill-neutral-300" />
    </Link>
  );
}

export default function Home({
  bannerImage,
  profileImage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Seo
        title="Subaan Qasim | Medical Student & Software Developer"
        image={bannerImage}
        type="website"
      />
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            <span className="bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Medical student
            </span>
            ,{" "}
            <a
              href="https://gettingit.co.uk"
              className="decoration underline decoration-amber-500 transition-colors hocus:text-amber-500"
            >
              podcaster
            </a>{" "}
            &{" "}
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
        {/* <div className="mb-20 flex w-full flex-col-reverse justify-between gap-8 sm:flex-row">
          <div className="flex max-w-[500px] flex-col">
            <h1 className="mb-2">Subaan Qasim</h1>

            <h2 className="mb-10 text-lg font-normal tracking-wide md:text-xl">
              Medical student, podcaster &{" "}
              <span className="font-medium italic">(kinda)</span> full-stack
              developer.
            </h2>

            <p className="mb-8 text-neutral-500 dark:text-neutral-400 sm:mb-5">
              Posting projects, thoughts and unadulterated streams of
              consciousness on my section of the internet.
            </p>

            <div className="mt-auto flex gap-5">
              <Link href="#work" scroll={false} className="button-primary">
                My work
              </Link>
              <Link href="/about" className="button-secondary">
                About me
              </Link>
            </div>
          </div>

          <div className="w-[150px] sm:min-w-[30%]">
            <div className="aspect-w-1 aspect-h-1 relative before:absolute before:-inset-1 before:-z-[1] before:animate-glow-tilt before:rounded-full before:bg-gradient-to-r before:from-teal-600 before:to-emerald-600 before:opacity-40 before:blur before:transition before:duration-500 before:ease-[cubic-bezier(.5,0,.15,1)] before:hocus:opacity-80 sm:aspect-w-4 sm:aspect-h-5 sm:before:rounded-none">
              <Image
                src={`https:${profileImage.fields.file!.url}`}
                width={profileImage.fields.file?.details.image?.width}
                height={profileImage.fields.file?.details.image?.height}
                alt="Subaan Qasim"
                sizes="30vw"
                priority
                className="rounded-full object-cover sm:rounded-md"
              />
            </div>
          </div>
        </div> */}
        <div id="work" className="mt-12  w-full">
          <h3 className="mb-4 text-2xl md:text-4xl">Featured Projects</h3>

          <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row">
            <FeaturedPost
              type="project"
              title="Coming Soon..."
              excerpt="Development in progress 🔨"
              // slug="#"
            />
            <FeaturedPost
              type="project"
              title="Also Coming Soon..."
              excerpt="Development still in progress for this one as well 🔨"
              // slug="#"
            />
            <FeaturedPost
              type="project"
              title="Guess What? Coming Soon... 🤧"
              excerpt="I hate to break it to you, but this one is also being developed 🛠"
              // slug="#"
            />
          </div>

          <SeeMoreLink text="See more projects" href="/projects" />

          <h3 className="mb-4 mt-16 text-2xl md:text-4xl">Featured Articles</h3>
          <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row">
            <FeaturedPost
              type="article"
              title="Coming soon..."
              excerpt="Writing in progress ✍🏽"
              // slug="#"
            />
            <FeaturedPost
              type="article"
              title="Hopefully Coming Soon Also..."
              excerpt="Writing still in progress for this one as well ✍🏽"
              // slug="#"
            />
            <FeaturedPost
              type="article"
              title="Unfortunately, This One Is Also Coming Soon..."
              excerpt="I hate to break it to you, but this one is also being written ✍🏽"
              // slug="#"
            />
          </div>

          <SeeMoreLink text="Read all articles" href="/articles" />

          <h3 className="mb-4 mt-16 text-2xl md:text-4xl">Favourite Shots</h3>

          <SeeMoreLink text="View all photos" href="/photography" />
        </div>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();
  const profileImage = await cda.getAsset("3Cgp43AjBUNejadXB6C5hu");

  return {
    props: {
      bannerImage,
      profileImage,
    },
  };
};
