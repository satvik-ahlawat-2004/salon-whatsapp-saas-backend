import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "test" | "production";

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: (process.env.NODE_ENV as NodeEnv) || "development",
  port: Number(process.env.PORT) || 4000,
  databaseUrl: getEnv("DATABASE_URL", ""),
  jwtSecret: getEnv("JWT_SECRET", "change-me"),
  whatsappApiToken: process.env.WHATSAPP_API_TOKEN || "",
  whatsappBusinessNumber: process.env.WHATSAPP_BUSINESS_NUMBER || "",
};

export const isProd = env.nodeEnv === "production";

