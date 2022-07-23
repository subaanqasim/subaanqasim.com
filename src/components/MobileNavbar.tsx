import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  CheckIcon,
  HomeIcon,
  CameraIcon,
  RocketIcon,
  FileTextIcon,
  PersonIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface MenuItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const generalMenuItems: MenuItem[] = [
  {
    label: "Home",
    icon: <HomeIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/",
  },
  {
    label: "Articles",
    icon: <FileTextIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/articles",
  },
  {
    label: "About",
    icon: <PersonIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/about",
  },
];

const portfolioMenuItems: MenuItem[] = [
  {
    label: "Projects",
    icon: <RocketIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/projects",
  },
  {
    label: "Photography",
    icon: <CameraIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/photography",
  },
];

const MobileNavbar = () => {
  const { pathname, push } = useRouter();

  const CustomNavLink = ({ label, icon, href }: MenuItem) => (
    <DropdownMenuPrimitive.CheckboxItem
      key={label}
      checked={pathname === href}
      onClick={() =>
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
      }
      onCheckedChange={() => push(href)}
      className={cx("radix-state-checked:bg-orange-50")}
    >
      <Link href={href}>
        <a className="flex items-center text-gray-700 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-gray-900 cursor-pointer select-none rounded-md px-2 py-2 text-xs">
          <span className="text-gray-400  dark:text-gray-500 ">{icon}</span>
          <span className="flex-grow">{label}</span>
          <DropdownMenuPrimitive.ItemIndicator>
            <CheckIcon className="h-3.5 w-3.5" />
          </DropdownMenuPrimitive.ItemIndicator>
        </a>
      </Link>
    </DropdownMenuPrimitive.CheckboxItem>
  );

  const generalMenuNavLinks = generalMenuItems.map(({ label, icon, href }) => (
    <CustomNavLink key={label} label={label} icon={icon} href={href} />
  ));

  const portfolioMenuNavLinks = portfolioMenuItems.map(
    ({ label, icon, href }) => (
      <CustomNavLink key={label} label={label} icon={icon} href={href} />
    ),
  );

  return (
    <div className="flex flex-col items-center px-8 fixed top-0 left-0 right-0">
      <nav className="flex justify-between max-w-3xl w-full mt-8 mb-16 rounded-lg bg-white/75 dark:bg-gray-800 p-2 shadow-lg backdrop-blur-md">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger className="p-2 rounded-sm cursor-pointer hover:scale-[1.05] transform-gpu transition-all duration-100 ease-in-out">
            <HamburgerMenuIcon className="w-5 h-5" />
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Content
            align="start"
            side="bottom"
            sideOffset={-16}
            alignOffset={-40}
            className={cx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
              "bg-white dark:bg-gray-800",
            )}
          >
            {generalMenuNavLinks}

            <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

            <DropdownMenuPrimitive.Label className="select-none px-2 py-2 text-xs text-gray-700 dark:text-gray-200">
              Portfolio
            </DropdownMenuPrimitive.Label>

            {portfolioMenuNavLinks}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Root>
      </nav>
    </div>
  );
};

export default MobileNavbar;
