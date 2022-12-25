import Bounce from "@components/Bounce";
import { random } from "@utils/random";

export default function SocialLink({
  icon: Icon,
  ...props
}: {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
} & JSX.IntrinsicElements["a"]) {
  const num = random(7, 25);
  const positiveOrNegativeNum = Math.random() < 0.5 ? num : -num;

  return (
    <Bounce method="hover" bounceConfig={{ rotation: positiveOrNegativeNum }}>
      <a
        {...props}
        className="group -m-1 flex items-center p-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="h-6 w-6 fill-neutral-500 transition group-hover:fill-neutral-600 dark:fill-neutral-400 dark:group-hover:fill-neutral-300" />
      </a>
    </Bounce>
  );
}
