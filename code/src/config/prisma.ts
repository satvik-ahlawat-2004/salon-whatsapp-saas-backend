import { PrismaClient } from "@prisma/client";
import { env } from "./env";
import { logger } from "../utils/logger";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: env.nodeEnv === "development" ? ["query", "info", "warn", "error"] : ["error"],
  });

if (env.nodeEnv !== "production") {
  global.prisma = prisma;
}

prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    logger.error("Prisma error", { error, params });
    throw error;
  }
});

