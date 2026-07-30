# ADF Studio — Tauri Desktop Shell

Tauri packaging scaffold for ADF Studio (BUILD-013).

Frontend: Vite + React (`../`).
Config: `tauri.conf.json`

Full Rust crate wiring is completed when shipping desktop installers
(see `adf-docs/DESKTOP_PACKAGING.md`). Studio UI development and Vitest
run via `npm run dev` / `npm test` without requiring a Rust toolchain.
