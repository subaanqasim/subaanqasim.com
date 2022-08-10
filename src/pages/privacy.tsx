import { useEffect } from "react";
import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

const Privacy = ({
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
      title="Privacy"
      description="Privacy policy for subaanqasim.com."
      image={bannerImage}
    >
      <Development title="Privacy" />
    </Wrapper>
  );
};

export default Privacy;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
