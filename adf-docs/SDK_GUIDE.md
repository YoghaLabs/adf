# SDK Guide

## Purpose

The Public SDK (`adf-core/sdk/`) is a thin, stable facade over the Service Layer for Python integrations and ADF Studio.

## Install / path

With `adf-core` on `PYTHONPATH` (or installed editable):

```python
from adf import SDKClient

client = SDKClient()  # auto-detects repo root
client.boot()
print(client.runtime().version())
client.shutdown()
```

## Modules

| Module | Facade |
|--------|--------|
| `client.py` | `SDKClient` |
| `runtime.py` | Runtime operations |
| `generator.py` | Project generation |
| `package.py` | APM |
| `template.py` | Templates |
| `plugin.py` | Plugins |
| `project.py` | Project identity |
| `workspace.py` | Workspace readiness |
| `services.py` | Advanced `ServiceManager` access |

## Rules

- SDK never imports engines for public callers.
- All operations return JSON-serializable dict envelopes (`ok`, `data`, …).

## Related

- `SDK_CLIENT.md`
- `PUBLIC_API.md`
- `SERVICE_LAYER.md`
