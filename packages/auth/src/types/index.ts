/**
 * Configuration interface for creating auth server instance
 */
export interface AuthServerConfig {
	/** Database connection URL */
	DATABASE_URL: string;
	/** Better Auth base URL */
	BETTER_AUTH_URL: string;
	/** Better Auth secret for JWT signing */
	BETTER_AUTH_SECRET: string;
	/** CORS origin for trusted origins */
	CORS_ORIGIN: string;
}

/**
 * Configuration for creating auth client instance
 */
export interface AuthClientConfig {
	/** Base URL for the auth API */
	baseURL: string;
	/** Base path for auth endpoints */
	basePath?: string;
}
