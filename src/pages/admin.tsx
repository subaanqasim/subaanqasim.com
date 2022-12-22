import Development from "../components/Development";
import { type InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import { getBannerImage } from "@utils/getBannerImage";

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
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
