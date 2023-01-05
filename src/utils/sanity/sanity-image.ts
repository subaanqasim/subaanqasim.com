import createImageUrlBuilder from "@sanity/image-url";
import type {
  SanityAsset,
  SanityImageObject,
} from "@sanity/image-url/lib/types/types";
import { sanityConfig } from "./sanity-client-config";

export const imageBuilder = createImageUrlBuilder({
  clientConfig: sanityConfig,
});

export const urlForImage = (source: SanityAsset | SanityImageObject) =>
  imageBuilder.image(source).auto("format").fit("max");
