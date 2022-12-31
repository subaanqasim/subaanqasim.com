import Development from "@components/Development";
import { type InferGetStaticPropsType } from "next";
import { SEO } from "@components/common";
import { getBannerImage } from "@utils/getCommonImages";

const Admin = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO title="Admin" image={bannerImage} nofollow noindex />
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
