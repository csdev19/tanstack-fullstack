import { relations } from "drizzle-orm";
import { boolean, text, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "../utils/tableCreator";
import { accountsTable } from "./accounts";
import { sessionsTable } from "./sessions";
import { todosTable } from "./todo";

// Better Auth Database Schema
// https://www.better-auth.com/docs/concepts/database#core-schema
export const usersTable = createTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
	accounts: many(accountsTable),
	sessions: many(sessionsTable),
	todos: many(todosTable),
}));
