import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "occupation",
      title: "Occupation / Role / Job Title",
      type: "string",
    }),

    defineField({
      name: "socials",
      title: "Socials",
      type: "socials",
    }),

    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "fullBio",
      title: "Full bio",
      type: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
});
