// src/utils/trpc.ts
import { createTRPCNext } from "@trpc/next";
// import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../server/trpc/router";
import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      // url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      links: [
        loggerLink({
          enabled: () => process.env.NODE_ENV === "development",
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
// export type inferOutputs<
//   TRouteKey extends keyof AppRouter["_def"]["procedures"],
// > = inferProcedureOutput<AppRouter["_def"]["procedures"][TRouteKey]>;

// export type inferInputs<
//   TRouteKey extends keyof AppRouter["_def"]["procedures"],
// > = inferProcedureInput<AppRouter["_def"]["procedures"][TRouteKey]>;
