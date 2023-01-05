import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "featured",
      title: "Featured?",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "datePublished",
      title: "Date Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "socials",
      title: "Socials",
      type: "socials",
    }),

    defineField({
      name: "featureImage",
      title: "Feature Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "logoSVGString",
      title: "Logo SVG String",
      type: "string",
      description:
        "SVG string of the logo. Remove any 'class' or 'currentColor' related attributes.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "tags",
      title: "Tags / Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "pattern",
      title: "Pattern",
      type: "object",
      fields: [
        defineField({
          name: "y",
          title: "y",
          type: "number",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "squares",
          title: "squares",
          type: "array",
          of: [
            {
              type: "square",
            },
          ],
          validation: (rule) => rule.min(1).max(3).required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "relatedArticles",
      title: "Related Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),

    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
});
