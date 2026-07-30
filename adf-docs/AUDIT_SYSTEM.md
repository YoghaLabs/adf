# Audit System

**Build:** BUILD-019

## Properties

- Audit trail of events
- Search + export envelopes
- **`immutable: true`** on every event — historical records are not rewritten from Studio

## Path

```
UI → AuditClient → Service Layer → Core
```

Core owns retention and real export; Studio displays fixtures/envelopes.
