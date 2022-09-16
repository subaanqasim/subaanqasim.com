import { InferGetStaticPropsType } from "next";
import Development from "../components/Development";
import Wrapper from "../components/Wrapper";
import { getBannerImage } from "@utils/getBannerImage";

const Vibes = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper
      title="Vibes"
      description="A collection of tweets, memes and random stuff I majorly vibed with."
      image={bannerImage}
    >
      <Development title="Vibes" />
    </Wrapper>
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
