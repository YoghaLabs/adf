# Prompt — Workspace

```text
You are implementing or using WorkspaceService / SDK workspace().

Describe locked folder presence and bootstrap layout readiness for Studio.
Call through ServiceManager or SDKClient only — never RuntimeEngine from UI/CLI.
```

## Studio Workspace page (BUILD-013+)

When editing `adf-studio` Workspace UI:

- Workspace Selector · Summary · Settings (presentation only)
- Use `WorkspaceClient` / `WorkspaceStore` — no filesystem policy in React
- Docs: `adf-docs/STUDIO_UI.md`, `prompts/studio.md`
