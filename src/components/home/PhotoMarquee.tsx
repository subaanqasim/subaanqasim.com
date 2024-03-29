import { useEffect, useRef, useState } from "react";
import { useHasMounted } from "@utils/hooks";
import Image from "next/image";
import cn from "classnames";
import { useTheme } from "next-themes";
import { type SanityImageAssetType } from "@utils/sanity/schema-types";
import { urlForImage } from "@utils/sanity/sanity-image";

const rotations = [
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "-rotate-2",
  "rotate-2",
  "rotate-2",
  "-rotate-2",
];

export default function PhotoMarquee({
  photos,
}: {
  photos: SanityImageAssetType[];
}) {
  const hasMounted = useHasMounted();
  const { resolvedTheme } = useTheme();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [length, setLength] = useState(0);
  const duration = `${length * 25}ms`;

  useEffect(() => {
    const resizeObserver = new window.ResizeObserver(() => {
      setLength(marqueeRef.current?.offsetWidth ?? 0);
    });

    if (marqueeRef.current) {
      resizeObserver.observe(marqueeRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <span className="marquee-masked-blur absolute inset-0 z-[10]" />
      {hasMounted && (
        <span
          className={cn(
            "animate-fade-in",
            resolvedTheme === "dark"
              ? "absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,1)0%,rgba(0,0,0,0)35%,rgba(0,0,0,0)65%,rgba(0,0,0,1)100%)]"
              : "absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(250,250,250,1)0%,rgba(250,250,250,0)35%,rgba(250,250,250,0)65%,rgba(250,250,250,1)100%)]",
          )}
        />
      )}
      <div className="w-full overflow-hidden py-6">
        <div
          ref={marqueeRef}
          className="animate-horizontal-scroll"
          style={
            { "--horizontal-scroll-duration": duration } as React.CSSProperties
          }
        >
          <div className="-my-4 flex justify-center gap-5  py-4 sm:gap-8">
            {photos.map((image, i) => (
              <div
                key={image._id}
                className={cn(
                  "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 sm:w-72 sm:rounded-2xl",
                  rotations[i % rotations.length],
                )}
              >
                <Image
                  src={urlForImage(image).url()}
                  alt={image.altText ?? ""}
                  width={image.metadata.dimensions.width}
                  height={image.metadata.dimensions.height}
                  placeholder="blur"
                  blurDataURL={image.metadata.lqip}
                  sizes="(min-width: 640px) 18rem, 11rem"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
