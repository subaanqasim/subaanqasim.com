import Seo from "../components/Seo";
import { type InferGetStaticPropsType } from "next";
import Development from "../components/Development";
import { getBannerImage } from "@utils/getBannerImage";

const Projects = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo
        title="Projects"
        description="A collection of my most recent various coding and motion design projects I've worked on."
        image={bannerImage}
      />
      <Development title="Projects" />
    </>
  );
};

export default Projects;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
