import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Container } from "./Container";

const footerData = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Articles", href: "/articles" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/subaanqasim/" },
      { label: "Twitter", href: "https://twitter.com/subaanqasim" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/subaan-qasim/",
      },
      { label: "GitHub", href: "https://www.github.com/subaanqasim" },
    ],
  },
  {
    title: "Miscellaneous",
    links: [
      { label: "Podcast", href: "https://www.gettingit.co.uk" },
      { label: "Vibes", href: "/vibes" },
      { label: "Brain", href: "/brain" },
      { label: "Support", href: "/support" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const ExternalLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="transform-gpu text-neutral-400 transition ease-in-out hover:-translate-y-0.5 hover:text-neutral-600"
  >
    {label}
  </a>
);

const footerLinks = footerData.map((group) => {
  // generate links for each footer section
  const links = group.links.map(({ label, href }) => {
    if (href.startsWith("http")) {
      return <ExternalLink key={label} label={label} href={href} />;
    }
    return (
      <Link
        key={label}
        href={href}
        className="transform-gpu text-neutral-400 transition ease-in-out hover:-translate-y-0.5 hover:text-neutral-600"
      >
        {label}
      </Link>
    );
  });

  return (
    <div
      key={group.title}
      className="mx-auto flex flex-col items-center space-y-4 sm:items-stretch"
    >
      <div className="-mb-2.5 font-semibold">{group.title}</div>
      {links}
    </div>
  );
});

export default function Footer() {
  return (
    <>
      <footer className="mt-32 flex flex-col justify-center">
        <Container>
          <div className="border-t border-neutral-300 pt-10 pb-16 dark:border-neutral-700">
            <div className="mx-auto grid w-full grid-cols-1 gap-4 border-b border-neutral-300 pb-8 dark:border-neutral-700 sm:grid-cols-3">
              {footerLinks}
            </div>
            <div className="flex justify-between gap-4 pt-8 text-sm text-neutral-500 dark:text-neutral-500">
              <p>© Subaan Qasim. All rights reserved.</p>
              <a
                href="https://www.github.com/subaanqasim/subaanqasim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex transform-gpu items-center transition ease-in-out hover:-translate-y-0.5 hover:text-neutral-600 dark:hover:text-neutral-400"
              >
                <GitHubLogoIcon className="mr-1.5 inline-block h-3.5 w-3.5" />
                View on GitHub
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
