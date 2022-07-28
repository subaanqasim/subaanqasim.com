import Wrapper from "../components/Wrapper";
import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

const Home = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Wrapper
        title="Subaan Qasim | Medical Student & Developer"
        description="Medical Student, full stack developer, and wannabe data scientist. Posting projects, thoughts and unadulterated streams of consciousness."
        image={bannerImage}
        type="website"
      >
        <h1 className="mb-2">Subaan Qasim</h1>
        <h2 className="text-base font-normal tracking-wide mb-10">
          Medical student &{" "}
          <span className="italic font-semibold">(kinda)</span> full-stack
          developer.
        </h2>
        <p className="max-w-prose">
          Posting projects, thoughts and unadulterated streams of consciousness
          on my section of the internet.
        </p>
        <Link href="#work" scroll={false}>
          <a className="button-primary">My work</a>
        </Link>
        <Link href="/about">
          <a className="button-secondary">About me</a>
        </Link>
        <div id="work"> hello world </div>
      </Wrapper>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
