import { type InferGetStaticPropsType } from "next";
import { SEO } from "@components/common";
import Development from "../components/Development";
import { getBannerImage } from "@utils/getCommonImages";

const Brain = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO
        title="Brain"
        description="All of my notes, thoughts and ideas from my Obsidian.md vault."
        image={bannerImage}
      />
      <Development title="Brain" />
    </>
  );
};

export default Brain;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
