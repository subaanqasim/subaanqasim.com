import Seo from "../components/Seo";
import { type InferGetStaticPropsType } from "next";
import { getBannerImage } from "@utils/getBannerImage";
import Link from "next/link";
import SocialMediaCard from "../components/SocialMediaCard";

const socials = [
  {
    platform: "Twitter",
    handle: "@subaanqasim",
    href: "https://twitter.com/subaanqasim",
    iconColour: "text-teal-500",
    buttonText: "Follow",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
      </svg>
    ),
  },
  {
    platform: "Instagram",
    handle: "@subaanqasim",
    href: "https://instagram.com/subaanqasim",
    iconColour: "text-orange-600",
    buttonText: "Stalk",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="4" y="4" width="16" height="16" rx="4"></rect>
        <circle cy="12" r="3"></circle>
        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "/in/subaan-qasim",
    href: "https://www.linkedin.com/in/subaan-qasim/",
    iconColour: "text-blue-500",
    buttonText: "Connect",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <line x1="8" y1="11" x2="8" y2="16"></line>
        <line x1="8" y1="8" x2="8" y2="8.01"></line>
        <line x1="12" y1="16" x2="12" y2="11"></line>
        <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
      </svg>
    ),
  },
  {
    platform: "GitHub",
    handle: "/subaanqasim",
    href: "https://github.com/subaanqasim",
    iconColour: "text-gray-500",
    buttonText: "Explore",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
      </svg>
    ),
  },
  {
    platform: "Podcast",
    handle: "Getting It",
    href: "https://gettingit.co.uk",
    iconColour: "text-amber-500",
    buttonText: "Listen",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="9" y="2" width="6" height="11" rx="3"></rect>
        <path d="M5 10a7 7 0 0 0 14 0"></path>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
  },
];

const About = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo title="About" image={bannerImage} />
      <main>
        <h1>About</h1>
        <p className="mt-6">
          I&apos;m a 5th year medical student and self-taught software developer
          with experience developing websites and web applications. Currently,
          I&apos;m taking a break from my studies to explore opportunities in
          software development and the tech industry, particularly MedTech.
        </p>

        <p className="mt-6">
          My relative expertise lies in producing full-stack applications with
          React, Next.js, Typescript, Javascript and Node.js. Whilst I&apos;m
          still rapidly expanding my skill set with those technologies, I&apos;m
          currently focusing on Data Science to effectively incorporate AI/ML in{" "}
          <Link href="/projects" className="link">
            the projects I&apos;m working on
          </Link>
          .{" "}
          <span className="font-medium italic">
            So basically, I&apos;m a wannabe Applied Scientist??
          </span>
        </p>

        <p className="mt-6">
          I&apos;m excited to be involved in building features end-to-end
          &mdash; planning, building, deploying, iterating &mdash; to improve
          the efficiency of processes and workflows without compromising
          quality. In the long term, I see myself deep-diving into AI and ML to
          improve my working knowledge and ultimately create solutions for real
          world AI problems.
        </p>

        <p className="mt-6">
          I also have a background in the creative industry, namely video
          editing,{" "}
          <Link href="/projects" className="link">
            motion design
          </Link>{" "}
          and{" "}
          <Link href="/photography" className="link">
            photography
          </Link>
          . I have many years of experience freelancing and teaching these
          domains. I mostly use the entire Adobe Creative Suite, in particular
          After Effects, Premiere Pro, Audition and Lightroom. Design-wise,
          I&apos;m currently spending my time with UI/UX design to harmonise my
          software development with my motion design background to deliver
          refreshing micro-animations to the frontend.
        </p>

        <h2 className="mt-10">Social & Links</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
          {socials.map((social) => (
            <div key={social.platform}>
              <SocialMediaCard
                platform={social.platform}
                handle={social.handle}
                href={social.href}
                iconColour={social.iconColour}
                buttonText={social.buttonText}
                icon={social.icon}
              />
            </div>
          ))}
          <div className="flex w-full flex-col items-center justify-center rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
            <div className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                strokeWidth="0.75"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <polyline points="3 7 12 13 21 7"></polyline>
              </svg>
            </div>
            <p className="mt-6 text-xl">Email</p>
            <p className="text-neutral-600 dark:text-neutral-400">
              I don&apos;t even know
            </p>
            <Link
              href="/contact"
              className="mt-6 w-full rounded-md bg-neutral-200 px-8 py-2 text-center transition-all hocus:scale-105 hocus:text-orange-800 dark:bg-neutral-900 hocus:dark:text-orange-500"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
