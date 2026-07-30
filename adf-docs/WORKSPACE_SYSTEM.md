# Workspace System

**SSOT for ADF Studio Workspace Experience.** BUILD-014 / `0.14.0-alpha`.

## Hierarchy

```text
Workspace
  └── Projects
        └── Sessions
```

Workspace is the **top-level object** for every user. Projects belong to a
workspace. Sessions belong to a project (and therefore a workspace).

## Surfaces

| Surface | Role |
|---------|------|
| Workspace Manager | List / switch workspaces |
| Workspace Switcher | Active workspace control |
| Workspace Profile | Identity + path + counts |
| Workspace Settings | Presentation of workspace prefs |
| Workspace Statistics | Counts via SDK |
| Workspace Activity | Activity feed scoped to workspace |
| Favorite Projects | Favorites via SDK |
| Workspace Search | Scoped search |

## Control flow

```text
UI → WorkspaceClient / related clients → Service Layer → Core
```

No business logic in Studio.

## Related

- ADR-012 Workspace Experience Architecture
- `PROJECT_EXPLORER.md`, `SESSION_MANAGER.md`, `ACTIVITY_FEED.md`, `SEARCH_SYSTEM.md`
