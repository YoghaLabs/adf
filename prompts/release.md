# Prompt — Release

Use when preparing a version identity bump or release notes discipline.

```text
You are preparing release-facing version updates for ADF.

Rules:
- Root VERSION is source of truth for version/build/branch identity
- Update CHANGELOG to match VERSION
- Sync PROJECT_STATE, QUICK_CONTEXT, BUILD_STATUS/HISTORY as needed
- Do not invent packaging tooling beyond what release/ currently supports
- Do not rename folders

Steps:
1. Confirm intended version string (no leading v)
2. Update VERSION
3. Update CHANGELOG heading/notes
4. Sync .adf status snapshots
5. Summarize what is shipping vs deferred
```

## Why

Release mistakes usually start as version/doc desync, not packaging failures.
