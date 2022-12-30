import { type Element } from "hast";
import { visit } from "unist-util-visit";
import { picoSanity } from "./sanity/sanity-server";
import { type SanityImageAssetType } from "./sanity/schema-types";

const getAssetId = (url: string) => {
  const split = url.split("/");
  return split[split.length - 1]?.split("-")[0];
};

// Need to nest the functions as the `visitor` function is not async -> so required to await the getAsset method
const transformer = () => async (tree: any) => {
  const promises: Promise<void>[] = [];

  const visitor = (node: Element) => {
    // find img tags
    if (node.tagName === "img") {
      // extract asset id from src
      const assetSrc = node.properties?.src as string;
      const assetId = getAssetId(assetSrc);

      if (!assetId) {
        throw new Error(`Could not extract asset id from ${assetSrc}`);
      }

      // fetch asset from sanity
      const query = `*[assetId == "${assetId}"][0]`;
      const assetMetadata = picoSanity
        .fetch<SanityImageAssetType>(query)
        .then((asset) => {
          // return required metadata for next/image
          return {
            width: asset.metadata.dimensions.width,
            height: asset.metadata.dimensions.height,
            alt: asset.altText,
            blurUrl: asset.metadata.lqip,
            src: assetSrc,
          };
        })
        .then((meta) => {
          // apply metadata to img tag so custom next/image mdx component can pull it from props -> see MdxComponents.tsx
          node.properties = {
            width: meta.width,
            height: meta.height,
            alt: meta.alt,
            blurUrl: meta.blurUrl,
            src: meta.src,
          };
        });

      promises.push(assetMetadata);
    }
  };

  visit(tree, "element", visitor);

  // resolve promises after all nodes have been visited
  await Promise.all(promises);

  return;
};

export default transformer;
