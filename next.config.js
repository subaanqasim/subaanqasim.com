const { env } = require("./src/server/env");
const pwa = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ["images.ctfassets.net"],
  },
};

const withPWA = pwa({
  dest: "public",
  disable: env.NODE_ENV === "development",
  runtimeCaching,
});

module.exports = withPWA({
  ...nextConfig,
});
