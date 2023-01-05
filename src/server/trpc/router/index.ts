import { t } from "../utils";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { viewsRouter } from "./views";
import { stripeRouter } from "./stripe";
import { emailRouter } from "./email";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  views: viewsRouter,
  stripe: stripeRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
