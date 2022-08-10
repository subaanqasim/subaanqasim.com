/** @type {import('next-sitemap').IConfig} */

const sitemapConfig = {
  siteUrl: process.env.SITE_URL || "https://subaanqasim.com",
  generateIndexSitemap: false,
  exclude: ["/admin", "/_offline"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/admin", "/_offline"],
      },
    ],
  },
};

module.exports = sitemapConfig;
