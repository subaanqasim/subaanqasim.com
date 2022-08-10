import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";

const Offline = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper title="Offline" image={bannerImage} nofollow noindex>
      <h1>Offline</h1>
      <p>
        Oops, it seems that you&apos;re offline. Please ensure a stable internet
        connection and try reloading the page again!
      </p>
    </Wrapper>
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
