import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";
import MainLayout from "@components/layouts/MainLayout";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import "focus-visible";
import { useEffect, useRef } from "react";

const usePrevious = (value: string) => {
  const ref = useRef<string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  const previousPathname = usePrevious(router.pathname);

  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <MainLayout>
            <Component previousPathname={previousPathname} {...pageProps} />
          </MainLayout>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
