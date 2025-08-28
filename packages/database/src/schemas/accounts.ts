import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "../utils/tableCreator";
import { usersTable } from "./users";

// Better Auth Database Schema
// https://www.better-auth.com/docs/concepts/database#core-schema
export const accountsTable = createTable("accounts", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const accountsRelations = relations(accountsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [accountsTable.userId],
		references: [usersTable.id],
	}),
}));
