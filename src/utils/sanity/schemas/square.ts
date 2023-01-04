import { defineType, defineField } from "sanity";

export default defineType({
  name: "square",
  title: "Square",
  type: "object",
  fields: [
    defineField({
      name: "square",
      type: "array",
      of: [
        {
          type: "number",
        },
      ],
      validation: (rule) => rule.length(2).required(),
    }),
  ],
});
