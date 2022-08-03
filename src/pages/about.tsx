import { cda } from "@utils/contentful";
import Wrapper from "../components/Wrapper";
import { InferGetStaticPropsType } from "next";
import Development from "../components/Development";

const About = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper title="About" image={bannerImage}>
      <Development title="About" />
    </Wrapper>
  );
};

export default About;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
