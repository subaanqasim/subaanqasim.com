import Link from "next/link";
import Image from "next/future/image";
import { trpc } from "@utils/trpc";

const DynamicLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
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

const CustomImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { src } = props;
  const { data: assetMeta } = trpc.proxy.cms.getAssetMeta.useQuery({
    src: src!,
  });

  if (assetMeta) {
    console.log("DATA???/", assetMeta);

    return (
      <Image
        src={assetMeta.src}
        alt={assetMeta.alt}
        width={assetMeta.width}
        height={assetMeta.height}
      />
    );
  }
};

export const components = {
  a: DynamicLink,
  img: CustomImage,
};
