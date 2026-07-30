# Service Layer

## Purpose

The Service Layer is the **only orchestration layer** between consumers (CLI, SDK, ADF Studio, plugins) and Core Engines/Managers.

Engines remain independent. Services wrap existing engines and never duplicate business logic.

## Location

`adf-core/services/`

## Components

| Module | Role |
|--------|------|
| `contracts.py` | `BaseService`, `ServiceMetadata`, `ServiceContext`, `ServiceResult`, `ServiceException`, `ServiceProtocol` |
| `service_manager.py` | Registration and lifecycle |
| `runtime_service.py` | → `RuntimeEngine` |
| `generator_service.py` | → `GeneratorManager` |
| `package_service.py` | → `PackageManager` |
| `template_service.py` | → `TemplateManager` |
| `plugin_service.py` | → `PluginManager` |
| `context_service.py` | → `ContextEngine` |
| `knowledge_service.py` | → `KnowledgeEngine` |
| `project_service.py` | Project identity/state (Studio) |
| `workspace_service.py` | Workspace layout/readiness (Studio) |

## Rules

1. CLI must call services only (never engines).
2. SDK depends on services only.
3. Plugins obtain `ServiceManager` via ExtensionAPI key `"services"`.
4. Studio uses `SDKClient` / `ServiceManager` / `WorkspaceService` / `ProjectService`.

## Related

- `SERVICE_MANAGER.md`
- `SDK_GUIDE.md`
- `PUBLIC_API.md`
- ADR-008
