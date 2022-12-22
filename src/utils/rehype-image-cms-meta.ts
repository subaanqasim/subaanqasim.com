import { visit } from "unist-util-visit";
import { type Element } from "hast";
import { cda } from "@utils/contentful";

// Need to nest the functions as the `visitor` function is not async -> so required to await the getAsset method
const transformer = () => async (tree: any) => {
  const promises: Promise<any>[] = [];

  const visitor = (node: Element) => {
    // find img tags
    if (node.tagName === "img") {
      // extract asset id from src
      const assetSrc = node.properties?.src as string;
      const assetID = assetSrc.split("/")[4];

      // fetch asset from contentful cms
      const asset = cda
        .getAsset(assetID!)
        .then((asset) => ({
          // return required metadata for next/image
          width: asset.fields.file.details.image?.width,
          height: asset.fields.file.details.image?.height,
          src: `https:${asset.fields.file.url}`,
          alt: asset.fields.title,
        }))
        .then((meta) => {
          // apply metadata to img tag so custom next/image mdx component can pull it from props -> see MdxComponents.tsx
          node.properties = {
            src: meta.src,
            alt: meta.alt,
            width: meta.width,
            height: meta.height,
          };
        });

      promises.push(asset);
    }
  };

  visit(tree, "element", visitor);

  // resolve promises after all nodes have been visited
  await Promise.all(promises);

  return;
};

export default transformer;
