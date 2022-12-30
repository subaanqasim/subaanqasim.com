import { groq } from "next-sanity";
import { picoSanity } from "./sanity/sanity-server";
import { sanityImageAssetSchema } from "./sanity/schema-types";

export const getBannerImage = async () => {
  const bannerImageAsset = await picoSanity.fetch(
    groq`
      *[assetId == "3982ae42a7e10abaaf704305e0defb0ab6628e9c"][0]
    `,
  );

  const bannerImage = sanityImageAssetSchema.parse(bannerImageAsset);

  return {
    _type: "image",
    asset: bannerImage,
  };
};
