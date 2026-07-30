# ADF Studio Architecture

**SSOT for Studio structure and control-flow.** Version `0.13.0-alpha` / BUILD-013.

## What Studio is

ADF Studio is the **Desktop Control Center** for the ADF Platform.

It is **not** an IDE. It orchestrates Workspace, Projects, AI Sessions, Marketplace,
Templates, Packages, Knowledge, Runtime, Release, and Settings.

## Control flow (mandatory)

```text
UI (React)
  → Studio SDK adapters (TypeScript)
    → ADF Service Layer (Python)
      → ADF Core engines
```

Studio contains **no business logic**. Pages and stores only:

1. Call SDK adapters
2. Hold presentation/UI state
3. Render ServiceEnvelope results

## Package layout

```text
adf-studio/
  src/
    app/           # React entry
    shell/         # ApplicationShell, Sidebar, TopBar, …
    layouts/       # StudioLayout
    pages/         # Route pages
    widgets/       # Dashboard widgets
    features/      # Feature modules (thin)
    components/    # Shared UI primitives
    hooks/         # React Query / UI hooks
    stores/        # Zustand stores
    services/      # Thin facades over SDK (no domain rules)
    sdk/           # Runtime/Generator/Package/Marketplace/Registry/Release clients
    router/        # react-router
    types/         # Shared TS types
    utils/
    assets/
    themes/        # ThemeManager
    styles/
    config/
  src-tauri/       # Tauri desktop scaffold
```

## Frontend runtime

Vite + React + React Router (standard Tauri webview host). Next.js is not used as
the desktop host; routing stays client-side inside the shell.

## Bridge

`src/sdk/bridge.ts` (BUILD-021 L1) tries **live** transport first:

```text
POST /adf-bridge/invoke  →  python -m adf.studio_bridge  →  SDKClient / Service Layer
```

Vite middleware: `adf-studio/vite.bridgePlugin.ts`. Unwired methods and Vitest
fall back to `localFixtureProvider`. TopBar badge shows Live Core vs Demo fixtures.
Future desktop path may also use Tauri `invoke("adf_sdk", …)`.

## Related

- `STUDIO_UI.md`, `STATE_MANAGEMENT.md`, `THEME_SYSTEM.md`, `DESKTOP_PACKAGING.md`
- ADR-011 ADF Studio Architecture
- ADR-008 Service Layer Architecture
