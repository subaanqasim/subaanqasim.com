import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

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
}

const CustomLink = ({ children, href, className }: CustomLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  // TODO: add active styling to active sublink somehow

  return (
    <Link href={href} passHref>
      <NavigationMenuPrimitive.Link
        active={isActive}
        className={cx(
          className,
          isActive ? "dark:text-orange-300 text-orange-800 font-semibold" : "",
        )}
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
              className={cx(
                "w-full px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md",
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
                className={cx(
                  "px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900",
                  "text-sm font-medium text-neutral-700 dark:text-neutral-100",
                  "focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75",
                )}
              >
                {item.label}
              </NavigationMenuPrimitive.Trigger>

              <NavigationMenuPrimitive.Content
                className={cx(
                  "absolute w-auto top-0 left-0 rounded-lg",
                  "radix-motion-from-start:animate-enter-from-left",
                  "radix-motion-from-end:animate-enter-from-right",
                  "radix-motion-to-start:animate-exit-to-left",
                  "radix-motion-to-end:animate-exit-to-right",
                )}
              >
                <div className="w-[16rem] lg:w-[18rem] p-3">
                  <div className="w-full flex flex-col space-y-2">
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
            className={cx(
              "px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900",
              "text-sm font-medium text-neutral-700 dark:text-neutral-100",
            )}
          >
            <CustomLink href={item.href}>{item.label}</CustomLink>
          </NavigationMenuPrimitive.Item>
        );
      })}
    </>
  );
};

const Navbar = () => {
  return (
    <div className="flex flex-col justify-center px-8 fixed top-0 left-0 right-0 z-[1000]">
      <NavigationMenuPrimitive.Root className="relative w-full max-w-3xl mt-8 mb-16 mx-auto rounded-lg bg-neutral-50/75 dark:bg-neutral-800/75 p-2 shadow-lg backdrop-blur-[6px]">
        <NavigationMenuPrimitive.List className="flex flex-row justify-between opacity-100">
          <NavigationMenuPrimitive.Item className="flex items-center">
            <CustomLink href="/">
              {/* placeholder for logo */}
              <div className="w-8 h-8 rounded-xl bg-neutral-200"></div>
            </CustomLink>
          </NavigationMenuPrimitive.Item>

          <ul className="w-full max-w-md px-4 flex justify-between ">
            <NavLinks />
          </ul>

          <NavigationMenuPrimitive.Item className="flex items-center">
            <ThemeToggle />
          </NavigationMenuPrimitive.Item>
        </NavigationMenuPrimitive.List>

        <div
          className={cx(
            "absolute flex justify-center",
            "w-[140%] left-[-20%] top-[100%]",
          )}
          style={{
            perspective: "2000px",
          }}
        >
          <NavigationMenuPrimitive.Viewport
            className={cx(
              "relative mt-2 shadow-lg rounded-md bg-white dark:bg-neutral-800 overflow-hidden",
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
