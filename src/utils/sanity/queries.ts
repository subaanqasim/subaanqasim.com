import { groq } from "next-sanity";

const imageDestructure = groq`
  ...,
  asset->
`;

const authorDestructure = groq`
  ...,
  headshot {
    ${imageDestructure}
  }
`;

const relatedArticlesDestructure = groq`
  ...,
  featureImage {
    ${imageDestructure}
  },
  author -> {
    ${authorDestructure}
  },
  'relatedArticles': null,
  'relatedProjects': null
`;

const relatedProjectsDestructure = groq`
  ...,
  featureImage {
    ${imageDestructure}
  },
  logo ->,
  author -> {
    ${authorDestructure}
  },
  'relatedArticles': null,
  'relatedProjects': null
`;

export const allArticlesQuery = groq`
*[_type == "article"]  {
  ...,
  author -> {
    ${authorDestructure}
  },
  featureImage {
    ${imageDestructure}
  },
  relatedArticles[] -> {
    ${relatedArticlesDestructure}
  },
  relatedProjects[] -> {
    ${relatedProjectsDestructure}
  }
}`;
