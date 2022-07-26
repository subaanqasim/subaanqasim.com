import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../../components/Wrapper";

const Articles = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Wrapper
      title="Articles"
      description="Thoughts and unadulterated streams of consciousness about Medicine, tech and life."
      image={bannerImage}
    >
      <div>Articles list</div>
    </Wrapper>
  );
};

export default Articles;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
