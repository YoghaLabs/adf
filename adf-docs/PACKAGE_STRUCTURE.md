# Package Structure (`adf-core`)

```text
adf-core/
├── adf.py
├── pyproject.toml
├── requirements.txt
├── runtime/     # config, constants, exceptions
├── core/        # state/session/checkpoint managers
├── engine/      # Runtime/Context/Memory/Bootstrap engines
├── registry/    # component registry
├── loader/      # prompt + project loaders
├── parser/      # markdown helpers
├── context/ memory/ bootstrap/  # namespaces reserved for growth
├── shared/ utils/
└── tests/
```

## Why this layout

Matches the BUILD-005 locked implementation map inside `adf-core/` without creating new repository top-level folders.

## Related

- `adf-core/README.md`
- `RUNTIME_ENGINE.md`
