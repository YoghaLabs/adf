# Prompt — Package Manager

```text
You are working on the ADF Package Manager (adf-core/packages).

Rules:
- All installable artifacts are packages with package.yaml
- Public API is PackageManager; CLI only wraps it
- No hardcoded package catalogs in RuntimeEngine
- Use DependencyResolver + semver constraints
- Persist pins in adf.lock; cache under .adf/apm/cache
- Local registry: release/apm-registry/
```
