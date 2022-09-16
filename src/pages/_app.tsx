import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";
import MainLayout from "../components/layouts/MainLayout";
import type { AppProps } from "next/app";

type customAppProps = {
  Component: AppProps["Component"];
  pageProps: any;
};

const MyApp: AppType = ({ Component, pageProps }: customAppProps) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={pageProps.session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
