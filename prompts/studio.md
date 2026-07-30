# Studio prompt

Use when working on **ADF Studio** (`adf-studio/`).

## Identity

Studio is the Desktop Control Center — **not an IDE**.

## Mandatory path

```text
UI → SDK adapters → Service Layer → ADF Core
```

No business logic in React, Zustand, or Tauri command handlers beyond ferrying envelopes.

## Touchpoints

- Shell: `src/shell/`
- Pages: `src/pages/`
- Stores: `src/stores/`
- SDK: `src/sdk/`
- Docs: `adf-docs/STUDIO_ARCHITECTURE.md`, ADR-011

## Do not

- Reimplement install/update/release policy in TypeScript
- Call engines bypassing services
- Start BUILD-014 from this prompt alone
