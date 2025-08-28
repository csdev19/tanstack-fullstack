export class UnauthorizedError extends Error {
	readonly _tag = "UnauthorizedError";
	constructor() {
		super("User session not found");
	}
}
