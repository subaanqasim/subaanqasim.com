import cn from "classnames";

type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Prose({ children, className }: ProseProps) {
  return (
    <div className={cn(className, "prose dark:prose-invert")}>{children}</div>
  );
}
