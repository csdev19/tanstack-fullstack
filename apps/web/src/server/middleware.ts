// import { auth } from '@/lib/auth-server';

import { createMiddleware } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth-server";

export const authMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const headers = getHeaders();
		const authHeaders = new Headers();
		authHeaders.set("cookie", headers.cookie ?? "");

		const session = await auth.api.getSession({
			headers: authHeaders,
		});

		return await next({
			context: {
				session: session,
			},
		});
	},
);
