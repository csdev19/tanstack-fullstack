import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../schemas";

/**
 * Create a database client instance
 */
export const createDatabaseClient = (databaseUrl: string) => {
	const sql = neon(databaseUrl);
	return drizzle(sql, { schema });
};

export type DatabaseClient = ReturnType<typeof createDatabaseClient>;
