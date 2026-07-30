# Project Explorer

**SSOT for Studio Project Explorer.** BUILD-014.

## Capabilities

Project Tree · Project Cards · Recent · Favorites · Pinned · Archived · Status

## Rules

- Projects are always scoped to the active workspace when loaded
- Filters are presentation-only (`ProjectExplorerStore.filter`)
- Mutations (pin/favorite/archive) must go through Service Layer — Studio only displays

## Files

- `adf-studio/src/features/workspace/pages/ProjectExplorerPage.tsx`
- `adf-studio/src/stores/projectStore.ts`
- `ProjectClient` in `adf-studio/src/sdk/index.ts`
