import { defineType, defineField } from "sanity";

export default defineType({
  name: "socials",
  title: "Socials",
  type: "object",
  fields: [
    defineField({
      name: "twitter",
      title: "Twitter",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }).required(),
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }).required(),
    }),

    defineField({
      name: "linkedIn",
      title: "LinkedIn",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }).required(),
    }),

    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }).required(),
    }),
  ],
});
