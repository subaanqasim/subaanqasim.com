import { useEffect } from "react";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { getBannerImage } from "@utils/getBannerImage";

const Contact = ({
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
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
