import { groq } from "next-sanity";
import { picoSanity } from "./sanity/sanity-server";
import { sanityImageAssetSchema } from "./sanity/schema-types";
import { imageOptProjection } from "./sanity/queries";

export const getBannerImage = async () => {
  const bannerImageAsset = await picoSanity.fetch(
    groq`
      *[assetId == "3982ae42a7e10abaaf704305e0defb0ab6628e9c"][0]{
        ...,
        opt {
          ${imageOptProjection}
        }
      }
    `,
  );

  const bannerImage = sanityImageAssetSchema.parse(bannerImageAsset);

  return {
    _type: "image",
    asset: bannerImage,
  };
};

export const getProfileImage = async () => {
  const profileImageAsset = await picoSanity.fetch(
    groq`
      *[assetId == "0adf60832d37d233bf2a257784ed3daec9bcb105"][0]{
        ...,
        opt {
          ${imageOptProjection}
        }
      }
    `,
  );

  const profileImage = sanityImageAssetSchema.parse(profileImageAsset);

  return {
    _type: "image",
    asset: profileImage,
  };
};
