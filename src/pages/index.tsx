import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/future/image";
import FeaturedPost from "src/components/FeaturedPost";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

const SeeMoreLink: React.FC<{ text: string; href: string }> = ({
  text,
  href,
}) => (
  <Link href={href}>
    <a className="inline-flex items-center group hover:text-neutral-500 dark:hover:text-neutral-400 transition-all">
      {text}
      <svg
        width="16"
        height="16"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 group-hover:translate-x-2 transition-transform duration-[400ms] ease-[cubic-bezier(.5,0,.15,1)]"
      >
        <path
          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </a>
  </Link>
);

const Home = ({
  bannerImage,
  profileImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { pathname } = useRouter();

  const { mutate: addView, data: updatedViews } =
    trpc.proxy.views.addView.useMutation(); // TODO: add query invalidation

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <>
      <Wrapper
        title="Subaan Qasim | Medical Student & Developer"
        image={bannerImage}
        type="website"
      >
        <header className="flex flex-col-reverse sm:flex-row gap-8 justify-between w-full mb-20">
          <div className="flex flex-col max-w-[500px]">
            <h1 className="mb-2">Subaan Qasim</h1>

            <h2 className="text-lg md:text-xl font-normal tracking-wide mb-10">
              Medical student, podcaster &{" "}
              <span className="italic font-medium">(kinda)</span> full-stack
              developer.
            </h2>

            <p className="mb-8 sm:mb-5 text-neutral-500 dark:text-neutral-400">
              Posting projects, thoughts and unadulterated streams of
              consciousness on my section of the internet.
            </p>

            <div className="flex gap-5 mt-auto">
              <Link href="#work" scroll={false}>
                <a className="button-primary">My work</a>
              </Link>
              <Link href="/about">
                <a className="button-secondary">About me</a>
              </Link>
            </div>
          </div>

          <div className="w-[150px] sm:min-w-[30%]">
            <div className="aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-5 relative before:absolute before:-inset-1 before:bg-gradient-to-r before:from-teal-600 before:to-emerald-600 before:blur before:opacity-40 before:-z-[1] before:hocus:opacity-80 before:transition before:ease-[cubic-bezier(.5,0,.15,1)] before:duration-500 before:animate-glow-tilt before:rounded-full sm:before:rounded-none">
              <Image
                src={`https:${profileImage.fields.file!.url}`}
                width={profileImage.fields.file?.details.image?.width}
                height={profileImage.fields.file?.details.image?.height}
                alt="Subaan Qasim"
                sizes="30vw"
                priority
                className="rounded-full sm:rounded-md object-cover"
              />
            </div>
          </div>
        </header>
        <main id="work" className="w-full">
          <h3 className="mb-4 text-2xl md:text-4xl">Featured Projects</h3>

          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
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

          <h3 className="mb-4 text-2xl md:text-4xl mt-16">Featured Articles</h3>
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
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

          <h3 className="mb-4 text-2xl md:text-4xl mt-16">Favourite Shots</h3>

          <SeeMoreLink text="View all photos" href="/photography" />
        </main>
      </Wrapper>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");
  const profileImage = await cda.getAsset("3Cgp43AjBUNejadXB6C5hu");

  return {
    props: {
      bannerImage,
      profileImage,
    },
  };
};
