import { forwardRef } from "react";
import cn from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
} & JSX.IntrinsicElements["div"];

const OuterContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn("sm:px-8", className)}>
        <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
      </div>
    );
  },
);

OuterContainer.displayName = "OuterContainer";

const InnerContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative px-4 sm:px-8 lg:px-12", className)}
        {...props}
      >
        <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    );
  },
);

InnerContainer.displayName = "InnerContainer";

type ContainerCompProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & JSX.IntrinsicElements["div"];

export const ContainerComp = forwardRef<HTMLDivElement, ContainerCompProps>(
  ({ children, ...props }, ref) => {
    return (
      <OuterContainer {...props} ref={ref}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    );
  },
);

ContainerComp.displayName = "ContainerComp";

interface IContainer
  extends React.ForwardRefExoticComponent<
    ContainerCompProps & React.RefAttributes<HTMLDivElement>
  > {
  Outer: typeof OuterContainer;
  Inner: typeof InnerContainer;
}

export const Container = {
  ...ContainerComp,
  Outer: OuterContainer,
  Inner: InnerContainer,
} as IContainer;
