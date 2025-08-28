import { pgTableCreator } from "drizzle-orm/pg-core";
import { TABLE_PREFIX } from "../constant";

export const createTable = pgTableCreator((name) => `${TABLE_PREFIX}_${name}`);
