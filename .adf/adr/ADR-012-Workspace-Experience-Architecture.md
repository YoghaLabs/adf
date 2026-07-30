# ADR-012 — Workspace Experience Architecture

## Title

Workspace Experience Architecture

## Status

Accepted

## Context

Studio Core (BUILD-013) provided a Control Center shell. Users need a primary
entry point that can host multiple workspaces, projects, and AI sessions without
embedding domain policy in the GUI.

## Decision

1. **Workspace is the top-level object.** Every Studio user enters through a
   workspace. Profile, settings, statistics, favorites, and activity are
   workspace-scoped presentation surfaces.
2. **Projects belong to Workspaces.** Project Explorer lists/trees/cards are
   always loaded relative to the active workspace via `ProjectClient`.
3. **Sessions belong to Projects.** Session Manager resume/close/history/timeline
   operate on session envelopes that reference `projectId` (and `workspaceId` for
   filtering). Studio never invents session ownership rules.
4. Search and Activity are cross-cutting presentation features that call
   `SearchClient` / `ActivityClient` only.

## Consequences

- Clear hierarchy for Dashboard widgets and navigation
- Multi-workspace switching without Core policy duplication
- Fixtures remain temporary until Service Layer workspace APIs are fully wired

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Project as top-level object | Breaks multi-repo / multi-tenant workspace model |
| Sessions owned by workspace only | Loses project context required by AI restore |
| Local IndexedDB as source of truth | Diverges from Service Layer / Core SSOT |

## References

- `adf-docs/WORKSPACE_SYSTEM.md`
- ADR-011 ADF Studio Architecture
- BUILD-014

## Future Impact

BUILD-015 Knowledge Graph and BUILD-016 Runtime Monitor can attach under the
same workspace → project → session hierarchy without redesign.
