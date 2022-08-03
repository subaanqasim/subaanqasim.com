import { cda } from "@utils/contentful";
import Wrapper from "../components/Wrapper";
import { InferGetStaticPropsType } from "next";
import Development from "../components/Development";

const Projects = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper
      title="Projects"
      description="A collection of my most recent various coding and motion design projects I've worked on."
      image={bannerImage}
    >
      <Development title="Projects" />
    </Wrapper>
  );
};

export default Projects;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
