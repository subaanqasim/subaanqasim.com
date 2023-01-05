import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@env/server.mjs";
import { sanityClient } from "@utils/sanity/sanity-server";
import { type SanityClient } from "next-sanity";
import { parseBody } from "next-sanity/webhook";
import { z } from "zod";
import {
  staleArticleRoutesQuery,
  staleAuthorRoutesQuery,
  staleProjectRoutesQuery,
} from "@utils/sanity/queries";

export { config } from "next-sanity/webhook";

const articleOrProjectBodySchema = z.object({
  _id: z.string(),
  _type: z.union([z.literal("article"), z.literal("project")]),
  datePublished: z.string().datetime(),
  slug: z.object({
    current: z.string(),
  }),
});

const authorBodySchema = z.object({
  _id: z.string(),
  _type: z.literal("author"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      env.SANITY_REVALIDATE_SECRET,
    );

    if (isValidSignature === false) {
      const message = "Invalid signature";
      console.warn(message);
      return res.status(401).send(message);
    }

    if (typeof body._id !== "string" || !body._id) {
      const invalidId = "Invalid _id";
      console.error(invalidId, { body });
      return res.status(400).send(invalidId);
    }

    let parsedBody;
    if (body._type === "author") {
      parsedBody = authorBodySchema.parse(body);
    } else {
      parsedBody = articleOrProjectBodySchema.parse(body);
    }

    const staleRoutes = await getStaleRoutes(parsedBody);
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)));

    const updatedRoutes = `Updated routes: ${staleRoutes.join(", ")}`;
    console.log(updatedRoutes);

    return res.status(200).send(updatedRoutes);
  } catch (error) {
    if (error instanceof Error) {
      console.error({
        message: error.message,
        stack: error.stack ? error.stack.split("\n") : null,
      });

      return res.status(500).send(error.message);
    }
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(error);
    return res.status(500).send("Unknown error:" + error);
  }
}

type StaleRoute =
  | "/"
  | `/about`
  | `/articles/${string}`
  | `/projects/${string}`;

async function getStaleRoutes(
  body: z.infer<typeof authorBodySchema | typeof articleOrProjectBodySchema>,
): Promise<StaleRoute[]> {
  const client = sanityClient.withConfig({
    useCdn: false,
  });

  switch (body._type) {
    case "author":
      return await queryStaleAuthorRoutes(client, body._id);
    case "article":
      return await queryStaleArticleRoutes(client, body._id);
    case "project":
      return await queryStaleProjectRoutes(client, body._id);
    default:
      throw new TypeError(`Unknown type: ${body}`);
  }
}

async function queryStaleAuthorRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  // fetch slugs for articles and projects that reference the author
  const slugsSchema = z.object({
    articles: z.array(z.string()),
    projects: z.array(z.string()),
  });

  const slugs = slugsSchema.parse(
    await client.fetch(staleAuthorRoutesQuery({ id })),
  );
  console.log({ slugs });

  const routes: StaleRoute[] = [];

  routes.push(...slugs.articles.map((slug) => `/articles/${slug}` as const));

  routes.push(...slugs.projects.map((slug) => `/projects/${slug}` as const));

  // also return /about since I'm the only author and the about page is based on my author info
  return ["/about", ...routes];
}

async function queryStaleArticleRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  const slugsSchema = z.object({
    updatedArticle: z.string(),
    nextArticle: z.string().nullable(),
    previousArticle: z.string().nullable(),
    relatedArticles: z.array(z.string()),
    relatedProjects: z.array(z.string()),
  });

  const slugs = slugsSchema.parse(
    await client.fetch(staleArticleRoutesQuery({ id })),
  );
  console.log({ slugs });

  // remove potential duplicate article routes as a sibling article may also be a related article
  // filter removes nullish values
  // (set is spread back into an array due to type issues lol)
  const articleRoutes = [
    ...new Set(
      [
        slugs.updatedArticle,
        slugs.nextArticle,
        slugs.previousArticle,
        ...slugs.relatedArticles,
      ]
        .filter((route) => route)
        .map((slug) => `/articles/${slug}` as const),
    ),
  ] as StaleRoute[];

  const projectRoutes = slugs.relatedProjects.map(
    (slug) => `/projects/${slug}` as const,
  );

  console.log({ articleRoutes, projectRoutes });

  return ["/", ...articleRoutes, ...projectRoutes];
}

async function queryStaleProjectRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  const slugsSchema = z.object({
    updatedProject: z.string(),
    relatedProjects: z.array(z.string()),
    relatedArticles: z.array(z.string()),
  });

  const slugs = slugsSchema.parse(
    await client.fetch(staleProjectRoutesQuery({ id })),
  );
  console.log({ slugs });

  const projectRoutes = [
    `/projects/${slugs.updatedProject}`,
    ...slugs.relatedProjects.map((slug) => `/projects/${slug}` as const),
  ] satisfies StaleRoute[];

  const articleRoutes = slugs.relatedArticles.map(
    (slug) => `/articles/${slug}` as const,
  );

  return ["/", ...projectRoutes, ...articleRoutes];
}
