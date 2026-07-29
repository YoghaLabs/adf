# Public API

## Purpose

Stable Python imports for operators, Studio, and integrations.

## Supported imports

```python
from adf import RuntimeService
from adf import PackageService
from adf import GeneratorService
from adf import SDKClient
from adf import ServiceManager
```

## Package layout

| Path | Role |
|------|------|
| `adf-core/adf/` | Public package (`__init__`, CLI, `__main__`) |
| `adf-core/services/` | Service Layer |
| `adf-core/sdk/` | SDK facades |

## CLI entry

```text
adf = adf.cli:main
python -m adf version
```

## Compatibility

CLI commands return `ServiceResult` envelopes (`ok` + `data`) so Studio and scripts can share one contract.

## Related

- `SERVICE_LAYER.md`
- `SDK_GUIDE.md`
- ADR-008
