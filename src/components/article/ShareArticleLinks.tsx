import { useState } from "react";
import {
  Link2Icon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

const ShareArticleLinks = ({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`https://subaanqasim.com/articles/${slug}`);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopyToClipboard}
        className="cursor-pointer rounded-md p-1 transition-all hover:scale-110 hover:bg-neutral-200 focus:scale-110 focus:bg-neutral-200 active:scale-95 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-500"
      >
        {copied ? (
          <div className="flex items-center gap-1 text-xs">
            <CheckCircledIcon className="h-4 w-4 text-green-600" />
            Copied!
          </div>
        ) : (
          <Link2Icon className="h-4 w-4" />
        )}
      </button>

      <a
        href={`https://twitter.com/intent/tweet?text=${`${title}, by @subaanqasim`}&url=https://subaanqasim.com/articles/${slug}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="cursor-pointer rounded-md p-1 transition-all hover:scale-110 hover:bg-neutral-200 focus:scale-110 focus:bg-neutral-200 active:scale-95 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-500"
      >
        <TwitterLogoIcon className="h-4 w-4" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=https://subaanqasim.com/articles/${slug}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="cursor-pointer rounded-md p-1 transition-all hover:scale-110 hover:bg-neutral-200 focus:scale-110 focus:bg-neutral-200 active:scale-95 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-500"
      >
        <LinkedInLogoIcon className="h-4 w-4" />
      </a>
    </div>
  );
};

export default ShareArticleLinks;
