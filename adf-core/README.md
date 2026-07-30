# adf-core

ADF Runtime Engine with **Service Layer** and **Public SDK**.

## Packages

| Package | Role |
|---------|------|
| `adf` | Public API + CLI (`adf.cli:main`) |
| `services` | Orchestration layer |
| `sdk` | SDKClient facades |
| `engine` / `packages` / `generator` / `templates` / `plugins` | Independent engines |

## Quick start

```bash
pip install -e ".[dev]"
python -m adf version
pytest
```

```python
from adf import SDKClient

client = SDKClient()
client.boot()
print(client.runtime().version())
```

## Version

`0.10.0-alpha` / BUILD-010
