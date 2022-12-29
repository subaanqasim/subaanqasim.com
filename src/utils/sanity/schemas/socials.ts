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
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),

    defineField({
      name: "linkedIn",
      title: "LinkedIn",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),

    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),

    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
  ],
});
