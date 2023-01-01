import { env } from "@env/client.mjs";
import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { media } from "sanity-plugin-media";
import { deskTool } from "sanity/desk";
import { previewDocumentNode } from "./plugins/previewPane";
import { productionUrl } from "./plugins/productionUrl";
import { previewSecretId } from "./previewSecretId";
import { schemaTypes } from "./schemas";
import articleType from "./schemas/article";

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION;

const devOnlyPlugins = [
  visionTool({
    defaultApiVersion: apiVersion,
    defaultDataset: env.NEXT_PUBLIC_SANITY_DATASET,
  }),
];

export default defineConfig({
  basePath: "/cms",
  title: "Subaan's Studio",

  projectId,
  dataset,

  plugins: [
    deskTool({
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),

    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: [articleType.name],
    }),

    // media and asset browser + manager
    media(),

    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },
});
