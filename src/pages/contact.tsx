import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";
import { cda } from "@utils/contentful";

const Contact = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper
      title="Contact"
      description="Get in touch with me via email or connect with me on social media."
      image={bannerImage}
    >
      <Development title="Contact" />
    </Wrapper>
  );
};

export default Contact;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
