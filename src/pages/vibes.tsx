import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Development from "../components/Development";
import Wrapper from "../components/Wrapper";
import { getBannerImage } from "@utils/getBannerImage";

const Vibes = ({
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
      title="Vibes"
      description="A collection of tweets, memes and random stuff I majorly vibed with."
      image={bannerImage}
    >
      <Development title="Vibes" />
    </Wrapper>
  );
};

export default Vibes;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
