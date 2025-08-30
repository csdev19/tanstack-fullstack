import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import alchemy from "alchemy/cloudflare/tanstack-start";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		target: "esnext",
		rollupOptions: {
			external: ["node:async_hooks", "cloudflare:workers"],
		},
	},
	plugins: [
		tailwindcss() as PluginOption,
		alchemy(),
		tsconfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart({
			target: "cloudflare-module",
			customViteReactPlugin: true,
		}),
		viteReact(),
	],
});
