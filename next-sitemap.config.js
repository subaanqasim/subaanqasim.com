/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://www.subaan.qasim.com",
  generateIndexSitemap: false,
  exclude: ["/admin"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "/admin",
      },
    ],
  },
};

export default config;
