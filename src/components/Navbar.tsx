import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";
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
    <Link href={href} passHref>
      <NavigationMenuPrimitive.Link
        active={isActive}
        className={cx(
          className,
          isActive ? "dark:text-orange-300 text-orange-800 font-semibold" : "",
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
            className="flex text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 font-medium text-neutral-700 dark:text-neutral-100"
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
    <div className="flex flex-col justify-center px-8 fixed top-0 left-0 right-0 z-[1000]">
      <NavigationMenuPrimitive.Root className="relative w-full max-w-3xl mt-8 mb-16 mx-auto rounded-lg bg-neutral-50/75 dark:bg-neutral-800/75 p-2 shadow-lg backdrop-blur-[6px]">
        <NavigationMenuPrimitive.List className="flex flex-row justify-between opacity-100">
          <NavigationMenuPrimitive.Item className="flex items-center">
            <CustomLink href="/" ariaLabel="Subaan Qasim - Home">
              <svg
                viewBox="0 0 489 478"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <path
                  d="M307.953 37.1851C305.894 39.0246 305.715 42.1854 307.555 44.2449C309.394 46.3044 312.555 46.4828 314.615 44.6432L307.953 37.1851ZM322.824 7.93052L326.48 4.5196V4.51959L322.824 7.93052ZM129.94 129.97L124.95 129.666L124.94 129.818V129.97H129.94ZM450.589 211.604L455.51 210.719L455.475 210.525L455.425 210.335L450.589 211.604ZM41.7415 408.682L38.3475 412.353L38.4626 412.46L38.5841 412.559L41.7415 408.682ZM247.814 176.972L250.251 181.337L250.409 181.249L250.559 181.151L247.814 176.972ZM472.021 83.7928L472.287 78.7999L472.154 78.7928H472.021V83.7928ZM12.0672 478C14.8286 478 17.0672 475.761 17.0672 473C17.0672 470.239 14.8286 468 12.0672 468V478ZM5.90609 469.353L3.07299 465.233L5.90609 469.353ZM6.44963 472.388L5.38076 477.272L6.44963 472.388ZM314.615 44.6432C318.748 40.9514 324.42 34.6939 327.873 27.7936C331.242 21.0594 333.299 11.8282 326.48 4.5196L319.168 11.3414C321.581 13.9279 321.715 17.7528 318.93 23.3187C316.228 28.7186 311.513 34.0053 307.953 37.1851L314.615 44.6432ZM326.48 4.51959C324.429 2.32157 321.63 1.19095 318.888 0.609549C316.099 0.018106 312.891 -0.108139 309.459 0.081974C302.587 0.462619 294.057 2.15984 284.594 4.85474C265.619 10.2583 242.104 19.9032 219.077 32.2284C196.062 44.5477 173.293 59.6735 155.941 76.1396C138.745 92.4589 126.098 110.826 124.95 129.666L134.931 130.274C135.844 115.305 146.174 99.1945 162.825 83.3933C179.321 67.7391 201.27 53.1025 223.796 41.0449C246.312 28.9932 269.163 19.6467 287.332 14.4723C296.442 11.8783 304.178 10.3899 310.012 10.0667C312.933 9.90486 315.187 10.0472 316.813 10.392C318.487 10.7469 319.055 11.2203 319.168 11.3415L326.48 4.51959ZM124.94 129.97C124.94 140.59 131.157 148.186 140.371 153.417C149.401 158.544 161.903 161.807 176.268 164.017C205.056 168.447 243.552 168.936 282.102 169.91C320.921 170.891 359.887 172.362 390.449 178.586C405.724 181.696 418.546 185.93 428.086 191.652C437.556 197.332 443.498 204.285 445.753 212.874L455.425 210.335C452.322 198.515 444.226 189.672 433.23 183.076C422.305 176.523 408.234 172.002 392.444 168.787C360.874 162.358 321.018 160.891 282.354 159.914C243.42 158.929 205.773 158.439 177.788 154.134C163.767 151.976 152.725 148.932 145.308 144.721C138.075 140.614 134.94 135.841 134.94 129.97H124.94ZM445.668 212.49C447.172 220.848 443.938 230.977 435.525 242.714C427.179 254.358 414.234 266.872 397.803 279.685C364.973 305.287 319.049 331.454 270.735 353.706C222.436 375.95 172.02 394.156 130.302 403.946C109.427 408.845 90.9119 411.593 76.0172 411.751C60.8726 411.911 50.5077 409.373 44.899 404.805L38.5841 412.559C47.0399 419.445 60.4637 421.916 76.123 421.75C92.0321 421.582 111.336 418.669 132.587 413.682C175.12 403.7 226.182 385.234 274.918 362.789C323.638 340.351 370.304 313.811 403.952 287.571C420.76 274.464 434.526 261.273 443.653 248.539C452.713 235.898 457.715 222.975 455.51 210.719L445.668 212.49ZM45.1355 405.01C43.1439 403.169 41.8102 400.052 41.9577 394.885C42.1063 389.685 43.7666 382.971 47.1257 374.908C53.8289 358.82 66.8146 338.497 85.2451 316.259C122.06 271.84 179.913 220.61 250.251 181.337L245.376 172.606C173.937 212.494 115.133 264.528 77.5458 309.878C58.7752 332.526 45.1236 353.713 37.8949 371.062C34.2881 379.719 32.1588 387.705 31.9618 394.6C31.7639 401.527 33.5287 407.899 38.3475 412.353L45.1355 405.01ZM250.559 181.151C273.244 166.25 311.204 143.087 352.336 123.669C393.64 104.169 437.436 88.7928 472.021 88.7928V78.7928C435.084 78.7928 389.582 95.0263 348.066 114.626C306.377 134.307 267.995 157.733 245.069 172.793L250.559 181.151ZM471.755 88.7858C476.245 89.025 477.602 90.1139 477.902 90.491C478.015 90.6333 478.645 91.5144 477.592 94.6039C476.563 97.6265 474.245 101.676 470.427 106.757C466.653 111.778 461.609 117.552 455.39 124.006C430.454 149.883 387.756 185.538 336.434 225.32C233.894 304.802 97.8229 400.077 3.07299 465.233L8.73919 473.473C103.504 408.306 239.778 312.894 342.561 233.223C393.9 193.428 437.107 157.391 462.59 130.945C468.976 124.319 474.318 118.224 478.421 112.765C482.478 107.366 485.526 102.326 487.058 97.8289C488.568 93.3986 488.956 88.3295 485.732 84.2708C482.694 80.4468 477.618 79.0839 472.287 78.7999L471.755 88.7858ZM5.38076 477.272C7.17224 477.664 9.46224 478 12.0672 478V468C10.3116 468 8.74798 467.772 7.51849 467.503L5.38076 477.272ZM3.07299 465.233C0.880585 466.741 -0.264492 469.329 0.191857 471.939C0.656071 474.594 2.68069 476.681 5.38076 477.272L7.51849 467.503C8.68419 467.758 9.78995 468.773 10.0424 470.217C10.2871 471.616 9.6374 472.855 8.73919 473.473L3.07299 465.233Z"
                  fill="#D8A962"
                />
              </svg>
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
