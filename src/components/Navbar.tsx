import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { Popover, Transition } from "@headlessui/react";
import { CloseIcon, ChevronDownIcon, MoonIcon, SunIcon, Logo } from "./Icons";

const navData = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  {
    label: "Portfolio",
    submenu: [
      {
        subLabel: "Projects",
        href: "/projects",
        desc: "A collection of various coding and motion design projects I've worked on",
      },
      {
        subLabel: "Photography",
        href: "/photography",
        desc: "A gallery of some of my favourite shots whilst out and about",
      },
    ],
  },
  { label: "About", href: "/about" },
];

interface CustomLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  ariaLabel?: string;
}

const CustomLink = ({
  children,
  href,
  className,
  ariaLabel,
}: CustomLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  // TODO: add active styling to active sublink somehow

  return (
    <Link href={href} passHref legacyBehavior>
      <NavigationMenuPrimitive.Link
        active={isActive}
        className={cn(
          className,
          isActive ? "font-semibold text-orange-800 dark:text-orange-300" : "",
        )}
        aria-label={ariaLabel}
      >
        {children}
      </NavigationMenuPrimitive.Link>
    </Link>
  );
};

const NavLinks = () => {
  return (
    <>
      {navData.map((item) => {
        // creation of navlink that has submenu
        if (item.submenu) {
          // create link items
          const sublinks = item.submenu.map((sublink) => (
            <CustomLink
              key={sublink.subLabel}
              className={cn(
                "w-full rounded-md px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-900",
                "focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75",
              )}
              href={sublink.href}
            >
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {sublink.subLabel}
              </span>

              <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-400">
                {sublink.desc}
              </div>
            </CustomLink>
          ));

          return (
            // put link items inside submenu
            <NavigationMenuPrimitive.Item key={item.label}>
              <NavigationMenuPrimitive.Trigger
                className={cn(
                  "rounded-md px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900",
                  "text-sm font-medium text-neutral-700 dark:text-neutral-100",
                  "focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75",
                )}
              >
                {item.label}
              </NavigationMenuPrimitive.Trigger>

              <NavigationMenuPrimitive.Content
                className={cn(
                  "absolute top-0 left-0 w-auto rounded-lg",
                  "radix-motion-from-start:animate-enter-from-left",
                  "radix-motion-from-end:animate-enter-from-right",
                  "radix-motion-to-start:animate-exit-to-left",
                  "radix-motion-to-end:animate-exit-to-right",
                )}
              >
                <div className="w-[16rem] p-3 lg:w-[18rem]">
                  <div className="flex w-full flex-col space-y-2">
                    {sublinks}
                  </div>
                </div>
              </NavigationMenuPrimitive.Content>
            </NavigationMenuPrimitive.Item>
          );
        }

        return (
          // create/return navlinks with no submenu
          <NavigationMenuPrimitive.Item
            key={item.label}
            className="flex rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-900"
          >
            <CustomLink href={item.href} className="px-3 py-2">
              {item.label}
            </CustomLink>
          </NavigationMenuPrimitive.Item>
        );
      })}
    </>
  );
};

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] flex flex-col justify-center px-8">
      <NavigationMenuPrimitive.Root className="relative mx-auto mt-8 mb-16 w-full max-w-3xl rounded-lg bg-neutral-50/75 p-2 shadow-lg backdrop-blur-[6px] dark:bg-neutral-800/75">
        <NavigationMenuPrimitive.List className="flex flex-row justify-between opacity-100">
          <NavigationMenuPrimitive.Item className="flex items-center">
            <CustomLink href="/" ariaLabel="Subaan Qasim - Home">
              <Logo className="h-8 w-8" />
            </CustomLink>
          </NavigationMenuPrimitive.Item>

          <ul className="flex w-full max-w-md justify-between px-4 ">
            <NavLinks />
          </ul>

          <NavigationMenuPrimitive.Item className="flex items-center">
            <ThemeToggle />
          </NavigationMenuPrimitive.Item>
        </NavigationMenuPrimitive.List>

        <div
          className={cn(
            "absolute flex justify-center",
            "left-[-20%] top-[100%] w-[140%]",
          )}
          style={{
            perspective: "2000px",
          }}
        >
          <NavigationMenuPrimitive.Viewport
            className={cn(
              "relative mt-2 overflow-hidden rounded-md bg-white shadow-lg dark:bg-neutral-800",
              "w-radix-navigation-menu-viewport",
              "h-radix-navigation-menu-viewport",
              "radix-state-open:animate-scale-in-content",
              "radix-state-closed:animate-scale-out-content",
              "origin-[top_center] transition-[width_height] duration-300 ease-[ease]",
            )}
          />
        </div>
      </NavigationMenuPrimitive.Root>
    </div>
  );
};

export default Navbar;
