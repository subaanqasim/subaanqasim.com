import pwaInit from "@ducanh2912/next-pwa";
import { runtimeCaching } from "@ducanh2912/next-pwa";
import { env } from "./src/env/server.mjs";

// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.ctfassets.net", "cdn.sanity.io"],
  },
  modularizeImports: {
    "@heroicons/react/24/outline": {
      transform: "@heroicons/react/24/outline/{{member}}",
    },
  },
  experimental: {
    appDir: true,
  },
};

const withPWA = pwaInit({
  dest: "public",
  disable: env.NODE_ENV === "development",
  buildExcludes: ["/chunks/app"],
  runtimeCaching,
});

export default withPWA({
  ...nextConfig,
});
