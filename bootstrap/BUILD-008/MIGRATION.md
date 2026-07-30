# BUILD-008 Migration Notes

## From BUILD-007

- Templates remain SSOT for structure; generator only resolves and writes
- Default CLI template is `generic` (inherits `foundation`)

## Refinement note

An earlier BUILD-008 slice used a Python scaffolder for locked folders. The
accepted model (ADR-006) moves that structure into template metadata/`files/`.

## Operator

```bash
python adf-core/adf.py init my-project --template generic --root .
python adf-core/adf.py dry-run my-project --template fastapi --root .
python adf-core/adf.py validate my-project --template python --root .
```

## Non-Migrations

- Do not remove Template Engine
- Do not start BUILD-009
