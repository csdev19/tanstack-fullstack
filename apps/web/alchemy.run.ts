import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: ".env" });

const app = await alchemy("tanstack-fullstack");

export const web = await TanStackStart("web", {
	cwd: "apps/web",
	name: `${app.name}-${app.stage}-web`,
	bindings: {
		VITE_SERVER_URL: process.env.VITE_SERVER_URL || "",
	},
	dev: {
		command: "pnpm run dev",
	},
});

console.log(`Web -> ${web.url}`);

await app.finalize();
