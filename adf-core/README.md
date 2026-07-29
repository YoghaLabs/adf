# adf-core

Runtime Engine foundation for the AI Development Framework (BUILD-005).

## Purpose

`adf-core` is the first **executable** ADF package. It implements a minimal Runtime Engine that follows `.adf` documentation (Context Engine, state machine, sessions, checkpoints).

## Status

**Implemented (foundation) in BUILD-005** — Python package with engines, managers, loaders, CLI skeleton, and pytest coverage.

## Layout

```text
adf-core/
├── adf.py              # CLI entry
├── pyproject.toml
├── requirements.txt
├── runtime/            # config, constants, exceptions
├── core/               # State/Session/Checkpoint managers
├── engine/             # Runtime/Context/Memory/Bootstrap engines
├── registry/           # Component registry
├── loader/             # Prompt + project loaders
├── parser/             # Markdown helpers
├── context/ memory/ bootstrap/ shared/ utils/
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

From repo root (with `adf-core` on `PYTHONPATH`):

```bash
python adf-core/adf.py status --root .
```

## CLI commands (skeleton)

| Command | Role |
|---------|------|
| `version` | Package version |
| `doctor` | Layout + SSOT checks |
| `boot` | Minimal boot + session open |
| `status` | Derived/persisted state |
| `context` | Assemble context pack |
| `resume` | Resume skeleton |

## Related docs

- `adf-docs/RUNTIME_ENGINE.md`
- `.adf/CONTEXT_ENGINE.md`
- `bootstrap/BUILD-005/`
- `ROADMAP.md`
