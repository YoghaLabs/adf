import type { Plugin } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Dev middleware:
 * - /api/auth/* → Better Auth
 * - /adf-identity/invoke → Identity service envelopes
 *
 * Dependencies resolve from `adf-identity/node_modules` (and Studio).
 * Skipped under Vitest.
 */
export function adfIdentityPlugin(): Plugin {
  return {
    name: "adf-identity-layer",
    apply: "serve",
    configureServer(server) {
      if (process.env.VITEST) return;

      process.env.ADF_ROOT = process.env.ADF_ROOT || path.resolve(__dirname, "..");

      let invokeReady: Promise<{
        handleIdentityInvoke: (
          req: import("node:http").IncomingMessage,
          res: import("node:http").ServerResponse,
        ) => Promise<void>;
      }> | null = null;

      let authReady: Promise<{
        handleBetterAuth: (
          req: import("node:http").IncomingMessage,
          res: import("node:http").ServerResponse,
        ) => Promise<void>;
      }> | null = null;

      const loadInvoke = () => {
        if (!invokeReady) {
          const invokePath = path.resolve(__dirname, "../adf-identity/src/invoke.ts");
          invokeReady = server.ssrLoadModule(invokePath).then((mod) => ({
            handleIdentityInvoke: mod.handleIdentityInvoke,
          }));
        }
        return invokeReady;
      };

      const loadAuth = () => {
        if (!authReady) {
          const handlerPath = path.resolve(__dirname, "../adf-identity/src/handler.ts");
          authReady = server.ssrLoadModule(handlerPath).then((mod) => ({
            handleBetterAuth: mod.handleBetterAuth,
          }));
        }
        return authReady;
      };

      server.middlewares.use((req, res, next) => {
        const url = req.url || "";
        if (url.startsWith("/adf-identity/invoke")) {
          void loadInvoke()
            .then((h) => h.handleIdentityInvoke(req, res))
            .catch((err) => {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: String(err) }));
            });
          return;
        }
        if (url.startsWith("/api/auth")) {
          void loadAuth()
            .then((h) => h.handleBetterAuth(req, res))
            .catch((err) => {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: String(err) }));
            });
          return;
        }
        next();
      });
    },
  };
}
