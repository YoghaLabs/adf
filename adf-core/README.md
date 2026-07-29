# adf-core

Runtime, plugins, templates, and project generator for ADF.

## Status

**Implemented through BUILD-008** — Bootstrap Generator + Template Engine + plugins.

## Quick start

```bash
cd adf-core
python -m pip install -e ".[dev]"
python adf.py version
python adf.py doctor --root ..
python adf.py init demo --destination %TEMP% --dry-run --root ..
python -m pytest
```

## CLI

| Command | Role |
|---------|------|
| `version` / `doctor` / `boot` / `status` | Runtime |
| `context` / `resume` | Context helpers |
| `plugins …` | Plugin skeleton |
| `init` / `new` / `generate` | Project generation |

## Related docs

- `adf-docs/TEMPLATE_ENGINE.md`
- `adf-docs/PROJECT_GENERATOR.md`
- `adf-docs/CLI_GENERATOR.md`
