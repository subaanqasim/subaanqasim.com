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
      z.object({
        contentfulID: z.string().nullish(),
        path: z.string(),
      }),
    )
    .mutation(async ({ input: { contentfulID, path }, ctx }) => {
      if (contentfulID) {
        const updatedViews = await ctx.prisma.views.upsert({
          where: { contentfulID },
          create: { contentfulID, path },
          update: {
            path, // as might change path/slug after publishing
            count: { increment: 1 },
          },
        });
        return updatedViews; // updatedViews.count;
      }

      const updatedViews = await ctx.prisma.views.upsert({
        where: { path },
        create: { path },
        update: {
          path,
          count: { increment: 1 },
        },
      });

      return updatedViews; // updatedViews.count;
    }),
});
