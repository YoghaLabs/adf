# Service Manager

## Purpose

`ServiceManager` registers and lifecycle-manages all ADF services.

## API

| Method | Behavior |
|--------|----------|
| `register(service)` | Register a `BaseService` instance |
| `unregister(name)` | Remove and shut down a service |
| `get(name)` | Return a registered service |
| `list()` | Metadata rows for all services |
| `health()` | Aggregate `ServiceResult` health |
| `boot()` | Boot services + underlying runtime engine |
| `shutdown()` | Shut down services in reverse order |
| `configure_defaults()` | Wire default services to existing engines |

## Typed accessors

`runtime()`, `generator()`, `package()`, `template()`, `plugin()`, `context()`, `knowledge()`, `project()`, `workspace()`.

## Plugin access

```python
services = extension_api.get_service("services")  # ServiceManager
runtime = services.runtime()
```

## Related

- `SERVICE_LAYER.md`
- ADR-008
