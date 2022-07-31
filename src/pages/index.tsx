import Wrapper from "../components/Wrapper";
import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/future/image";

const Home = ({
  bannerImage,
  profileImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Wrapper
        title="Subaan Qasim | Medical Student & Developer"
        description="Medical Student, full stack developer, and wannabe data scientist. Posting projects, thoughts and unadulterated streams of consciousness."
        image={bannerImage}
        type="website"
      >
        <div className="flex flex-col-reverse sm:flex-row gap-8 justify-between w-full">
          <div className="flex flex-col max-w-[500px]">
            <h1 className="mb-2">Subaan Qasim</h1>
            <h2 className="text-lg md:text-xl font-normal tracking-wide mb-10">
              Medical student &{" "}
              <span className="italic font-semibold">(kinda)</span> full-stack
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
        </div>
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
