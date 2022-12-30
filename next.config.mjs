import pwa from "next-pwa";
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
  experimental: {
    appDir: true,
  },
};

const withPWA = pwa({
  dest: "public",
  disable: env.NODE_ENV === "development",
});

export default withPWA({
  ...nextConfig,
});
