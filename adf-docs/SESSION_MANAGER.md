# Session Manager

**SSOT for Studio Session Manager.** BUILD-014.

## Capabilities

Session Explorer · Current Session · Recent · Resume · Close · History · Timeline

## Rules

- Sessions belong to **projects** (and thus workspaces)
- Resume/Close call `SessionClient` only — no local session policy
- Timeline is read-only presentation of envelope events

## Files

- `adf-studio/src/features/workspace/pages/SessionManagerPage.tsx`
- `adf-studio/src/stores/sessionStore.ts`
- `SessionClient` SDK adapter
