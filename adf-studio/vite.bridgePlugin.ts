import type { Plugin } from "vite";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveAdfRoot(): string {
  return path.resolve(__dirname, "..");
}

function resolvePython(adfRoot: string): string {
  if (process.env.ADF_PYTHON) return process.env.ADF_PYTHON;
  const win = path.join(adfRoot, ".venv", "Scripts", "python.exe");
  const nix = path.join(adfRoot, ".venv", "bin", "python");
  if (fs.existsSync(win)) return win;
  if (fs.existsSync(nix)) return nix;
  return process.platform === "win32" ? "python" : "python3";
}

function runBridge(
  python: string,
  adfRoot: string,
  body: string,
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(python, ["-m", "adf.studio_bridge", "--root", adfRoot, body], {
      cwd: adfRoot,
      env: {
        ...process.env,
        PYTHONPATH: [adfRoot, path.join(adfRoot, "adf-core"), process.env.PYTHONPATH || ""]
          .filter(Boolean)
          .join(path.delimiter),
      },
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("close", (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
}

/** Dev-server middleware: POST /adf-bridge/invoke → python -m adf.studio_bridge */
export function adfBridgePlugin(): Plugin {
  return {
    name: "adf-live-bridge",
    configureServer(server) {
      server.middlewares.use("/adf-bridge/invoke", (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }
        const chunks: Buffer[] = [];
        req.on("data", (c) => chunks.push(Buffer.from(c)));
        req.on("end", () => {
          void (async () => {
            const adfRoot = resolveAdfRoot();
            const python = resolvePython(adfRoot);
            const raw = Buffer.concat(chunks).toString("utf8") || "{}";
            const { code, stdout, stderr } = await runBridge(python, adfRoot, raw);
            const text = stdout.trim() || JSON.stringify({
              ok: false,
              data: { bridge: "live" },
              error: stderr.trim() || `bridge exit ${code}`,
            });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(text);
          })();
        });
      });
    },
  };
}
