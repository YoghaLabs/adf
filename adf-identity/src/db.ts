import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { identityDbPath, resolveAdfRoot } from "./paths.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let cached: Database.Database | null = null;

export function openIdentityDb(root?: string): Database.Database {
  if (cached) return cached;
  const dbPath = identityDbPath(root ?? resolveAdfRoot());
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  const schemaPath = path.join(__dirname, "schema.sql");
  if (fs.existsSync(schemaPath)) {
    db.exec(fs.readFileSync(schemaPath, "utf8"));
  }
  cached = db;
  return db;
}

export function resetIdentityDbCache(): void {
  if (cached) {
    cached.close();
    cached = null;
  }
}
