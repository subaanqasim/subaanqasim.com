import { SEO } from "@components/common";
import Development from "@components/Development";
import { getBannerImage } from "@utils/getCommonImages";
import { type InferGetStaticPropsType } from "next";

const Vibes = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO
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
