import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "../utils/tableCreator";
import { usersTable } from "./users";

// Better Auth Database Schema
// https://www.better-auth.com/docs/concepts/database#sessions
export const sessionsTable = createTable("sessions", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.userId],
		references: [usersTable.id],
	}),
}));
