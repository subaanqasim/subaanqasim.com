import Seo from "../components/Seo";
import { type InferGetStaticPropsType } from "next";
import Development from "../components/Development";
import { getBannerImage } from "@utils/getBannerImage";

const Photography = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo
        title="Photography"
        description="A gallery of some of my favourite photos whilst out and about."
        image={bannerImage}
      />
      <Development title="Photography" />
    </>
  );
};

export default Photography;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
