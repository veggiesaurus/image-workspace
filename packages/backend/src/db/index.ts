import { drizzle } from "drizzle-orm/node-postgres";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema",
});

export async function getDb() {
  const db = drizzle({
    connection: process.env.DATABASE_URL,
    casing: "snake_case",
  });
  try {
    // Proof-of-life check
    await db.execute("select 1");
  } catch (err) {
    console.error(err);
    return undefined;
  }

  return db;
}
