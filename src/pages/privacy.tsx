import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";

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
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
