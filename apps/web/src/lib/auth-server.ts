import { createAuth } from "@fullstack/auth/server";
import { env } from "config/env";

export const auth = createAuth({
	DATABASE_URL: env.DATABASE_URL,
	BETTER_AUTH_URL: env.BETTER_AUTH_URL,
	BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
	CORS_ORIGIN: env.CORS_ORIGIN ?? "",
});
