# Desktop Packaging (ADF Studio)

**SSOT for packaging ADF Studio as a desktop app.** BUILD-013.

## Preferred host

**Tauri** (Rust shell + webview). Scaffold lives in `adf-studio/src-tauri/`.

## Dev vs ship

| Mode | Command | Notes |
|------|---------|-------|
| Web UI only | `npm run dev` | Vite on port 1420 |
| Tauri dev | `npm run tauri:dev` | Requires Rust toolchain + `@tauri-apps/cli` |
| Bundle | `npm run tauri:build` | Produces OS installers |

BUILD-013 ships the **UI + Tauri scaffold**. Full signed installer pipelines
align with Core distribution (`adf-core/distribution/`) in later UX builds.

## Bridge

Production Studio invokes Core through Tauri commands that wrap the Python SDK /
Service Layer — never by embedding business rules in Rust or React.

## Artifacts (future)

Desktop markers and portable bundles from BUILD-012 distribution can carry Studio
binaries; Studio itself remains a thin client.

## Related

- `adf-docs/DISTRIBUTION.md`
- ADR-010, ADR-011
- `adf-studio/src-tauri/README.md`
