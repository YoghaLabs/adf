# Prompts

Prompt library for operating ADF across sessions.

## Contents

| File | Use when |
|------|----------|
| `plugin.md`, `extension.md`, `event.md`, `hook.md`, `contract.md` | Plugin architecture prompts |
| `template.md`, `manifest.md`, `variables.md`, `renderer.md`, `registry.md` | Template Engine prompts |
| `generator.md`, `scaffold.md`, `project.md`, `filesystem.md`, `bootstrap-generator.md`, `dry-run.md` | Bootstrap Generator prompts |
| `package.md`, `registry.md`, `dependency.md`, `install.md`, `update.md` | Package Manager prompts |
| `service.md`, `sdk.md`, `api.md`, `workspace.md`, `project.md` | Service Layer / SDK / Studio prompts |
| `studio.md`, `dashboard.md`, `layout.md`, `ui.md` | ADF Studio Control Center prompts |
| `workspace-manager.md`, `project-explorer.md`, `session-manager.md`, `activity-feed.md`, `search.md` | Workspace Experience prompts |
| `marketplace.md`, `publisher.md`, `security.md`, `verification.md` | Marketplace / registry security prompts |
| `distribution.md`, `installer.md`, `updater.md`, `release.md`, `rollback.md` | Distribution / release prompts |
| `runtime.md`, `engine.md`, `cli.md`, `loader.md` | Runtime Engine implementation prompts |
| `restore.md`, `context-engine.md`, `session.md`, `checkpoint.md`, `state.md` | Context Engine / session / state machine |
| `knowledge.md`, `adr.md`, `documentation.md`, `context.md`, `bootstrap.md` | Knowledge-layer / ADR / bootstrap packs |
| `architecture.md`, `planning.md`, `review.md`, `release.md`, `generator.md` | Expanded operator modes |
| `build.md`, `resume.md`, `handoff.md`, `audit.md` | Core operator prompts |

## How to Use

1. Complete `.adf/BOOT_SEQUENCE_V2.md` / `RESUME_PROTOCOL.md` first.
2. Copy the relevant prompt into your AI session (or reference the file path).
3. Keep the active BUILD boundary explicit in the conversation.
4. Update state files as the prompt instructs.

## Design Rules

- Prompts must reinforce `AI_CONTRACT.md`, `ARCHITECTURE_RULES.md`, and ADR discipline
- Prompts must not authorize architecture redesign without an ADR + approval
- Prompts must not authorize placeholder files

## Related

- `bootstrap/BOOT_SEQUENCE.md`
- `.adf/AI_RUNTIME.md`
- `.adf/CONTEXT_GRAPH.md`
- `ROADMAP.md`
