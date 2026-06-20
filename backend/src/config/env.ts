import { config } from "dotenv";
import * as z from "zod";

config();

const envSchema = z.object({
  DATABASE_URL: z.url(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Failed to load env variables:", error.issues[0]);
  process.exit(1);
}

export const ENV_VARIABLES = { ...data } as const;
