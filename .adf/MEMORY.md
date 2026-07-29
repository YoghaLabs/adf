# Memory

## Stable Facts

- Locked top-level architecture (ADR-001) — never invent new top-level folders
- Docs are SSOT; no placeholders; cumulative builds only
- Plugin architecture (BUILD-006): Runtime depends on contracts via PluginManager
- Template Engine (BUILD-007): `TemplateManager` + `template.yaml` schema 1.0
- Bootstrap Generator (BUILD-008): `GeneratorManager` is **manifest-driven** (ADR-006)
- Continuity for AI switches: `.adf/HANDOFF.md` + `.adf/ACTIVITY_LOG.md` + resume prompt

## Built-in generation types

`foundation` → `generic` → (`python` → `fastapi`) | `laravel` | `nextjs`

## Recent

- BUILD-008 refined and pushed to `origin/develop` (`b95c89c`)
- Pre-BUILD-009 handoff pack written 2026-07-30
- User preference: do not start next BUILD without explicit master prompt; push develop after builds; architecture review gates often requested
