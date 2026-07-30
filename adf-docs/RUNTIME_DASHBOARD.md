# Runtime Dashboard

**SSOT for ADF Studio AI Runtime Dashboard.** BUILD-016 / `0.16.0-alpha`.

## Purpose

Read-only observability over AI execution: session, workspace, project, engine
health, prompts, context, plugins, packages, tokens, jobs, and logs.

## Rule

```text
UI → SDK → Service Layer → Core Runtime
```

Studio does **not** own runtime state. Dashboard is presentation only.

## Surfaces

- `/runtime` — AI Runtime Dashboard
- Overview cards, metrics, timelines, logs, jobs, inspectors, diagnostics

## Related

- `OBSERVABILITY.md`, `METRICS_SYSTEM.md`, `LOGGING_SYSTEM.md`, `DIAGNOSTICS.md`
- ADR-014 AI Observability Architecture
