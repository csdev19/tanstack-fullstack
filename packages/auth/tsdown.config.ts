import { defineConfig } from "tsdown";

export default defineConfig({
	// Entry points for authentication layers
	entry: {
		index: "src/index.ts",
		server: "src/server/index.ts",
		// client: 'src/client/index.ts',
		types: "src/types/index.ts",
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
	external: [
		"better-auth",
		"better-auth/adapters/drizzle",
		"better-auth/plugins",
		"drizzle-orm",
		"zod",
		"node:crypto",
		"@fullstack/database",
	],

	// Target environment
	target: "es2022",

	// Bundle settings
	treeshake: true,
	minify: false, // Keep readable for library distribution
});
