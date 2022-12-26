import React, { useEffect, useRef, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { CloseIcon, ChevronDownIcon, Logo } from "./Icons";
import { clamp } from "@utils/clamp";
import Link, { type LinkProps } from "next/link";
import cn from "classnames";
import { Container } from "../ui/Container";
import ThemeToggle from "./ThemeToggle";

type Position = "absolute" | "fixed" | "relative" | "static" | "sticky";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

function MobileNavigation(props: any) {
  const { pathname } = useRouter();

  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/50 dark:text-neutral-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-neutral-500 group-hover:stroke-neutral-700 dark:group-hover:stroke-neutral-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-neutral-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 dark:bg-neutral-900/80 dark:ring-neutral-800"
          >
            {({ close }) => (
              <>
                <div className="flex flex-row-reverse items-center justify-between">
                  <button
                    type="button"
                    onClick={() => close()}
                    aria-label="Close menu"
                    className="-m-1 p-1"
                  >
                    <CloseIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
                  </button>
                  <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Navigation
                  </h2>
                </div>
                <nav className="mt-6">
                  <div className="-my-2 divide-y divide-neutral-100 text-base text-neutral-800 dark:divide-neutral-100/5 dark:text-neutral-300">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "relative block py-2",
                          item.href === pathname
                            ? "text-cyan-500 dark:text-cyan-400"
                            : "",
                        )}
                        onClick={() => close()}
                      >
                        {item.label}
                        {item.href === pathname && (
                          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 dark:from-cyan-400/0 dark:via-cyan-400/40 dark:to-cyan-400/0" />
                        )}
                      </Link>
                    ))}
                  </div>
                </nav>
              </>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

function DesktopNavigation(props: JSX.IntrinsicElements["nav"]) {
  const { pathname } = useRouter();

  return (
    <nav {...props}>
      <div className="flex rounded-full bg-white/50 px-3 text-sm font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/50 dark:text-neutral-200 dark:ring-white/10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative block px-3 py-2 transition",
              item.href === pathname
                ? "text-cyan-500 dark:text-cyan-400"
                : "hover:text-cyan-500 dark:hover:text-cyan-400",
            )}
          >
            <>
              {item.label}
              {item.href === pathname && (
                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 dark:from-cyan-400/0 dark:via-cyan-400/40 dark:to-cyan-400/0" />
              )}
            </>
          </Link>
        ))}
      </div>
    </nav>
  );
}

function LogoAvatar({
  large = false,
  className,
  style,
  ...props
}: {
  large?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & Omit<LinkProps, "href">) {
  return (
    <Link
      {...props}
      href="/"
      aria-label="Home"
      className={cn(className, "pointer-events-auto")}
      style={style}
    >
      <div
        className={cn(
          "relative",
          large
            ? "h-16 w-16 before:-inset-y-4 before:-inset-x-5"
            : "h-9 w-9 before:-inset-y-2 before:-inset-x-3",
          "before:absolute before:z-[-1] before:rounded-full before:bg-neutral-50/50 before:backdrop-blur before:dark:bg-black/25 ",
        )}
      >
        <Logo />
      </div>
    </Link>
  );
}

export default function Nav() {
  const isHomePage = useRouter().pathname === "/";

  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0;
    const upDelay = 64;

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    function updateHeaderStyles() {
      const { top, height } = headerRef.current!.getBoundingClientRect();
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      );

      if (isInitial.current) {
        setProperty("--header-position", "sticky");
      }

      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed");
        removeProperty("--header-top");
        removeProperty("--avatar-top");
      } else {
        removeProperty("--header-inner-position");
        setProperty("--header-top", "0px");
        setProperty("--avatar-top", "0px");
      }
    }

    function updateAvatarStyles(): void {
      if (!isHomePage) {
        return;
      }

      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      );

      const borderScale = 1 / (toScale / scale);
      const borderX = (-toX + x) * borderScale;
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty("--avatar-border-transform", borderTransform);
      setProperty(
        "--avatar-border-opacity",
        (scale === toScale ? 1 : 0).toString(),
      );
    }

    function updateStyles() {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.current = false;
    }

    const opts: AddEventListenerOptions & EventListenerOptions = {
      passive: true,
    };

    updateStyles();
    window.addEventListener("scroll", updateStyles, opts);
    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("scroll", updateStyles, opts);
      window.removeEventListener("resize", updateStyles);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        className={cn(
          "pointer-events-none relative z-50 flex flex-col",
          // "after:contents-[''] after:absolute after:inset-0 after:-bottom-6 after:bg-white/20 after:backdrop-blur-[2px] dark:after:bg-neutral-900/20",
        )}
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 z-10 order-last -mb-3 pt-3"
              style={{ position: "var(--header-position)" as Position }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{ position: "var(--header-inner-position)" as Position }}
              >
                <div className="relative">
                  <LogoAvatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{
                      transform: "var(--avatar-image-transform)",
                    }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{ position: "var(--header-position)" as Position }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{ position: "var(--header-inner-position)" as Position }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1 items-center">
                {!isHomePage && <LogoAvatar />}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex items-center justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div style={{ height: "var(--content-offset)" }} />}
    </>
  );
}
