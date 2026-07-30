# Workspace Manager prompt

Use when changing Studio **Workspace Manager** surfaces.

## Hierarchy

Workspace → Projects → Sessions

## Touchpoints

- `features/workspace/pages/WorkspaceExperiencePage.tsx`
- `WorkspaceClient` / `useWorkspaceStore`
- Docs: `WORKSPACE_SYSTEM.md`, ADR-012

## Do not

- Put install/update/session policy in React
- Start BUILD-015 from this prompt alone
