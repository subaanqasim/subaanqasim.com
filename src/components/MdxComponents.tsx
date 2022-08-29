import Link from "next/link";
import Image from "next/future/image";
import { AnchorHTMLAttributes } from "react";

const DynamicLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href, children } = props;

  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export const components = {
  a: DynamicLink,
};
