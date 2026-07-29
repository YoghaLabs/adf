# BUILD-006 Migration Notes

## From BUILD-005

- RuntimeEngine still owns core managers/engines
- New capabilities should be plugins, not hard-wired into RuntimeEngine
- Import plugins via `contracts` / `extensions` — not private engine modules

## Operator Changes

```bash
python adf-core/adf.py plugins list --root .
python adf-core/adf.py boot --root .   # loads enabled plugins
```

## Non-Migrations

- Do not delete BUILD-005 modules
- Do not create top-level `plugins/` outside `adf-core/`
