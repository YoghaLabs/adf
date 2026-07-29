# BUILD-008 Migration Notes

## From BUILD-007

- Templates remain the generation source; generator only scaffolds + invokes TemplateManager
- `foundation` template is the default for `adf init` / `adf new`

## Operator

```bash
python adf-core/adf.py init my-project --destination . --root .
python adf-core/adf.py doctor --root .
```

## Non-Migrations

- Do not remove Template Engine
- Do not start BUILD-009 in this pack
