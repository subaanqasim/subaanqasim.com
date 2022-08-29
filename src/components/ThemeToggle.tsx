import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeydown = (event: any) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "j") {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [resolvedTheme, setTheme]);

  return (
    <button
      className="flex h-8 w-8 origin-center items-center justify-center rounded-lg bg-neutral-200/50 text-neutral-800 ring-neutral-500 transition-all ease-[cubic-bezier(.5,0,.15,1)] hover:ring-2 dark:bg-neutral-700/50 dark:text-neutral-100 dark:ring-neutral-300"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          strokeWidth="1.25"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {resolvedTheme === "dark" ? (
            <>
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path>
              <path d="M6.343 17.657l-1.414 1.414"></path>
              <path d="M6.343 6.343l-1.414 -1.414"></path>
              <path d="M17.657 6.343l1.414 -1.414"></path>
              <path d="M17.657 17.657l1.414 1.414"></path>
              <path d="M4 12h-2"></path>
              <path d="M12 4v-2"></path>
              <path d="M20 12h2"></path>
              <path d="M12 20v2"></path>
            </>
          ) : (
            <>
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
            </>
          )}
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
