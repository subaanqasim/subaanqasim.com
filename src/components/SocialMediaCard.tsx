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
    <div className="bg-neutral-200 dark:bg-neutral-800 w-full flex flex-col items-center justify-center p-4 rounded-md">
      <div className={iconColour}>
        <>{icon}</>
      </div>
      <p className="text-xl mt-6">{platform}</p>
      <p className="text-neutral-600 dark:text-neutral-400">{handle}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer nofollow noopener"
        className="px-8 py-2 dark:bg-neutral-900 bg-neutral-50 rounded-md mt-6 hover:dark:text-orange-500 hover:text-orange-700 w-full text-center hover:scale-105 transition-all"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default SocialMediaCard;
