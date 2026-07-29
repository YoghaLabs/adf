# BUILD-009 Migration Notes

## From BUILD-008

- Generator/templates remain; APM can distribute additional template/plugin packs
- Local registry lives in `release/apm-registry/` (inside locked `release/`)
- Runtime state under `.adf/apm/` (cache/installed gitignored)

## Operator

```bash
python adf-core/adf.py search --root .
python adf-core/adf.py install demo-core --root .
```

## Non-Migrations

- Do not create a new top-level `packages/` folder outside `adf-core/`
- Do not start BUILD-010
