# Event System

Lifecycle events: `on_boot`, `on_resume`, `on_load`, `on_save`, `on_commit`, `on_handoff`.

Use `EventBus.subscribe` / `publish`. See `adf-core/events/bus.py`.

## Why

Decouple side effects (logging, audits, studio notifications) from core boot flow.
