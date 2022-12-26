import Link from "next/link";

export default function SeeMoreLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group mt-12 inline-flex items-center transition-all hover:text-neutral-500 dark:hover:text-neutral-400"
    >
      {text}
    </Link>
  );
}
