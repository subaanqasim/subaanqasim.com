import { MainLayout } from "@components/common";
import localFont from "@next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "focus-visible";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppType } from "next/app";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";

const articulatCF = localFont({
  src: [
    {
      path: "../../public/static/fonts/ArticulatCF-Normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/ArticulatCF-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/ArticulatCF-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/ArticulatCF-DemiBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-articulatCF",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <SessionProvider session={session}>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full" />
          </div>
        </div>
        <div className={`relative ${articulatCF.variable} font-sans`}>
          <MainLayout>
            <WrapBalancerProvider>
              <Component {...pageProps} />
            </WrapBalancerProvider>
            <Analytics
              beforeSend={(event) => {
                const url = new URL(event.url);
                url.searchParams.delete("email");
                return {
                  ...event,
                  url: url.toString(),
                };
              }}
            />
          </MainLayout>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
