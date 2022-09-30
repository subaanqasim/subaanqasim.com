import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../server/env";
import { cma } from "../../utils/contentful";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  // Check for secret to confirm this is a valid request
  if (req.headers.secret !== env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // get slug by id from management api (as management api can read unpublished content)
    const id = req.body.entryId;

    const entry = await cma.entry.get({ entryId: id });

    const type = entry.sys.contentType.sys.id;
    const slug = entry.fields.slug["en-GB"];

    await res.revalidate(`/${type}s/${slug}`);
    await res.revalidate(`/${type}s`);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
