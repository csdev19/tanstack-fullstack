import { createDatabaseClient } from "@fullstack/database/client";
import { todosTable } from "@fullstack/database/schemas";
import { createServerFn } from "@tanstack/react-start";
import { env } from "config/env";
import { eq } from "drizzle-orm";
import { Effect } from "effect";
import z from "zod";
import { UnauthorizedError } from "./errors";
import { authMiddleware } from "./middleware";

const db = createDatabaseClient(env.DATABASE_URL);

export const getServerHealthCheck = createServerFn().handler(async () => {
	return "OK";
});

export const getPrivateData = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const program = Effect.gen(function* () {
			if (!context.session) {
				yield* Effect.fail(new UnauthorizedError());
			}
			return "This is private";
		});
		return Effect.runPromise(program);
	});

const CreateTodoInput = z.object({
	description: z.string(),
});

export const createTodo = createServerFn()
	.middleware([authMiddleware])
	.validator(CreateTodoInput)
	.handler(async ({ context, data }) => {
		const program = Effect.gen(function* () {
			if (!context.session) {
				yield* Effect.fail(new UnauthorizedError());
			}

			const todo = yield* Effect.tryPromise({
				try: () =>
					db
						.insert(todosTable)
						.values({
							id: crypto.randomUUID(),
							title: "placeholder",
							description: data.description,
							userId: context.session?.user.id ?? "",
						})
						.returning(),
				catch: (error) => new Error(`Database error: ${error}`),
			});
			return todo;
		});
		return Effect.runPromise(program);
	});

export const getTodos = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const program = Effect.gen(function* () {
			if (!context.session) {
				yield* Effect.fail(new UnauthorizedError());
			}

			const todos = yield* Effect.tryPromise({
				try: () =>
					db
						.select()
						.from(todosTable)
						.where(eq(todosTable.userId, context.session?.user.id ?? "")),
				catch: (error) => new Error(`Database error: ${error}`),
			});
			return todos;
		});
		return Effect.runPromise(program);
	});

const DeleteTodoInput = z.object({
	id: z.string(),
});

export const deleteTodo = createServerFn()
	.middleware([authMiddleware])
	.validator(DeleteTodoInput)
	.handler(async ({ context, data }) => {
		const program = Effect.gen(function* () {
			if (!context.session) {
				yield* Effect.fail(new UnauthorizedError());
			}
			yield* Effect.tryPromise({
				try: () => db.delete(todosTable).where(eq(todosTable.id, data.id)),
				catch: (error) => new Error(`Database error: ${error}`),
			});
			return data.id;
		});
		return Effect.runPromise(program);
	});

const ToggleTodoInput = z.object({
	id: z.string(),
	isCompleted: z.boolean(),
});

export const toggleTodo = createServerFn()
	.middleware([authMiddleware])
	.validator(ToggleTodoInput)
	.handler(async ({ context, data }) => {
		const program = Effect.gen(function* () {
			if (!context.session) {
				yield* Effect.fail(new UnauthorizedError());
			}
			yield* Effect.tryPromise({
				try: () =>
					db
						.update(todosTable)
						.set({
							isCompleted: data.isCompleted,
						})
						.where(eq(todosTable.id, data.id)),
				catch: (error) => new Error(`Database error: ${error}`),
			});
		});
		return Effect.runPromise(program);
	});
