import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Development from "../components/Development";
import Wrapper from "../components/Wrapper";

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
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
