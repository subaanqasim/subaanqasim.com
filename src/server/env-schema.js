const { z } = require("zod");

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  CONTENTFUL_SPACE_ID: z.string(),
  CONTENTFUL_ACCESS_TOKEN: z.string(),
  CONTENTFUL_ADMIN_TOKEN: z.string(),
  CONTENTFUL_ENVIRONMENT: z.string(),
});

module.exports.envSchema = envSchema;
