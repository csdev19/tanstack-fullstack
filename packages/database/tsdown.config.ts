import { defineConfig } from "tsdown";

export default defineConfig({
	// Entry points for database layers
	entry: {
		schemas: "src/schemas/index.ts",
		client: "src/client/index.ts",
	},

	// Output formats
	format: ["esm"],

	// Output settings
	outDir: "dist",
	clean: true,
	sourcemap: true,

	// TypeScript settings
	dts: true, // Generate .d.ts files
	// splitting: false, // Keep it simple for a library

	// External dependencies (don't bundle these)
	external: ["drizzle-orm", "zod", "@neondatabase/serverless"],

	// Target environment
	target: "es2022",

	// Bundle settings
	treeshake: true,
	minify: false, // Keep readable for library distribution
});
