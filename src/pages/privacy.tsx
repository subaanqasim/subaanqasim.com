import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";
import { getBannerImage } from "@utils/getBannerImage";

const Privacy = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper
      title="Privacy"
      description="Privacy policy for subaanqasim.com."
      image={bannerImage}
    >
      <Development title="Privacy" />
    </Wrapper>
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
