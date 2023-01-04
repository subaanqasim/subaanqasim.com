import { SEO, SimpleLayout } from "@components/common";
import { ProjectCard } from "@components/project";
import { getBannerImage } from "@utils/getCommonImages";
import { allProjectsQuery } from "@utils/sanity/queries";
import { getClient } from "@utils/sanity/sanity-server";
import { projectForCardSchema } from "@utils/sanity/schema-types";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Projects({
  projects,
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO
        title="Projects"
        description="A collection of my most recent coding, motion design, and other random projects I've worked on, or am still working on."
        image={bannerImage}
      />

      <SimpleLayout
        title="Things I've made and probably wasted too much time on"
        intro="A collection of the side-projects that I think are kinda cool. If it's code-related, it's probably open-source, so feel free to stick your nose in the code and suggest improvements if you find something you think could be better. If it's not code-related, let me know what you think!"
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} as="li" project={project} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}

export const getStaticProps = (async ({ preview = false }) => {
  const bannerImage = await getBannerImage();

  const projects = projectForCardSchema
    .array()
    .parse(await getClient(preview).fetch(allProjectsQuery));

  return {
    props: {
      bannerImage,
      projects,
    },
  };
}) satisfies GetStaticProps;
