# BUILD-010 Migration

## From BUILD-009

| Before | After |
|--------|-------|
| CLI imported `RuntimeEngine`, `PackageManager`, `GeneratorManager` | CLI uses `ServiceManager` + services |
| `adf.py` single module | `adf/` package (`cli.py`, public exports) |
| Public surface = engines/managers | Public surface = services + `SDKClient` |
| ADR-007: PackageManager as install API | Still true inside engines; external callers use `PackageService` |

## Breaking notes

- CLI JSON responses wrap payloads in `ServiceResult` (`ok`, `data`).
- Entrypoint script is `adf.cli:main` (not `adf:main`).

## Operator action

Reinstall / re-link `adf-core` editable if the console script was installed previously:

```text
pip install -e adf-core
```
