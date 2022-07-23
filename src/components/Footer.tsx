import Link from "next/link";
import { ExternalLinkIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

interface Links {
  label: string;
  href: string;
}

interface FooterData {
  title: string;
  links: Links[];
}

const footerData: FooterData[] = [
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
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

const ExternalLink = ({ label, href }: Links) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-neutral-400 hover:text-neutral-600 hover:-translate-y-0.5 transition ease-in-out transform-gpu"
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
      <Link key={label} href={href}>
        <a className="text-neutral-400 hover:text-neutral-600 hover:-translate-y-0.5 transition ease-in-out transform-gpu">
          {label}
        </a>
      </Link>
    );
  });

  return (
    <div
      key={group.title}
      className="flex flex-col space-y-4 items-center sm:items-stretch mx-auto"
    >
      <div className="-mb-2.5 font-semibold">{group.title}</div>
      {links}
    </div>
  );
});

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col justify-center px-8">
        <div className="max-w-3xl w-full mx-auto">
          <hr className="w-full border-1 border-neutral-300 dark:border-neutral-700 mb-8" />
          <div className="w-full  mx-auto grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8 ">
            {footerLinks}
          </div>
          <hr className="w-full border-1 border-neutral-300 dark:border-neutral-700 mb-8" />
          <div className="flex justify-between gap-4 mb-16 text-sm text-neutral-400 dark:text-neutral-500">
            <p>© Subaan Qasim. All rights reserved.</p>
            <a
              href="https://www.github.com/subaanqasim/subaanqasim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:-translate-y-0.5 hover:text-neutral-600 dark:hover:text-neutral-400 transition ease-in-out transform-gpu flex items-center"
            >
              <GitHubLogoIcon className="w-3.5 h-3.5 inline-block mr-1.5" />
              View on GitHub
              {/* <ExternalLinkIcon className="w-3.5 h-3.5 inline-block ml-1" /> */}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
