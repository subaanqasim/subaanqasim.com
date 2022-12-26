import { type PolymorphicProps } from "@utils/types/ui";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "classnames";

const buttonStyles = cva(
  "inline-flex gap-2 items-center justify-center rounded-md outline-offset-[6px] transition active:transition-none",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-50 font-medium tracking-wider text-neutral-900 dark:text-neutral-50 hover:text-neutral-50 hover:dark:text-neutral-900 border border-transparent bg-clip-padding hover:bg-transparent hover:dark:bg-transparent dark:bg-black active:bg-white/30 active:dark:bg-white/30 group w-full",
        secondary:
          "bg-black font-medium tracking-wider text-neutral-50 hover:bg-transparent active:bg-black/10 hover:text-neutral-900 border-neutral-900 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-transparent border  dark:hover:border-neutral-50 dark:hover:text-neutral-50 dark:active:bg-white/20 group",
        tertiary:
          "rounded-full border dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400  hover:dark:border-neutral-500 hover:dark:text-neutral-100 group dark:active:bg-neutral-700 bg-neutral-100 border-neutral-300 text-neutral-600 hover:border-neutral-500 hover:text-neutral-800 active:bg-neutral-100",
      },
      size: {
        small: "px-3 py-[6px] text-sm leading-5",
        medium: "px-5 py-2 text-base",
        large: "px-3 text-base h-12 w-full",
      },
    },

    compoundVariants: [],

    defaultVariants: {
      variant: "primary",
      size: "large",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonStyles>;

interface ButtonProps
  extends Omit<ButtonVariantProps, "variant">,
    Required<Pick<ButtonVariantProps, "variant">> {
  glowColour?: "pink-purple" | "orange-yellow" | "cyan-blue";
}

export default function Button<C extends React.ElementType = "button">({
  as,
  children,
  variant,
  className,
  size,
  glowColour = "cyan-blue",
  ...props
}: PolymorphicProps<C, ButtonProps>) {
  const Component = as || "button";

  return (
    <div className={cn("group relative", className)}>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className={cn(
            glowColour === "pink-purple"
              ? "bg-button-gradient-pink-purple before:bg-button-gradient-pink-purple"
              : "",
            glowColour === "cyan-blue"
              ? "bg-button-gradient-cyan-blue before:bg-button-gradient-cyan-blue"
              : "",
            glowColour === "orange-yellow"
              ? "bg-button-gradient-orange-yellow before:bg-button-gradient-orange-yellow"
              : "",
            "absolute -z-[2] h-full w-full rounded-md  content-['']",
            "before:absolute before:-z-[1] before:h-full before:w-full before:border-[12px] before:border-transparent before:bg-clip-padding before:blur-[36px] before:content-['']",
          )}
        />
      )}
      <Component {...props} className={cn(buttonStyles({ variant, size }))}>
        {children}
      </Component>
    </div>
  );
}
