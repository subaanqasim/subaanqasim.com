import { groq } from "next-sanity";

const imageDestructure = groq`
  ...,
  asset ->
`;

const authorDestructure = groq`
  ...,
  headshot {
    ${imageDestructure}
  },
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
  *[_type == "article"] | order(datePublished desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    datePublished,
  }
`;

export const allArticlesSlugQuery = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    "articleData": {
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
    },

    "next": *[_type == "article" && ^.datePublished < datePublished] | order(datePublished asc)[0] {
      title,
      slug
    },

    "previous": *[_type == "article" && ^.datePublished > datePublished] | order(datePublished desc)[0] {
      title,
      slug
    },
  }
`;

// export const articleBySlugQuery = groq`
//   *[_type == "article" && slug.current == $slug][0] {
//     "articleData": {
//       ...,
//       author -> {
//         ...
//       },
//       featureImage {
//         ...
//       },
//       relatedArticles[] -> {
//         ...
//       },
//       relatedProjects[] -> {
//         ...
//       }
//     },
//     "next": *[_type == "article" && ^.datePublished < datePublished] | order(datePublished asc)[0] {
//       title,
//       slug,
//     },
//     "previous": *[_type == "article" && ^.datePublished > datePublished] | order(datePublished desc)[0] {
//       title,
//       slug,
//     }
//   }
// `;
