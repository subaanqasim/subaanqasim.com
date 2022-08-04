import Development from "../components/Development";
import { InferGetStaticPropsType } from "next";
import { cda } from "@utils/contentful";
import Wrapper from "../components/Wrapper";

const Admin = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper title="Admin" image={bannerImage} nofollow noindex>
      <Development title="Admin" />
    </Wrapper>
  );
};

export default Admin;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");
  return {
    props: {
      bannerImage,
    },
  };
};
