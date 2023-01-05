import Image from "next/image";

type CustomImageProps = { blurUrl: string } & JSX.IntrinsicElements["img"];

export default function CustomImage(props: CustomImageProps) {
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
}
