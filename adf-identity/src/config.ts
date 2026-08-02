import fs from "node:fs";
import path from "node:path";
import { resolveAdfRoot } from "./paths.js";

/** Load optional `.env` files without committing secrets. */
export function loadIdentityEnv(): void {
  const root = resolveAdfRoot();
  const candidates = [
    path.join(root, "adf-identity", ".env"),
    path.join(root, "adf-studio", ".env.identity"),
    path.join(root, ".env.identity"),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}

loadIdentityEnv();

/**
 * Identity DB connection string.
 * Domain: PostgreSQL database `adf_identity` (never Core / runtime tables).
 */
export function identityDatabaseUrl(): string {
  const url = process.env.ADF_IDENTITY_DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "ADF_IDENTITY_DATABASE_URL is required (PostgreSQL 17 → database adf_identity)",
    );
  }
  return url;
}

/** Public-safe DB label for Studio UI — never expose host/port/credentials. */
export function identityDbPublicLabel(): string {
  try {
    const u = new URL(identityDatabaseUrl());
    const name = u.pathname.replace(/^\//, "") || "adf_identity";
    return name;
  } catch {
    return "adf_identity";
  }
}

/** @deprecated Use identityDbPublicLabel() — host/port must not reach the UI. */
export function identityDbHostLabel(): string {
  return identityDbPublicLabel();
}
