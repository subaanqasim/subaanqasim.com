import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";
import MainLayout from "../components/layouts/MainLayout";
import type { AppType } from "next/app";
import type { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
