# Package Manager

**Build:** BUILD-009  
**Package:** `adf-core/packages`  
**Facade:** `PackageManager`

## Purpose

APM installs ADF packages (templates, plugins, generators, prompt/bootstrap/docs packs,
extensions, themes) from a registry. Nothing is hardcoded — packages are declared via
``package.yaml``.

## API

| Method | Role |
|--------|------|
| `install` | Resolve deps + install |
| `remove` | Uninstall + update lock |
| `update` / `upgrade` | Refresh from registry |
| `search` / `list` | Registry discovery |
| `validate` / `verify` | Manifest + lock integrity |
| `cache_stats` / `cache_clear` | Local cache |

## Layout

| Path | Role |
|------|------|
| `release/apm-registry/` | Local registry (seed packages) |
| `.adf/apm/installed/` | Installed packages |
| `.adf/apm/cache/` | Download/metadata/package cache |
| `adf.lock` | Version pin + dependency tree |

## CLI

```bash
python adf.py search demo --root ..
python adf.py install demo-template --root ..
python adf.py list --installed --root ..
python adf.py verify --root ..
python adf.py cache stats --root ..
```
