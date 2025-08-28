import { defineConfig } from "drizzle-kit";
import { env } from "./config/env";
import { TABLE_PREFIX } from "./src/constant";

export default defineConfig({
	schema: "./src/schemas/*.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
	tablesFilter: [`${TABLE_PREFIX}_*`],
});
