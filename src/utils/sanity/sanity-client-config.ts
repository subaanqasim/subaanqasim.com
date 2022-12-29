import { type ClientConfig } from "next-sanity";
import { env } from "@env/client.mjs";
import { env as serverEnv } from "@env/server.mjs";

export const sanityConfig: ClientConfig = {
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: serverEnv.NODE_ENV !== "production",
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
};
