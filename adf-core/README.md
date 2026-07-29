# adf-core

Runtime, plugins, and Template Engine for the AI Development Framework.

## Purpose

`adf-core` is the executable ADF package: Runtime Engine (BUILD-005), plugin
architecture (BUILD-006), and Template Engine (BUILD-007).

## Status

**Implemented through BUILD-007** — TemplateManager + YAML manifests.

## Layout

```text
adf-core/
├── adf.py
├── contracts/ interfaces/ plugins/ events/ hooks/ extensions/
├── templates/          # Template Engine (BUILD-007)
├── runtime/ core/ engine/ registry/ loader/ parser/
└── tests/
```

## Quick start

```bash
cd adf-core
python -m pip install -e ".[dev]"
python adf.py version
python adf.py doctor --root ..
python adf.py boot --root ..
python -m pytest
```

## CLI commands

| Command | Role |
|---------|------|
| `version` | Package version |
| `doctor` | Layout + SSOT checks |
| `boot` | Boot + session open |
| `status` | Derived/persisted state |
| `context` | Assemble context pack |
| `resume` | Resume skeleton |
| `plugins …` | Plugin management skeleton |

## Related docs

- `adf-docs/RUNTIME_ENGINE.md`
- `adf-docs/PLUGIN_ENGINE.md`
- `adf-docs/TEMPLATE_ENGINE.md`
