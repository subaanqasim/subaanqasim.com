import Link, { type LinkProps } from "next/link";
import cn from "classnames";
import { ChevronRightIcon } from "@components/common";
import React from "react";
import type { Colours, PolymorphicProps } from "@utils/types/ui";

type CardProps = {
  hoverColour?: Colours;
};

export function Card<C extends React.ElementType = "div">({
  as,
  className,
  children,
  // hoverColour,
  ...props
}: PolymorphicProps<C, CardProps>) {
  const Component = as || "div";

  return (
    <Component
      {...props}
      className={cn(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  );
}

type CardLinkProps = {
  children: React.ReactNode;
} & LinkProps;

Card.Link = function CardLink({ children, ...props }: CardLinkProps) {
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-neutral-200/40 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-neutral-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

type CardTitleProps = {
  href?: string;
};

Card.Title = function CardTitle<C extends React.ElementType = "h2">({
  as,
  href,
  className,
  children,
  ...props
}: PolymorphicProps<C, CardTitleProps>) {
  const Component = as || "h2";

  return (
    <Component
      className={cn(
        className,
        "text-lg font-semibold tracking-tight text-neutral-800 dark:text-neutral-100 md:text-xl",
      )}
      {...props}
    >
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

Card.Description = function CardDescription({
  className,
  children,
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "relative z-10 mt-2 text-base text-neutral-600 dark:text-neutral-400",
        className,
      )}
    >
      {children}
    </p>
  );
};

type CardCtaProps = {
  children: React.ReactNode;
  className?: string;
};

Card.Cta = function CardCta({ children, className }: CardCtaProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        className,
        "relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500",
      )}
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

type CardEyebrowProps = {
  decorate?: boolean;
};

Card.Eyebrow = function CardEyebrow<C extends React.ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...props
}: PolymorphicProps<C, CardEyebrowProps>) {
  const Component = as || "p";

  return (
    <Component
      className={cn(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-neutral-400 dark:text-neutral-500",
        decorate && "pl-3.5",
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-500" />
        </span>
      )}
      {children}
    </Component>
  );
};
