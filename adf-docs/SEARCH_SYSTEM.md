# Search System

**SSOT for Studio Search.** BUILD-014.

## Scopes

Global · Project · Workspace · Command · Package

## Surfaces

- `/search` Search Platform page
- Command Palette quick actions + command/search hits
- Workspace Search dialog

## Rules

- All scopes call `SearchClient` (or workspace.search)
- Navigation from hits is UI routing only
- Marketplace/package install policy remains in Core services

## Files

- `adf-studio/src/features/workspace/pages/SearchPlatformPage.tsx`
- `adf-studio/src/stores/searchStore.ts`
- `adf-studio/src/shell/CommandPalette.tsx`
