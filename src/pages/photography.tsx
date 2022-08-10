import { useEffect } from "react";
import { cda } from "@utils/contentful";
import Wrapper from "../components/Wrapper";
import { InferGetStaticPropsType } from "next";
import Development from "../components/Development";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

const Photography = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { pathname } = useRouter();
  const { mutate: addView, data: updatedViews } =
    trpc.proxy.views.addView.useMutation();

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  return (
    <Wrapper
      title="Photography"
      description="A gallery of some of my favourite photos whilst out and about."
      image={bannerImage}
    >
      <Development title="Photography" />
    </Wrapper>
  );
};

export default Photography;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
