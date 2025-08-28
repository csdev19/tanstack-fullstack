import { z } from "zod/v4";

// This schema only works on node.js to run scrips, on wrangler it will fail
export const envSchema = z.object({
	DATABASE_URL: z.url(),
	DATABASE_URL_POOLER: z.url(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.url(),
	CORS_ORIGIN: z.url().optional(),
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
});

export const env = envSchema.parse(process.env);
