import Development from "../components/Development";
import { type InferGetStaticPropsType } from "next";
import Seo from "../components/Seo";
import { getBannerImage } from "@utils/getBannerImage";

const Admin = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo title="Admin" image={bannerImage} nofollow noindex />
      <Development title="Admin" />
    </>
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
