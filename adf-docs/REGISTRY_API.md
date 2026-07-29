# Registry API

## RegistryManager

| Method | Role |
|--------|------|
| `list` / `search` / `featured` / `popular` / `newest` / `verified` | Catalog |
| `providers` | Provider status |
| `install` | Delegates to PackageManager |
| `publish` | Local registry publish + index |
| `verify` | Lockfile + security |
| `sync` | Local mirror / incremental |

## Services

- `RegistryService`
- `MarketplaceService`
- `PublisherService`

## SDK

```python
from adf import SDKClient

client = SDKClient()
client.registry().search("demo")
client.marketplace().browse()
client.publisher().list()
```

## CLI

```text
adf search [query] [--mode featured|popular|newest]
adf registry status|providers
adf publish <path>
adf sync [--full]
adf install <id>
adf verify [id]
```
