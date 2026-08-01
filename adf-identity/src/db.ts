import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { identityDatabaseUrl, loadIdentityEnv } from "./config.js";

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pool: pg.Pool | null = null;
let migrated = false;

export function getIdentityPool(): pg.Pool {
  loadIdentityEnv();
  if (!pool) {
    pool = new Pool({
      connectionString: identityDatabaseUrl(),
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 15_000,
    });
  }
  return pool;
}

export async function migrateIdentitySchema(): Promise<void> {
  if (migrated) return;
  const client = await getIdentityPool().connect();
  try {
    const schemaPath = path.join(__dirname, "schema.pg.sql");
    const sql = fs.readFileSync(schemaPath, "utf8");
    await client.query(sql);
    migrated = true;
  } finally {
    client.release();
  }
}

export async function queryIdentity<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<pg.QueryResult<T>> {
  await migrateIdentitySchema();
  return getIdentityPool().query<T>(text, params);
}

export async function resetIdentityPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    migrated = false;
  }
}

/** @deprecated Use getIdentityPool / queryIdentity — PostgreSQL only. */
export function openIdentityDb(): never {
  throw new Error("SQLite identity DB removed — use PostgreSQL adf_identity via queryIdentity()");
}
