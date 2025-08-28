import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// No need to set baseURL, it will be set automatically
	// https://www.better-auth.com/docs/installation#create-client-instance
	// baseURL: import.meta.env.VITE_SERVER_URL,
});
