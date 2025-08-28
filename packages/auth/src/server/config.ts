import { randomBytes, scryptSync } from "node:crypto";
import type { BetterAuthOptions } from "better-auth";

const AUTH_BASE_PATH = "/api/auth";

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
	/**
	 * The name of the application.
	 */
	appName: "tanstack-fullstack",

	/**
	 * Base path for Better Auth.
	 * @default "/api/auth"
	 */
	basePath: AUTH_BASE_PATH,

	/**
	 * Email and password authentication configuration
	 */
	emailAndPassword: {
		enabled: true,
		password: {
			/**
			 * Hash password using scrypt from node:crypto
			 */
			hash: async (password: string): Promise<string> => {
				const salt = randomBytes(16).toString("hex");
				const hash = scryptSync(password, salt, 64).toString("hex");
				return `${salt}:${hash}`;
			},

			/**
			 * Verify password against hash
			 * Description: this implementation it was created because better-auth have an issue with wrangler/cloudflare workers
			 * Issue: https://github.com/better-auth/better-auth/issues/969
			 */
			verify: async ({
				hash,
				password,
			}: {
				hash: string;
				password: string;
			}): Promise<boolean> => {
				const [salt, key] = hash.split(":");
				if (!salt || !key) return false;

				const keyBuffer = Buffer.from(key, "hex");
				const hashBuffer = scryptSync(password, salt, 64);
				return keyBuffer.equals(hashBuffer);
			},
		},
	},
};
