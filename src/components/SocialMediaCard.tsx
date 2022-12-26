interface SocialMediaCardProps {
  platform: string;
  handle: string;
  href: string;
  icon: JSX.IntrinsicElements["svg"];
  iconColour: string;
  buttonText: string;
}

const SocialMediaCard = ({
  platform,
  handle,
  href,
  icon,
  iconColour,
  buttonText,
}: SocialMediaCardProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
      <div className={iconColour}>
        <>{icon}</>
      </div>
      <p className="mt-6 text-xl">{platform}</p>
      <p className="text-neutral-600 dark:text-neutral-400">{handle}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer nofollow noopener"
        className="mt-6 w-full rounded-md bg-neutral-200 px-8 py-2 text-center transition-all hocus:scale-105 hocus:text-orange-800 dark:bg-neutral-900 hocus:dark:text-orange-500"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default SocialMediaCard;
