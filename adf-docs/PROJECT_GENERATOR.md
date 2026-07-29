# Project Generator

**Build:** BUILD-008  
**Package:** `adf-core/generator`  
**Facade:** `GeneratorManager`

## Purpose

Generate new ADF projects by combining locked-folder scaffolding with the
Template Engine (`TemplateManager`).

## Flow

1. Validate `ProjectManifest`
2. Guard destination (overwrite protection)
3. Scaffold locked folders + `.adf` + prompts + bootstrap + root docs
4. Render selected template (`foundation` by default)
5. Report progress via `GenerationOutput`

## CLI

```bash
python adf.py init my-app --destination ../ --root ..
python adf.py new my-app --dry-run --root ..
python adf.py generate my-app --validate-only --root ..
python adf.py doctor --root ..
```
