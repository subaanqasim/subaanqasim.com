import { env } from "@env/server.mjs";
import { createClient as createAdminClient } from "contentful-management";

export const cma = createAdminClient(
  {
    accessToken: env.CONTENTFUL_ADMIN_TOKEN,
  },
  {
    type: "plain",
    defaults: {
      spaceId: env.CONTENTFUL_SPACE_ID,
      environmentId: "master",
    },
  },
);
