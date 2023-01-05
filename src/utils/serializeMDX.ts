import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeCmsImgMeta from "./rehype-image-cms-meta";

export const serializeMDX = async (content: string) => {
  const serializedResult = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeCmsImgMeta,
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor-link"],
            },
          },
        ],
      ],
      format: "mdx",
      development: false,
    },
  });

  return serializedResult;
};
