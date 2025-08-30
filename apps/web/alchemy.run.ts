import alchemy from "alchemy";
import {
	createCloudflareApi,
	getAccountSubdomain,
	TanStackStart,
} from "alchemy/cloudflare";
import { env } from "config/env";

const app = await alchemy("tanstack-fullstack");
const api = await createCloudflareApi();
const subdomain = await getAccountSubdomain(api);

const workerUrl = `https://${app.name}-${app.stage}-web.${subdomain}.workers.dev`;

export const web = await TanStackStart("web", {
	name: `${app.name}-${app.stage}-web`,
	bindings: {
		DATABASE_URL: alchemy.secret(env.DATABASE_URL),
		DATABASE_URL_POOLER: alchemy.secret(env.DATABASE_URL_POOLER),
		BETTER_AUTH_SECRET: alchemy.secret(env.BETTER_AUTH_SECRET),
		BETTER_AUTH_URL: workerUrl,
		CORS_ORIGIN: workerUrl,
		NODE_ENV: env.NODE_ENV,
	},
});

console.log(`Web -> ${web.url}`);

await app.finalize();
