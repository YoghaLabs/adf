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
  },
});
