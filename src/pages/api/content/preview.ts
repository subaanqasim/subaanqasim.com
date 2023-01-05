import { env } from "@env/server.mjs";
import { getSecret } from "@utils/sanity/plugins/productionUrl/getSecret";
import { previewSecretId } from "@utils/sanity/previewSecretId";
import { articleBySlugQuery } from "@utils/sanity/queries";
import { sanityClient } from "@utils/sanity/sanity-server";
import { articleSchema } from "@utils/sanity/schema-types";
import type { NextApiRequest, NextApiResponse } from "next";

function redirectToPreview(
  res: NextApiResponse<string | void>,
  previewData: { token?: string },
  Location: "/" | `/articles/${string}`,
): void {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData(previewData);

  // Redirect to a preview capable route
  res.writeHead(307, { Location });
  res.end();
}
const _client = sanityClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
) {
  const previewData: { token?: string } = {};

  // if SANITY_REQUIRE_PREVIEW_SECRET is set to true, the session must be started from the Studio.
  if (env.SANITY_REQUIRE_PREVIEW_SECRET === "true" && !req.query.secret) {
    return res.status(401).send("Invalid secret");
  }

  // If a secret is present in the URL, verify it and if valid we upgrade to token based preview mode, which works in Safari and Incognito mode
  if (req.query.secret) {
    const token = env.SANITY_VIEWER_TOKEN;

    const client = _client.withConfig({ useCdn: false, token });

    const secret = await getSecret({ client, id: previewSecretId });

    if (req.query.secret !== secret) {
      return res.status(401).send("Invalid secret");
    }

    previewData.token = token;
  }

  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, previewData, "/");
  }

  const client = _client.withConfig({
    // Fallback to using the WRITE token until https://www.sanity.io/docs/vercel-integration starts shipping a READ token.
    // As this client only exists on the server and the token is never shared with the browser, we don't risk escalating permissions to untrustworthy users
    token: env.SANITY_VIEWER_TOKEN || env.SANITY_EDITOR_TOKEN,
  });

  // Check if the post with the given `slug` exists
  const { articleData } = await client.fetch(articleBySlugQuery, {
    slug: req.query.slug,
  });

  const article = articleSchema.parse(articleData);

  if (!article) {
    return res.status(401).send("Invalid slug");
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, previewData, `/articles/${article.slug.current}`);
}
