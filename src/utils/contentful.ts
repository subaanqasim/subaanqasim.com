import { createClient } from "contentful";
import { env } from "../server/env";
import { createClient as createAdminClient } from "contentful-management";

export const cda = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  host: env.CONTENTFUL_HOST,
});

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
