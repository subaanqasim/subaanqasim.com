import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "@env/server.mjs";
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
    const slug = entry.fields.slug["en-GB"] as string;

    const next = await cma.entry.getMany({
      query: {
        content_type: "article",
        select: "fields.slug,fields.datePublished",
        order: "fields.datePublished",
        "fields.datePublished[gt]": entry.fields.datePublished["en-GB"],
        limit: 1,
      },
    });

    const prev = await cma.entry.getMany({
      query: {
        content_type: "article",
        select: "fields.slug,fields.datePublished",
        order: "-fields.datePublished",
        "fields.datePublished[lt]": entry.fields.datePublished["en-GB"],
        limit: 1,
      },
    });

    // revalidate updated entry
    await res.revalidate(`/${type}s/${slug}`);

    // revalidate next/prev entries to update their sibling entry links
    if (next.items[0]) {
      await res.revalidate(`/${type}s/${next.items[0].fields.slug["en-GB"]}`);
    }

    if (prev.items[0]) {
      await res.revalidate(`/${type}s/${prev.items[0].fields.slug["en-GB"]}`);
    }

    // revalidate list page
    await res.revalidate(`/${type}s`);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err);

    return res.status(500).send("Error revalidating");
  }
}
