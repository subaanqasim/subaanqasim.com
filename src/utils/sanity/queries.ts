import { groq } from "next-sanity";

export const imageOptProjection = groq`
  ...,
  media {
    ...,
    tags[] ->
  },
`;
const imageProjection = groq`
  ...,
  asset -> {
    ...,
    opt {
      ${imageOptProjection}
    }
  }
`;

const authorProjection = groq`
  ...,
  headshot {
    ${imageProjection}
  },
`;

const relatedArticlesProjection = groq`
  ...,
  featureImage {
    ${imageProjection}
  },
  author -> {
    ${authorProjection}
  },
  'relatedArticles': null,
  'relatedProjects': null
`;

const relatedProjectsProjection = groq`
  ...,
  featureImage {
    ${imageProjection}
  },
  author -> {
    ${authorProjection}
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

export const allArticleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    "articleData": {
      ...,
      author -> {
        ${authorProjection}
      },
      featureImage {
        ${imageProjection}
      },
      relatedArticles[] -> {
        ${relatedArticlesProjection}
      },
      relatedProjects[] -> {
        ${relatedProjectsProjection}
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

export const allPhotographyQuery = groq`
*[_type == "sanity.imageAsset" && "photography" in opt.media.tags[]->.name.current]{
  ...,
  opt {
    ${imageOptProjection}
  }
}
`;

export const getProfileQuery = groq`
  *[_type == "author"][0] {
      ...,
      headshot {
        ${imageProjection}
      }
    }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(datePublished desc) {
    _id,
    title,
    slug,
    excerpt,
    pattern,
    logoSVGString 
  }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ...,
    author -> {
      ${authorProjection}
    },
    featureImage {
      ${imageProjection}
    },
    relatedArticles[] -> {
      ${relatedArticlesProjection}
    },
    relatedProjects[] -> {
      ${relatedProjectsProjection}
    }
  }
`;

export const staleAuthorRoutesQuery = ({ id }: { id: string }) => groq`
  *[_type == "author" && _id == "${id}"] {
    "articles": *[_type == "article" && references(^._id)].slug.current,
    "projects": *[_type == "project" && references(^._id)].slug.current
}[0]
`;

export const staleArticleRoutesQuery = ({ id }: { id: string }) => groq`
  *[_type == "article" && _id == "${id}"] {
    "updatedArticle": slug.current,

    "nextArticle": *[_type == "article" && ^.datePublished < datePublished] | order(datePublished asc)[0].slug.current,

    "previousArticle": *[_type == "article" && ^.datePublished > datePublished] | order(datePublished desc)[0].slug.current,

    "relatedArticles": *[_type == "article" && references(^._id)].slug.current,

    "relatedProjects": *[_type == "project" && references(^._id)].slug.current
  }[0]
`;

export const staleProjectRoutesQuery = ({ id }: { id: string }) => groq`
  *[_type == "project" && _id == "${id}"] {
    "updatedProject": slug.current,

    "relatedProjects": *[_type == "project" && references(^._id)].slug.current,

    "relatedArticles": *[_type == "article" && references(^._id)].slug.current
  }[0]
`;
