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
      className={cx(
        "radix-state-checked:bg-neutral-200 dark:radix-state-checked:bg-neutral-600 rounded-md",
      )}
    >
      <Link href={href}>
        <a className="flex items-center text-neutral-900 dark:text-neutral-100 focus:bg-neutral-50 dark:focus:bg-neutral-900 cursor-pointer select-none rounded-md px-2 py-2 text-xs">
          <span className="text-neutral-500  dark:text-neutral-400 ">
            {icon}
          </span>
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
    <div className="flex flex-col items-center px-8 fixed top-0 left-0 right-0 z-[1000]">
      <nav className="flex justify-between max-w-3xl w-full mt-8 mb-16 rounded-lg bg-neutral-50/75 dark:bg-neutral-800/75 p-2 shadow-lg backdrop-blur-md">
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
              "bg-neutral-50 dark:bg-neutral-800",
            )}
          >
            {generalMenuNavLinks}

            <DropdownMenuPrimitive.Separator className="my-1 h-px bg-neutral-200 dark:bg-neutral-700" />

            <DropdownMenuPrimitive.Label className="select-none px-2 py-2 text-xs text-neutral-500 dark:text-neutral-400">
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
