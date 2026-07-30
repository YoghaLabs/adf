# ADF Studio

Desktop Control Center for the ADF Platform.

**Not an IDE.** Studio orchestrates Workspace, Projects, Marketplace, Templates,
Packages, Knowledge, Runtime, Sessions, Release, and Settings.

## Architecture rule

```text
UI → SDK adapters → Service Layer → ADF Core
```

No business logic inside Studio.

## Stack

- React + TypeScript (Vite)
- Tailwind CSS
- Zustand + TanStack Query
- Tauri desktop scaffold (`src-tauri/`)
- Vitest + React Testing Library

## Develop

```bash
cd adf-studio
npm install
npm run dev
npm test
```

## Version

`0.13.0-alpha` / BUILD-013
