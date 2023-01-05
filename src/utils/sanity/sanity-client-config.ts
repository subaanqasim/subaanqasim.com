import { type ClientConfig } from "next-sanity";
import { env } from "@env/client.mjs";

export const sanityConfig = {
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,

  // need to use process.env so that errors don't get thrown as it thinks server-side env variables are being imported to the client
  useCdn: process.env.NODE_ENV !== "production",
} satisfies ClientConfig;
