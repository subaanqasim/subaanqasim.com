import { SEO, SimpleLayout } from "@components/common";
import { ProjectCard } from "@components/project";
import { type GridPatternProps } from "@components/ui";
import {
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getBannerImage } from "@utils/getBannerImage";
import { type InferGetStaticPropsType } from "next";

export type Project = {
  slug: string;
  name: string;
  description: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  pattern: GridPatternProps;
};

export const projects: Project[] = [
  {
    slug: "project-1",
    name: "Project 1",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis quidem, iusto dolorem reiciendis ducimus ullam.",
    icon: UserIcon,
    pattern: {
      y: 16,
      x: "50%",
      width: 72,
      height: 56,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    slug: "project-2",
    name: "Project 2",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis quidem, iusto dolorem reiciendis ducimus ullam.",
    icon: ChatBubbleOvalLeftIcon,
    pattern: {
      y: -6,
      x: "50%",
      width: 72,
      height: 56,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    slug: "project-3",
    name: "Project 3",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis quidem, iusto dolorem reiciendis ducimus ullam.",
    icon: EnvelopeIcon,
    pattern: {
      y: 32,
      x: "50%",
      width: 72,
      height: 56,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    slug: "project-4",
    name: "Project 4",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis quidem, iusto dolorem reiciendis ducimus ullam.",
    icon: UsersIcon,
    pattern: {
      y: 22,
      x: "50%",
      width: 72,
      height: 56,
      squares: [[0, 1]],
    },
  },
];

const Projects = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            <ProjectCard key={project.slug} as="li" project={project} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
};

export default Projects;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
