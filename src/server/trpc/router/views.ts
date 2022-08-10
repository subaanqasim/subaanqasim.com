import { t } from "../utils";
import { z } from "zod";

export const viewsRouter = t.router({
  getTotalViews: t.procedure
    .input(
      z.object({
        assetType: z.enum(["article", "project", "all"]),
      }),
    )
    .query(async ({ ctx, input: { assetType } }) => {
      const totalViews = await ctx.prisma.views.aggregate({
        _sum: {
          count: true,
        },
        where:
          assetType === "all"
            ? {}
            : {
                path: {
                  startsWith: `/${assetType}s/`,
                },
              },
      });

      return totalViews._sum.count;
    }),

  getViews: t.procedure
    .input(
      z.object({
        contentfulID: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const article = await ctx.prisma.views.findUnique({
        where: {
          contentfulID: input.contentfulID,
        },
      });

      return article?.count;
    }),

  addView: t.procedure
    .input(
      z
        .object({
          contentfulID: z.string(),
          path: z.string(),
        })
        .partial()
        .superRefine((data, ctx) => {
          if (!data.contentfulID && !data.path) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["path"],
              message: "path should be set if contentfulID isn't",
            });
          }
        }),
    )
    .mutation(async ({ input: { contentfulID, path }, ctx }) => {
      // if contentfulID
      // upsert view by ID
      // else
      // upsert view by path
    }),
});
