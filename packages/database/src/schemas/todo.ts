import { relations } from "drizzle-orm";
import { boolean, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createTable } from "../utils/tableCreator";
import { timestamps } from "../utils/timestamps";
import { usersTable } from "./users";

// Todo priority enum
export const todoPriorityEnum = pgEnum("todo_priority", [
	"low",
	"medium",
	"high",
	"urgent",
]);

// Todo status enum
export const todoStatusEnum = pgEnum("todo_status", [
	"pending",
	"in_progress",
	"completed",
	"cancelled",
]);

// Main Todos table
export const todosTable = createTable("todos", {
	id: uuid("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	status: todoStatusEnum("status").notNull().default("pending"),
	priority: todoPriorityEnum("priority").notNull().default("medium"),
	isCompleted: boolean("is_completed").notNull().default(false),
	completedAt: timestamp("completed_at"),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	...timestamps,
});

export const todoRelations = relations(todosTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [todosTable.userId],
		references: [usersTable.id],
	}),
}));
