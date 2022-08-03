import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";

const Support = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper
      title="Support"
      description="Kind words from donations and supporters."
      image={bannerImage}
    >
      <Development title="Support" />
    </Wrapper>
  );
};

export default Support;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
