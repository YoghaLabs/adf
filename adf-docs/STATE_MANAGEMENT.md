# Studio State Management

**SSOT for client state in ADF Studio.** BUILD-013.

## Rules

1. **Zustand** owns UI and presentation caches only.
2. **TanStack Query** owns async fetch lifecycle for SDK calls.
3. **No domain rules** in stores (validation, install policy, channel promotion live in Core services).
4. Stores call **SDK adapters**, never engines or Python packages directly.

## Stores

| Store | Responsibility |
|-------|----------------|
| `WorkspaceStore` | Active workspace id/summary selection |
| `ProjectStore` | Selected project, list filter UI |
| `RuntimeStore` | Last-known runtime status for StatusBar |
| `MarketplaceStore` | Browse query, category filter, featured flag |
| `SettingsStore` | Theme, language, sidebar collapsed, palette open |
| `uiStore` (`stores/index`) | Notification queue, command palette visibility |

## Data flow

```text
Page / Widget
  → useQuery / store action
    → SDK client (RuntimeClient, …)
      → bridge → ServiceEnvelope
        → store patch or query cache
```

## Anti-patterns

- Duplicating PackageManager / ReleaseManager logic in TypeScript
- Writing to filesystem from stores
- Calling CLI subprocesses outside the SDK bridge

## Related

- `STUDIO_ARCHITECTURE.md`
- ADR-008, ADR-011
