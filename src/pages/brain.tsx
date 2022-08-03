import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";

const Brain = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper
      title="Brain"
      description="All of my notes, thoughts and ideas from my Obsidian.md vault."
      image={bannerImage}
    >
      <Development title="Brain" />
    </Wrapper>
  );
};

export default Brain;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
