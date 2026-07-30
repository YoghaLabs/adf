# BUILD-009 Spec

## Create

- `adf-core/packages/` modules from mission list
- Local registry under `release/apm-registry/`
- `adf.lock` support
- Docs, ADR-007, prompts, bootstrap pack
- CLI: install/remove/update/search/list/verify/cache

## Implement

- PackageManager API
- DependencyResolver + semver
- RegistryClient (local + remote-ready)
- Cache + lockfile + installer
- pytest coverage
