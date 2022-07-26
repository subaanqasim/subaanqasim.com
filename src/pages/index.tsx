import Wrapper from "../components/Wrapper";
import type { Asset } from "contentful";
import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";

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
        <h1 className=" text-neutral-200">
          <span className="text-orange-500">Subaan</span> Qasim
        </h1>
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
