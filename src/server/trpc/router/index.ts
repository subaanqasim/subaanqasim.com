import { t } from "../utils";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { cmsRouter } from "./cms";
import { viewsRouter } from "./views";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  cms: cmsRouter,
  views: viewsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
