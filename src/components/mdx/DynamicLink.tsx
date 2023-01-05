import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DynamicLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const { href, children } = props;

  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center"
      {...props}
    >
      {children}
      <span className="my-auto ml-1" aria-hidden="true">
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </span>
    </a>
  );
}
