import { text, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "../utils/tableCreator";

// Better Auth Database Schema
// https://www.better-auth.com/docs/concepts/database#core-schema
export const verificationsTable = createTable("verifications", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});
