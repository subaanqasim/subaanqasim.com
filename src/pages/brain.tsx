import { useEffect } from "react";
import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";

const Brain = ({
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
      title="Brain"
      description="All of my notes, thoughts and ideas from my Obsidian.md vault."
      image={bannerImage}
    >
      <Development title="Brain" />
    </Wrapper>
  );
};

export default Brain;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
