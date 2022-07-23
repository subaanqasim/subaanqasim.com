import { t } from "../utils";
import { z } from "zod";
import { cda } from "../../../utils/contentful";

export const cmsRouter = t.router({
  getAllArticles: t.procedure.query(async () => {
    const articles = await cda.getEntries({
      content_type: "article",
    });

    return articles.items;
  }),
  getAllAuthors: t.procedure.query(async () => {
    const authors = await cda.getEntries({
      content_type: "author",
    });

    return authors.items;
  }),
  getAllProjects: t.procedure.query(async () => {
    const projects = await cda.getEntries({
      content_type: "project",
    });

    return projects.items;
  }),
});
