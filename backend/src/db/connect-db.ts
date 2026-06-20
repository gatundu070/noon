import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DatabaseError } from "./error.js";
import { sleep } from "../utils/sleep.js";

export async function connectDb(
  connectionString: string,
): Promise<{ pool: Pool; db: NodePgDatabase }> {
  const pool = new Pool({ connectionString });
  const db = drizzle({ client: pool });

  const MAX_RETRIES = 3;
  for (let r = 1; r <= MAX_RETRIES; r++) {
    try {
      const client = await pool.connect();
      client.release();
      console.log("Database connected successfully");
      return { pool, db };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      if (r === MAX_RETRIES) {
        throw new DatabaseError({
          message,
          isOperational: false,
          statusCode: 500,
          cause: err,
        });
      }

      console.error(
        `Database connection attempt ${r}/${MAX_RETRIES} failed: ${message}`,
      );

      const backOffMs = Math.pow(2, r) * 1000;
      console.error(`Trying again in ${backOffMs / 1000}sec`);
      await sleep(backOffMs);
    }
  }

  throw new DatabaseError({
    message: "Unreachable",
    isOperational: false,
    statusCode: 500,
  });
}
