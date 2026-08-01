import fs from "node:fs";
import path from "node:path";

/** Resolve ADF repo root from this package or env. */
export function resolveAdfRoot(from = process.cwd()): string {
  if (process.env.ADF_ROOT) return path.resolve(process.env.ADF_ROOT);
  let cur = path.resolve(from);
  for (let i = 0; i < 8; i++) {
    if (fs.existsSync(path.join(cur, "adf-core")) && fs.existsSync(path.join(cur, "adf-studio"))) {
      return cur;
    }
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return path.resolve(from, "..");
}

export function identityDataDir(root?: string): string {
  const base = root ?? resolveAdfRoot();
  const dir = path.join(base, ".adf", "local", "identity");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Better Auth owned tables. */
export function betterAuthDbPath(root?: string): string {
  return path.join(identityDataDir(root), "better-auth.sqlite");
}

/** ADF Identity extensions (org/workspace/rbac/audit/tokens). */
export function identityDbPath(root?: string): string {
  return path.join(identityDataDir(root), "adf-identity.sqlite");
}
