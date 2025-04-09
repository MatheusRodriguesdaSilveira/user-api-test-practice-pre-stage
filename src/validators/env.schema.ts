import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  // Server
  PORT: z.coerce.number().default(3333),

  // Database
  DATABASE_URL: z.string(),

  // JWT
  JWT_SECRET: z.string().default("default_secret"),

  // URLs
  API_URL: z.string().url(),
  WEB_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
