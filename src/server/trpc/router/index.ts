import { t } from "../utils";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { cmsRouter } from "./cms";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  cms: cmsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
