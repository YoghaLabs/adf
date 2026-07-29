# Runtime Engine

## Why

BUILD-001…004 defined how ADF should think. BUILD-005 makes a **runnable** foundation in `adf-core` so Studio and later tools have an executable core.

## What ships in BUILD-005

- Python package under `adf-core/`
- Engines: Runtime, Context, Memory, Bootstrap
- Managers: State, Session, Checkpoint
- Registry + markdown loaders
- CLI skeleton + pytest

## Docs vs code

Markdown under `.adf/` remains process SSOT. Code must follow those contracts and may store ephemeral machine state under `.adf/local/` (gitignored).

## Related

- `ENGINE_OVERVIEW.md`
- `PACKAGE_STRUCTURE.md`
- `CLI_GUIDE.md`
- `adf-core/README.md`
