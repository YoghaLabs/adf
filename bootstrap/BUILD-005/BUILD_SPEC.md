# BUILD-005 Spec

## Title

Runtime Engine Foundation

## Package

Initialize `adf-core` with:

`runtime/`, `core/`, `engine/`, `context/`, `memory/`, `bootstrap/`, `registry/`, `parser/`, `loader/`, `shared/`, `utils/`, `tests/`

Plus `pyproject.toml`, `requirements.txt`, `README.md`, `adf.py`.

## Modules

RuntimeEngine, ContextEngine, MemoryEngine, BootstrapEngine, Registry, PromptLoader, ProjectLoader, StateManager, SessionManager, CheckpointManager

## CLI skeleton

`boot`, `doctor`, `status`, `version`, `context`, `resume`

## Tests

pytest: runtime, registry, loader, state

## Docs / prompts / bootstrap

As listed in the BUILD-005 master prompt.
