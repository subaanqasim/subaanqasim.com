import Link from "next/link";
import Image from "next/image";
import { trpc } from "@utils/trpc";

const DynamicLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
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
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

const CustomImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { src, alt, width, height } = props;

  if (typeof width === "number" && typeof height === "number") {
    return (
      <Image
        src={src!}
        alt={alt ?? ""}
        width={width}
        height={height}
        className="rounded-lg"
        sizes="960px"
      />
    );
  }

  if (typeof width === "string" && typeof height === "string") {
    return (
      <Image
        src={src!}
        alt={alt ?? ""}
        width={parseInt(width)}
        height={parseInt(height)}
        className="rounded-lg"
        sizes="960px"
      />
    );
  }
};

export const components = {
  a: DynamicLink,
  img: CustomImage,
};
