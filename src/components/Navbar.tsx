import React, { forwardRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";
import MobileNavbar from "./MobileNavbar";

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
        className={cx(className, isActive ? "text-blue-500" : "")}
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
                "w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md",
                "focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
              )}
              href={sublink.href}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {sublink.subLabel}
              </span>

              <div className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                {sublink.desc}
              </div>
            </CustomLink>
          ));

          return (
            // put link items inside submenu
            <NavigationMenuPrimitive.Item key={item.label}>
              <NavigationMenuPrimitive.Trigger
                className={cx(
                  "px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900",
                  "text-sm font-medium text-gray-700 dark:text-gray-100",
                  "focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
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
                  "radix-motion-to-end:animate-exit-to-right"
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
              "px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100"
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
    <div className="flex flex-col justify-center px-8 fixed top-0 left-0 right-0">
      <NavigationMenuPrimitive.Root className="relative w-full max-w-3xl mt-8 mb-16 mx-auto rounded-lg bg-white/75 dark:bg-gray-800 p-2 shadow-lg backdrop-blur-md">
        <NavigationMenuPrimitive.List className="flex flex-row justify-between opacity-100">
          <NavigationMenuPrimitive.Item>
            <CustomLink href="/">
              {/* placeholder for logo */}
              <div className="w-8 h-8 rounded-xl bg-gray-200"></div>
            </CustomLink>
          </NavigationMenuPrimitive.Item>

          <ul className="w-full max-w-md px-4 flex justify-between ">
            <NavLinks />
          </ul>

          <NavigationMenuPrimitive.Item>
            <NavigationMenuPrimitive.Link href="/">
              {/* placeholder for theme toggle */}
              <div className="w-8 h-8 rounded-xl bg-gray-200"></div>
            </NavigationMenuPrimitive.Link>
          </NavigationMenuPrimitive.Item>
        </NavigationMenuPrimitive.List>

        <div
          className={cx(
            "absolute flex justify-center",
            "w-[140%] left-[-20%] top-[100%]"
          )}
          style={{
            perspective: "2000px",
          }}
        >
          <NavigationMenuPrimitive.Viewport
            className={cx(
              "relative mt-2 shadow-lg rounded-md bg-white dark:bg-gray-800 overflow-hidden",
              "w-radix-navigation-menu-viewport",
              "h-radix-navigation-menu-viewport",
              "radix-state-open:animate-scale-in-content",
              "radix-state-closed:animate-scale-out-content",
              "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
            )}
          />
        </div>
      </NavigationMenuPrimitive.Root>
    </div>
  );
};

export default Navbar;
