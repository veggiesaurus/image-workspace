import { type AnyPgColumn, integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { enumToPgEnum, orderable, RegionType, timestamps, timestampz } from "./helpers.ts";
import { point } from "drizzle-orm/pg-core/columns/point";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  mostRecentWorkspaceId: uuid().references((): AnyPgColumn => workspacesTable.id, { onDelete: "set null" }),
  ...timestamps,
});

const owners = {
  createdBy: uuid()
    .notNull()
    .references(() => usersTable.id),
  updatedBy: uuid().references(() => usersTable.id),
};

export const workspacesTable = pgTable("workspaces", {
  id: uuid().primaryKey().defaultRandom(),
  label: text().notNull(),
  ...timestamps,
  ...owners,
});

export const filesTable = pgTable("files", {
  id: uuid().primaryKey().defaultRandom(),
  dimensions: integer().array().notNull(),
  path: text().notNull(),
  fileModifiedAt: timestampz(),
  spatialReferenceId: uuid().references((): AnyPgColumn => filesTable.id, { onDelete: "set null" }),
  workspaceId: uuid()
    .notNull()
    .references(() => workspacesTable.id, { onDelete: "cascade" }),
  ...orderable,
  ...timestamps,
  ...owners,
});

export const regionEnum = pgEnum("regionType", enumToPgEnum(RegionType));
export const regionsTable = pgTable("regions", {
  id: uuid().primaryKey().defaultRandom(),
  label: text(),
  type: regionEnum().notNull(),
  controlPoints: point().array(),
  fileId: uuid()
    .notNull()
    .references(() => filesTable.id, { onDelete: "cascade" }),
  workspaceId: uuid()
    .notNull()
    .references(() => workspacesTable.id, { onDelete: "cascade" }),
  ...orderable,
  ...timestamps,
  ...owners,
});
