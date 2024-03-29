import { z } from "zod";

const sanityImageCropSchema = z.object({
  _type: z.string().optional(),
  top: z.number(),
  bottom: z.number(),
  left: z.number(),
});

const sanityImageHotspotSchema = z.object({
  _type: z.string().optional(),
  width: z.number(),
  height: z.number(),
  x: z.number(),
  y: z.number(),
});

const sanityAssetSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  _ref: z.string().optional(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  altText: z.string().nullish(),
  url: z.string(),
  path: z.string(),
  assetId: z.string(),
  extension: z.string(),
  originalFilename: z.string().optional(),
  mimeType: z.string(),
});
export type SanityAssetType = z.infer<typeof sanityAssetSchema>;

const sanityImageDimensionsSchema = z.object({
  height: z.number(),
  width: z.number(),
  aspectRatio: z.number(),
});

const sanityImageSwatchSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  population: z.number(),
  title: z.string(),
});

const sanityImagePaletteSchema = z.object({
  _type: z.string().optional(),
  darkMuted: sanityImageSwatchSchema.optional(),
  darkVibrant: sanityImageSwatchSchema.optional(),
  dominant: sanityImageSwatchSchema.optional(),
  lightMuted: sanityImageSwatchSchema.optional(),
  lightVibrant: sanityImageSwatchSchema.optional(),
  muted: sanityImageSwatchSchema.optional(),
  vibrant: sanityImageSwatchSchema.optional(),
});

const sanityImageMetadataSchema = z.object({
  dimensions: sanityImageDimensionsSchema,
  lqip: z.string().optional(),
  blurHash: z.string().optional(),
  palette: sanityImagePaletteSchema.optional(),
});

const sanityImageOptSchema = z.object({
  media: z.object({
    tags: z
      .array(
        z.object({
          _createdAt: z.string().datetime(),
          _id: z.string(),
          _rev: z.string().nullish(),
          _type: z.literal("media.tag"),
          _updatedAt: z.string().datetime(),
          name: z.object({
            _type: z.literal("slug"),
            current: z.string(),
          }),
        }),
      )
      .nullish(),
  }),
});

export const sanityImageAssetSchema = sanityAssetSchema.extend({
  _type: z.literal("sanity.imageAsset"),
  _id: z.string(),
  metadata: sanityImageMetadataSchema,
  opt: sanityImageOptSchema.nullish(),
});
export type SanityImageAssetType = z.infer<typeof sanityImageAssetSchema>;

export const sanityImageSchema = z.object({
  asset: sanityImageAssetSchema,
  crop: sanityImageCropSchema.nullish(),
  hotspot: sanityImageHotspotSchema.nullish(),
});
export type SanityImageType = z.infer<typeof sanityImageSchema>;

const sanityDocumentSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  _createdAt: z.string().datetime(),
  _updatedAt: z.string().datetime(),
  _rev: z.string(),
});

export const socialsSchema = z.object({
  _type: z.literal("socials"),
  twitter: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedIn: z.string().url().optional(),
  github: z.string().url().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});
export type SocialsType = z.infer<typeof socialsSchema>;

const slugSchema = z.object({
  _type: z.literal("slug"),
  current: z.string(),
});

export const authorSchema = sanityDocumentSchema.extend({
  _type: z.literal("author"),
  name: z.string(),
  occupation: z.string(),
  location: z.string(),
  socials: socialsSchema,
  shortBio: z.string(),
  fullBio: z.string(),
  headshot: sanityImageSchema,
});
export type AuthorType = z.infer<typeof authorSchema>;

export const articleBaseSchema = sanityDocumentSchema.extend({
  _type: z.literal("article"),
  title: z.string(),
  slug: slugSchema,
  datePublished: z.string().datetime(),
  featureImage: sanityImageSchema,
  author: authorSchema,
  tags: z.array(z.string()),
  excerpt: z.string(),
  content: z.string(),
  featured: z.boolean().nullish(),
});
export type ArticleBaseType = z.infer<typeof articleBaseSchema>;

const projectBaseSchema = sanityDocumentSchema.extend({
  _type: z.literal("project"),
  title: z.string(),
  slug: slugSchema,
  datePublished: z.string().datetime(),
  featureImage: sanityImageSchema,
  logoSVGString: z.string(),
  author: authorSchema,
  excerpt: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().nullish(),
  pattern: z.object({
    y: z.number(),
    squares: z
      .array(
        z
          .object({
            _key: z.string(),
            _type: z.literal("square"),
            square: z.tuple([z.number(), z.number()]),
          })
          .transform((v) => v.square),
      )
      .nonempty(),
  }),
});
export type ProjectBaseType = z.infer<typeof projectBaseSchema>;

export const projectForCardSchema = projectBaseSchema.pick({
  _id: true,
  slug: true,
  title: true,
  excerpt: true,
  logoSVGString: true,
  pattern: true,
});

export type ProjectForCard = z.infer<typeof projectForCardSchema>;

export const articleSchema = articleBaseSchema.extend({
  relatedArticles: z.array(articleBaseSchema).nullish(),
  relatedProjects: z.array(projectBaseSchema).nullish(),
});
export type ArticleType = z.infer<typeof articleSchema>;

export const projectSchema = projectBaseSchema.extend({
  relatedProjects: z.array(projectBaseSchema).nullish(),
  relatedArticles: z.array(articleBaseSchema).nullish(),
});
export type ProjectType = z.infer<typeof projectSchema>;

export const siblingArticleSchema = articleSchema
  .pick({ title: true, slug: true })
  .nullish();
export type SiblingArticleType = z.infer<typeof siblingArticleSchema>;

export const articleInListSchema = articleSchema.pick({
  content: true,
  excerpt: true,
  slug: true,
  title: true,
  _id: true,
  datePublished: true,
});
export type ArticleInListSchemaType = z.infer<typeof articleInListSchema>;
