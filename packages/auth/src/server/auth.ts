import { createDatabaseClient } from "@fullstack/database/client";
import {
	accountsTable,
	sessionsTable,
	usersTable,
	verificationsTable,
} from "@fullstack/database/schemas";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import type { AuthServerConfig } from "src/types";
import { betterAuthOptions } from "./config";

/**
 * Create a Better Auth instance with Drizzle adapter and custom session data
 *
 * @param config - Auth configuration object
 * @returns Better Auth instance
 */
export function createAuth(config: AuthServerConfig) {
	const dbInstance = createDatabaseClient(config.DATABASE_URL);

	return betterAuth({
		...betterAuthOptions,

		// Database adapter configuration
		database: drizzleAdapter(dbInstance, {
			provider: "pg",
			schema: {
				accounts: accountsTable,
				sessions: sessionsTable,
				users: usersTable,
				verifications: verificationsTable,
			},
			usePlural: true,
		}),

		// Auth server configuration
		baseURL: config.BETTER_AUTH_URL,
		secret: config.BETTER_AUTH_SECRET,
		trustedOrigins: [config.CORS_ORIGIN],

		// Plugins configuration
		plugins: [
			...(betterAuthOptions.plugins ?? []),

			// Custom session plugin to include condominium data
			customSession(async ({ user, session }) => {
				return {
					user: { ...user, image: user.image ?? "" },
					session: { ...session },
					test: "Props from custom session plugin",
				};
			}),
			reactStartCookies(),
		],
	});
}

/**
 * Type for the auth instance
 */
export type ServerAuthInstance = ReturnType<typeof createAuth>;
