import { cda } from "@utils/contentful";
export const getBannerImage = async () => {
  const bannerImage = await cda.getAsset("COSxGtiWl0UGQ6EYRWMMF");

  return bannerImage;
};
