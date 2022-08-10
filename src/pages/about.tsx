import { useEffect } from "react";
import { cda } from "@utils/contentful";
import Wrapper from "../components/Wrapper";
import { InferGetStaticPropsType } from "next";
import Development from "../components/Development";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";

const About = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { pathname } = useRouter();
  const { mutate: addView, data: updatedViews } =
    trpc.proxy.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <Wrapper title="About" image={bannerImage}>
      <Development title="About" />
    </Wrapper>
  );
};

export default About;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
