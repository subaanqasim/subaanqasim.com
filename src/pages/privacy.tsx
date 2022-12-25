import { type InferGetStaticPropsType } from "next";
import { SEO } from "@components/common";
import Development from "../components/Development";
import { getBannerImage } from "@utils/getBannerImage";

const Privacy = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO
        title="Privacy"
        description="Privacy policy for subaanqasim.com."
        image={bannerImage}
      />
      <Development title="Privacy" />
    </>
  );
};

export default Privacy;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
