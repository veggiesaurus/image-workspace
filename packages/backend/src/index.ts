import { getDb } from "./db";
import { usersTable } from "./db/schema";

// Initialise the database connection
process.stdout.write("Connecting to DB...");
const db = await getDb();
if (!db) {
  console.error("Failed to connect");
  process.exit(1);
}
console.log("Connected");

const numUsers = await db.$count(usersTable);

if (!numUsers) {
  console.log("No users found, creating one");
  await db.insert(usersTable).values({ name: "Angus Comrie", email: "angus@idia.ac.za" });
}

const users = await db.select().from(usersTable);
console.log("Getting all users from the database: ", users);
