import { type InferGetStaticPropsType } from "next";
import Development from "../components/Development";
import Seo from "../components/common/SEO";
import { getBannerImage } from "@utils/getBannerImage";

const Vibes = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo
        title="Vibes"
        description="A collection of tweets, memes and random stuff I majorly vibed with."
        image={bannerImage}
      />
      <Development title="Vibes" />
    </>
  );
};

export default Vibes;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
