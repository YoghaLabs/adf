import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { adfBridgePlugin } from "./vite.bridgePlugin";

export default defineConfig({
  plugins: [react(), adfBridgePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  clearScreen: false,
  server: {
    host: "127.0.0.1",
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      // GA floor (release/GA_GATES.md) — raise only with intentional PR.
      thresholds: {
        lines: 35,
      },
      exclude: [
        "src/test/**",
        "src/**/*.d.ts",
        "vite.config.ts",
        "vite.bridgePlugin.ts",
      ],
    },
  },
});
