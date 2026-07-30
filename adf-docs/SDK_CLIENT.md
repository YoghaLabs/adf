# SDK Client

## Purpose

`SDKClient` is the primary programmatic entrypoint for ADF.

## Responsibilities

| Method | Description |
|--------|-------------|
| `boot()` | Configure defaults and boot services |
| `shutdown()` | Shut down services |
| `runtime()` | `RuntimeAPI` |
| `packages()` | `PackageAPI` |
| `generator()` | `GeneratorAPI` |
| `templates()` | `TemplateAPI` |
| `plugins()` | `PluginAPI` |
| `projects()` | `ProjectAPI` |
| `workspace()` | `WorkspaceAPI` |

## Studio readiness

ADF Studio should prefer:

```python
from adf import SDKClient

client = SDKClient(repo_root)
client.boot()
client.workspace().readiness()
client.projects().info()
```

## Related

- `SDK_GUIDE.md`
- ADR-008
