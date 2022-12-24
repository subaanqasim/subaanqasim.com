import { useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "./Icons";
import { useBounce, useHasMounted } from "@utils/hooks";
import { animated } from "@react-spring/web";

export default function ThemeToggle() {
  const hasMounted = useHasMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const { appliedStyle, trigger } = useBounce({
    scale: 0.9,
    rotation: resolvedTheme === "dark" ? 8 : -8,
  });

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
    <animated.div
      style={appliedStyle}
      onMouseDown={trigger}
      className="hover:scale-110"
    >
      <button
        className="group rounded-full bg-white/50 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:scale-110 dark:bg-neutral-800/50 dark:ring-white/10 dark:hover:ring-white/20"
        aria-label="Toggle theme"
        onClick={() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
      >
        {hasMounted && (
          <>
            <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
            <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
          </>
        )}
      </button>
    </animated.div>
  );
}
