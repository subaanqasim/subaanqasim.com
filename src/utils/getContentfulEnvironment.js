// required for contentful-typescript-codegen to generate types from Contentful

const contentful = require("contentful-management");
const env = require("../server/env.js");

async function createContentfulClient() {
  const contentfulClient = contentful.createClient({
    accessToken: env.CONTENTFUL_ADMIN_TOKEN,
  });

  const configuredClient = await contentfulClient.getSpace(
    env.CONTENTFUL_SPACE_ID
  );

  return configuredClient.getEnvironment(env.CONTENTFUL_ENVIRONMENT);
}

module.exports = createContentfulClient;
