import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const identityRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(identityRoot, "..");

function loadEnv() {
  for (const file of [path.join(identityRoot, ".env"), path.join(repoRoot, ".env.identity")]) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i <= 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!(k in process.env)) process.env[k] = v;
    }
  }
}

loadEnv();
const url = process.env.ADF_IDENTITY_DATABASE_URL;
if (!url) {
  console.error("ADF_IDENTITY_DATABASE_URL missing");
  process.exit(1);
}
const sql = fs.readFileSync(path.join(identityRoot, "src", "schema.pg.sql"), "utf8");
const pool = new pg.Pool({ connectionString: url });
const client = await pool.connect();
try {
  await client.query(sql);
  console.log("MIGRATE_ADF_OK");
} finally {
  client.release();
  await pool.end();
}
