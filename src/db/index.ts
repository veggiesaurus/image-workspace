import { drizzle } from "drizzle-orm/node-postgres";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./src/db/schema.ts",
});

export async function getDb() {
  const db = drizzle({
    connection: process.env.DATABASE_URL,
    casing: "snake_case",
  });
  try {
    await db.execute("select 1");
  } catch (e) {
    console.error(e);
    return undefined;
  }

  return db;
}
