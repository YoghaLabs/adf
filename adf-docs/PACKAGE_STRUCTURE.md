# Package Structure (`adf-core`)

```text
adf-core/
├── adf/           # Public package + CLI (adf.cli)
├── services/      # Service Layer (BUILD-010)
├── sdk/           # Public SDK facades (BUILD-010)
├── pyproject.toml
├── runtime/       # config, constants, exceptions
├── core/          # state/session/checkpoint managers
├── engine/        # Runtime/Context/Memory/Bootstrap/Knowledge engines
├── packages/      # APM (BUILD-009)
├── generator/     # Bootstrap generator (BUILD-008)
├── templates/     # Template engine (BUILD-007)
├── plugins/ events/ hooks/ extensions/
├── registry/ loader/ parser/
├── context/ memory/ bootstrap/
├── shared/ utils/ contracts/ interfaces/
└── tests/
```

## Why this layout

Engines stay independent under their packages. `services/` orchestrates them.
`sdk/` and `adf/` are the public surfaces for Studio and integrations.

## Related

- `adf-core/README.md`
- `SERVICE_LAYER.md`
- `RUNTIME_ENGINE.md`
