import { cda } from "@utils/contentful";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import Development from "../components/Development";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Support = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query } = useRouter();

  const isSuccess = query.success === "true";

  // TODO: DO SOME SESSION-BASED RENDERING -> MAKE SURE TO CROSS CHECK EMAIL/SESSION IN DB TO MAKE SURE IT HAS STRIPE ID -> I.E. they have donated, because someone could just hit the email auth endpoint manually without donating

  return (
    <Wrapper
      title="Support"
      description="Kind words from donations and supporters."
      image={bannerImage}
    >
      {!isSuccess && <Development title="Support" />}
      {isSuccess && (
        <>
          <h1>thanks my dude</h1>
          <p>pls check ur email to sign-in and leave a message :)</p>
        </>
      )}
    </Wrapper>
  );
};

export default Support;

export const getStaticProps = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return {
    props: {
      bannerImage,
    },
  };
};
