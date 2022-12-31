import Link from "next/link";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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
};

type CustomImageProps = { blurUrl: string } & JSX.IntrinsicElements["img"];

const CustomImage = (props: CustomImageProps) => {
  const { src, alt, width, height, blurUrl } = props;

  if (width && height && src) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={parseInt(width.toString())}
        height={parseInt(height.toString())}
        placeholder="blur"
        blurDataURL={blurUrl}
        sizes="(max-width: 800px) 100vw, 42rem"
      />
    );
  }
};

export const components = {
  a: DynamicLink,
  img: CustomImage,
};
