# BUILD-010 Spec

## Deliverables

1. `adf-core/services/` — contracts, ServiceManager, all domain services
2. `adf-core/sdk/` — SDKClient and facades
3. Public package `adf` — `RuntimeService`, `PackageService`, `GeneratorService`, `SDKClient`
4. CLI refactored to Service Layer only
5. Plugin access via ServiceManager (`"services"`)
6. Studio-ready: WorkspaceService, ProjectService, ServiceManager, SDKClient
7. pytest coverage for registration, lifecycle, SDK, CLI, runtime/generator/package/template services
8. Docs: SERVICE_LAYER, SDK_GUIDE, PUBLIC_API, SERVICE_MANAGER, SDK_CLIENT
9. Prompts: service, sdk, api, workspace, project
10. ADR-008 Service Layer Architecture
11. `bootstrap/BUILD-010/` pack
12. Version `0.10.0-alpha`

## Non-goals

- BUILD-011 Marketplace
- ADF Studio GUI implementation
