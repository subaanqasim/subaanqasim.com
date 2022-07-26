import { cda } from "@utils/contentful";
import Wrapper from "../components/Wrapper";
import { InferGetStaticPropsType } from "next";

export default function About({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Wrapper
      title="About"
      description="Medical Student, full stack developer, and wannabe data scientist. Posting projects, thoughts and unadulterated streams of consciousness."
      image={bannerImage}
    >
      <h1>About</h1>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
