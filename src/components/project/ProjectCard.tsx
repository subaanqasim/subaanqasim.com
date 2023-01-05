import { GridPattern } from "@components/ui";
import type { ProjectForCard } from "@utils/sanity/schema-types";
import { type PolymorphicProps } from "@utils/types/ui";
import Link from "next/link";
import React, { useMemo, useState } from "react";

function ProjectIcon({ logoSVGString }: { logoSVGString: string }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900/5 ring-1 ring-neutral-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-neutral-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-cyan-300/10 dark:group-hover:ring-cyan-400">
      <div
        className="h-5 w-5 fill-neutral-700/10 stroke-neutral-700 transition-colors duration-300 group-hover:stroke-neutral-900 dark:fill-white/10 dark:stroke-neutral-400 dark:group-hover:fill-cyan-300/10 dark:group-hover:stroke-cyan-400"
        dangerouslySetInnerHTML={{
          __html: logoSVGString,
        }}
      />
    </div>
  );
}

type ProjectCardPatternProps = {
  mouseX: number;
  mouseY: number;
} & ProjectForCard["pattern"];

function ProjectCardPattern({
  mouseX,
  mouseY,
  ...gridProps
}: ProjectCardPatternProps) {
  const maskImage = `radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;

  const style = useMemo(
    () => ({ maskImage, WebkitMaskImage: maskImage }),
    [maskImage],
  );

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl bg-neutral-100/50 transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50 dark:bg-neutral-900/50">
        <GridPattern
          {...gridProps}
          x="50%"
          width={72}
          height={56}
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
        />
      </div>
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d7edea] to-[#fbeedf] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#342e28]"
        style={style}
      />
      <div
        style={style}
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
      >
        <GridPattern
          {...gridProps}
          x="50%"
          width={72}
          height={56}
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
        />
      </div>
    </div>
  );
}

type ProjectCardProps = {
  project: ProjectForCard;
};

export default function ProjectCard<C extends React.ElementType = "div">({
  project,
  as,
}: PolymorphicProps<C, ProjectCardProps>) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const onMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  };

  const Component = as || "div";

  return (
    <Component
      key={project._id}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-neutral-100/50 shadow-md shadow-neutral-900/5 transition-shadow hover:shadow-lg hover:shadow-neutral-900/5 dark:bg-neutral-900/50 dark:shadow-neutral-100/5 dark:hover:shadow-neutral-100/5"
    >
      <ProjectCardPattern
        {...project.pattern}
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-neutral-900/7.5 group-hover:ring-neutral-900/10  dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pt-16 pb-4">
        <ProjectIcon logoSVGString={project.logoSVGString} />

        <h3 className="mt-4 text-sm font-semibold leading-7 text-neutral-900 dark:text-white">
          <Link href="#">
            <span className="absolute inset-0 rounded-2xl" />
            {project.title}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {project.excerpt}
        </p>
      </div>
    </Component>
  );
}
