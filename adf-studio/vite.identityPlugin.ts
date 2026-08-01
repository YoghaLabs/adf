import type { Plugin } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Dev middleware:
 * - /api/auth/* → Better Auth
 * - /adf-identity/invoke → Identity service envelopes
 *
 * Identity Layer lives outside Core Runtime (ADR-019).
 * Skipped under Vitest.
 */
export function adfIdentityPlugin(): Plugin {
  return {
    name: "adf-identity-layer",
    apply: "serve",
    configureServer(server) {
      if (process.env.VITEST) return;

      let ready: Promise<{
        handleBetterAuth: (
          req: import("node:http").IncomingMessage,
          res: import("node:http").ServerResponse,
        ) => Promise<void>;
        handleIdentityInvoke: (
          req: import("node:http").IncomingMessage,
          res: import("node:http").ServerResponse,
        ) => Promise<void>;
      }> | null = null;

      const load = () => {
        if (!ready) {
          process.env.ADF_ROOT = process.env.ADF_ROOT || path.resolve(__dirname, "..");
          const identityPath = path.resolve(__dirname, "../adf-identity/src/handler.ts");
          ready = server.ssrLoadModule(identityPath).then((mod) => ({
            handleBetterAuth: mod.handleBetterAuth,
            handleIdentityInvoke: mod.handleIdentityInvoke,
          }));
        }
        return ready;
      };

      server.middlewares.use((req, res, next) => {
        const url = req.url || "";
        if (!url.startsWith("/api/auth") && !url.startsWith("/adf-identity/invoke")) {
          next();
          return;
        }
        void load()
          .then(async (handlers) => {
            if (url.startsWith("/api/auth")) {
              await handlers.handleBetterAuth(req, res);
              return;
            }
            await handlers.handleIdentityInvoke(req, res);
          })
          .catch((err) => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          });
      });
    },
  };
}
