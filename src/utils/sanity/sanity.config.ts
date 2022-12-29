import { env } from "@env/client.mjs";
import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { media } from "sanity-plugin-media";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

const devOnlyPlugins = [
  visionTool({
    defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    defaultDataset: env.NEXT_PUBLIC_SANITY_DATASET,
  }),
];

export default defineConfig({
  basePath: "/cms",
  title: "Subaan's Studio",

  projectId,
  dataset,

  plugins: [deskTool(), media(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
});
