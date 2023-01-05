import { ArticleLayout } from "@components/article";
import { MdxComponents } from "@components/mdx";
import {
  allProjectSlugsQuery,
  projectBySlugQuery,
} from "@utils/sanity/queries";
import { getClient, picoSanity } from "@utils/sanity/sanity-server";
import { projectSchema } from "@utils/sanity/schema-types";
import { serializeMDX } from "@utils/serializeMDX";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { MDXRemote } from "next-mdx-remote";
import { ZodError } from "zod";

export default function Project({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ArticleLayout article={project}>
      <MDXRemote
        {...project.content}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        components={{ ...MdxComponents } as any}
      />
    </ArticleLayout>
  );
}

export const getStaticPaths = (async () => {
  const projectSlugs: string[] = await picoSanity.fetch(allProjectSlugsQuery);

  return {
    paths: projectSlugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params, preview = false }) => {
  try {
    const projectData = await getClient(preview).fetch(projectBySlugQuery, {
      slug: params?.slug,
    });

    const project = projectSchema.parse(projectData);

    const content = await serializeMDX(project.content);

    return {
      props: {
        project: {
          ...project,
          content,
        },
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error);
    } else {
      console.error(error);
    }
  }

  return {
    notFound: true,
  };
}) satisfies GetStaticProps;
