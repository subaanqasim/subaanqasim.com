import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession as getServerSession } from "next-auth";

import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "../db/client";

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  const session = await getServerSession(opts.req, opts.res, nextAuthOptions);

  return {
    session,
    prisma,
    req: opts.req,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
