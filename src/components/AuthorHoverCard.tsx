import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/future/image";
import { IAuthor } from "@utils/types/contentful";
import cn from "classnames";
import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";

const AuthorHoverCard = ({ author }: { author: IAuthor }) => {
  return (
    <HoverCardPrimitive.Root openDelay={0}>
      <HoverCardPrimitive.Trigger className="cursor-pointer">
        <Image
          src={`https:${author.fields.headshot.fields.file.url}`}
          alt={author.fields.headshot.fields.title}
          width={48}
          height={48}
          sizes="96px"
          className="mr-2 h-12 w-12 rounded-full object-cover"
          priority
        />
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        align="center"
        sideOffset={4}
        collisionPadding={32}
        className={cn(
          "radix-side-bottom:animate-slide-down radix-side-top:animate-slide-up",
          "max-w-[330px] rounded-lg p-4 xs:max-w-md sm:max-w-lg md:max-w-xl",
          "bg-white/60 shadow-lg backdrop-blur-[6px] dark:bg-neutral-800/60 dark:shadow-md",
          "focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75",
        )}
      >
        <HoverCardPrimitive.Arrow className="fill-current text-white dark:text-neutral-800" />

        <div className="flex gap-4">
          <div className="w-full self-center">
            <div className="aspect-w-4 aspect-h-5 overflow-hidden">
              <Image
                src={`https:${author.fields.headshot.fields.file.url}`}
                alt={author.fields.headshot.fields.title}
                fill
                sizes="50vw"
                className="rounded-md object-cover"
              />
            </div>
          </div>

          <div className="flex max-w-[60%] flex-col justify-start gap-6 text-sm tracking-wide md:justify-center">
            <div>
              <h3 className="text-sm font-medium tracking-wider text-neutral-900 dark:text-neutral-100">
                {author.fields.name}
              </h3>

              <p className="text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                {author.fields.role}
              </p>

              <p className="text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                {author.fields.location}
              </p>
              <p className="mt-2 text-sm leading-5 text-neutral-900 dark:text-neutral-200">
                {author.fields.shortDescription}
              </p>
            </div>

            <div className="mt-auto flex justify-center gap-2 md:mt-6">
              <a
                href={author.fields.twitter}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="cursor-pointer rounded-md p-1 transition-all hover:scale-110 hover:bg-neutral-200 focus:scale-110 focus:bg-neutral-200 active:scale-95 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-500"
              >
                <TwitterLogoIcon className="h-4 w-4" />
              </a>

              <a
                href={author.fields.instagram}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="cursor-pointer rounded-md p-1 transition-all hover:scale-110 hover:bg-neutral-200 focus:scale-110 focus:bg-neutral-200 active:scale-95 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-500"
              >
                <InstagramLogoIcon className="h-4 w-4" />
              </a>

              <a
                href={author.fields.github}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="cursor-pointer rounded-md p-1 transition-all hover:scale-110 hover:bg-neutral-200 focus:scale-110 focus:bg-neutral-200 active:scale-95 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-500"
              >
                <GitHubLogoIcon className="h-4 w-4" />
              </a>

              <a
                href={author.fields.linkedin}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="cursor-pointer rounded-md p-1 transition-all hover:scale-110 hover:bg-neutral-200 focus:scale-110 focus:bg-neutral-200 active:scale-95 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-500"
              >
                <LinkedInLogoIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

export default AuthorHoverCard;
