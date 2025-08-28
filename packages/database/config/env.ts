import { z } from "zod/v4";

export const envSchema = z.object({
	DATABASE_URL: z.url(),
	DATABASE_URL_POOLER: z.url(),
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
});

export const env = envSchema.parse(process.env);
