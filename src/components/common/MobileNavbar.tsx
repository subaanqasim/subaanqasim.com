import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  CheckIcon,
  HomeIcon,
  CameraIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  UserIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const generalMenuItems: MenuItem[] = [
  {
    label: "Home",
    icon: <HomeIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/",
  },
  {
    label: "Articles",
    icon: <DocumentTextIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/articles",
  },
  {
    label: "About",
    icon: <UserIcon className="mr-2 h-3.5 w-3.5" />,
    href: "/about",
  },
];

const portfolioMenuItems: MenuItem[] = [
  {
    label: "Projects",
    icon: <RocketLaunchIcon className="mr-2 h-3.5 w-3.5" />,
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
      className={cn(
        "rounded-md radix-state-checked:bg-neutral-200 dark:radix-state-checked:bg-neutral-600",
      )}
    >
      <Link
        href={href}
        className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-xs text-neutral-900 focus:bg-neutral-50 dark:text-neutral-100 dark:focus:bg-neutral-900"
      >
        <span className="text-neutral-500  dark:text-neutral-400 ">{icon}</span>
        <span className="flex-grow">{label}</span>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-3.5 w-3.5" />
        </DropdownMenuPrimitive.ItemIndicator>
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
    <div className="fixed top-0 left-0 right-0 z-[1000] flex flex-col items-center px-8">
      <nav className="mt-8 mb-16 flex w-full max-w-3xl justify-between rounded-lg bg-neutral-50/75 p-2 shadow-lg backdrop-blur-[6px] dark:bg-neutral-800/75">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger className="transform-gpu cursor-pointer rounded-sm p-2 transition-all duration-100 ease-in-out hover:scale-[1.05]">
            <Bars3Icon className="h-5 w-5" />
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Content
            align="start"
            side="bottom"
            sideOffset={-16}
            alignOffset={-40}
            className={cn(
              "radix-side-bottom:animate-slide-down radix-side-top:animate-slide-up",
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

        <ThemeToggle />
      </nav>
    </div>
  );
};

export default MobileNavbar;
