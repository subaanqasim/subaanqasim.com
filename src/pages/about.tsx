import { Prose } from "@components/article";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  SEO,
  TwitterIcon,
} from "@components/common";
import { MdxComponents } from "@components/mdx";
import { Container } from "@components/ui";
import { getBannerImage } from "@utils/getCommonImages";
import { useBounce } from "@utils/hooks";
import { getProfileQuery } from "@utils/sanity/queries";
import { urlForImage } from "@utils/sanity/sanity-image";
import { picoSanity } from "@utils/sanity/sanity-server";
import { authorSchema } from "@utils/sanity/schema-types";
import { serializeMDX } from "@utils/serializeMDX";
import cn from "classnames";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { animated } from "@react-spring/web";
import Balancer from "react-wrap-balancer";

type SocialLinkProps = {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className: string }>;
  children: React.ReactNode;
};

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: SocialLinkProps) {
  const { style, trigger } = useBounce({
    rotation: 10,
  });

  return (
    <li className={cn(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-neutral-800 transition hover:text-cyan-500 dark:text-neutral-200 dark:hover:text-cyan-500"
        onMouseEnter={trigger}
      >
        <animated.span style={style}>
          <Icon className="h-6 w-6 flex-none fill-neutral-500 transition group-hover:fill-cyan-500" />
        </animated.span>
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

export default function About({
  bannerImage,
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO title="About" image={bannerImage} />
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={urlForImage(profile.headshot).url()}
                alt="A portrait of Subaan Qasim"
                width={profile.headshot.asset.metadata.dimensions.width}
                height={profile.headshot.asset.metadata.dimensions.height}
                placeholder="blur"
                blurDataURL={profile.headshot.asset.metadata.lqip}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-1 rounded-2xl bg-neutral-100 object-cover dark:bg-neutral-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-5xl">
              <Balancer ratio={0.5}>
                I’m Subaan Qasim — a medical student and self-taught developer
                based in London.
              </Balancer>
            </h1>

            <Prose className="mt-6">
              <MDXRemote
                {...profile.fullBio}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                components={{ ...MdxComponents } as any}
              />
            </Prose>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href={profile.socials.twitter!} icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href={profile.socials.instagram!}
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href={profile.socials.linkedIn!}
                icon={LinkedInIcon}
                className="mt-4"
              >
                Connect on LinkedIn
              </SocialLink>
              <SocialLink
                href={profile.socials.github!}
                icon={GitHubIcon}
                className="mt-4"
              >
                Explore my GitHub
              </SocialLink>
              <SocialLink
                href="mailto:subaan@subaanqasim.com"
                icon={MailIcon}
                className="mt-8 border-t border-neutral-100 pt-8 dark:border-neutral-700/40"
              >
                subaan@subaanqasim.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}

export const getStaticProps = (async () => {
  const bannerImage = await getBannerImage();
  const profile = authorSchema.parse(await picoSanity.fetch(getProfileQuery));

  const fullBioMDX = await serializeMDX(profile.fullBio);

  return {
    props: {
      bannerImage,
      profile: {
        ...profile,
        fullBio: fullBioMDX,
      },
    },
  };
}) satisfies GetStaticProps;
