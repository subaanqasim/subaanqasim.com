import { type PolymorphicProps } from "@utils/types/ui";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-800 font-semibold text-neutral-100 hover:bg-neutral-700 active:bg-neutral-800 active:text-neutral-100/70 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:active:bg-neutral-700 dark:active:text-neutral-100/70",
        secondary:
          "bg-neutral-50 font-medium text-neutral-900 hover:bg-neutral-100 active:bg-neutral-100 active:text-neutral-900/60 dark:bg-neutral-800/50 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:active:bg-neutral-800/50 dark:active:text-neutral-50/70",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonStyles>;

interface ButtonProps
  extends Omit<ButtonVariantProps, "variant">,
    Required<Pick<ButtonVariantProps, "variant">> {}

export default function Button<C extends React.ElementType = "button">({
  as,
  children,
  variant,
  className,
  ...props
}: PolymorphicProps<C, ButtonProps>) {
  const Component = as || "button";

  return (
    <Component {...props} className={buttonStyles({ variant, className })}>
      {children}
    </Component>
  );
}
