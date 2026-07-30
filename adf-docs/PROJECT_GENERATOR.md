# Project Generator

**Build:** BUILD-008  
**Package:** `adf-core/generator`  
**Facade:** `GeneratorManager` (`manager.py`)

## Purpose

Create complete ADF projects from **template manifests**. Generation never hardcodes
project trees — structures come from `adf-templates/*/template.yaml` and `files/`.

## Manager API

| Method | Role |
|--------|------|
| `generate()` | Resolve + write (or dry-run) |
| `validate()` | Template/manifest/variables/deps checks |
| `dry_run()` | Preview folders/files/overwrites/variables |
| `build()` | Prepare a validated builder |
| `write()` | Persist a project |
| `rollback()` | Undo last write journal |

## Built-in project types

`generic` · `python` · `fastapi` · `laravel` · `nextjs` (plus base `foundation`)

## CLI

```bash
python adf.py init my-app --template generic --root ..
python adf.py new my-app --template python --root ..
python adf.py generate my-app --template fastapi --root ..
python adf.py dry-run my-app --template nextjs --root ..
python adf.py validate my-app --template laravel --root ..
```
