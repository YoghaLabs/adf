# CLI Guide

## Entry

```bash
cd adf-core
python adf.py version
python adf.py doctor --root ..
python adf.py init my-app --template generic --destination .. --root ..
python adf.py dry-run my-app --template python --destination .. --root ..
python adf.py validate my-app --template fastapi --destination .. --root ..
```

## Commands

| Command | Purpose |
|---------|---------|
| `version` | Package version |
| `doctor` | Layout + SSOT + plugin/template checks |
| `boot` / `status` / `context` / `resume` | Runtime helpers |
| `plugins …` | Plugin management skeleton |
| `init` / `new` | Generate a new ADF project |
| `generate` | Generate with optional `--validate-only` |
| `dry-run` | Preview generation (no writes) |
| `validate` | Validate template/manifest/variables |

## Generator flags

`--destination`, `--template`, `--dry-run`, `--overwrite`, `--author`, `--project-version`, `--root`

Default template: `generic`
