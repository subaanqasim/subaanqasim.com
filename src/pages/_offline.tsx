import { cda } from "@utils/contentful";
import { type InferGetStaticPropsType } from "next";
import Seo from "../components/Seo";

const Offline = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo title="Offline" image={bannerImage} nofollow noindex />
      <h1>Offline</h1>
      <p>
        Oops, it seems that you&apos;re offline. Please ensure a stable internet
        connection and try reloading the page again!
      </p>
    </>
  );
};

export default Offline;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");
  return {
    props: {
      bannerImage,
    },
  };
};
