import { ENV_VARIABLES } from "./config/env.js";
import { connectDb } from "./db/connect-db.js";

async function main(): Promise<void> {
  try {
    const { db, pool } = await connectDb(ENV_VARIABLES.DATABASE_URL);
  } catch (err) {
    console.error("Failed to initialize app", err);
    process.exit(1);
  }
}

main();
