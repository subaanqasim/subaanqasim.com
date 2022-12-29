/**
 * Server-side Sanity utilities.
 * Separated from client side utilities (e.g. imageBuilder) to allow for optimised tree-shaking.
 */

import { env } from "@env/server.mjs";
import { createClient } from "next-sanity";
import { sanityConfig } from "./sanity-client-config";

export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: env.SANITY_VIEWER_TOKEN,
});

export const getClient = (preview: boolean) =>
  preview ? previewClient : sanityClient;
