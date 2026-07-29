# Plugin Engine

## Why

ADF must grow without rewriting RuntimeEngine for every feature. Plugins provide composition points bound by contracts.

## Core pieces

| Piece | Role |
|-------|------|
| `contracts/` | BasePlugin, metadata, context, config |
| `plugins/PluginManager` | discover/register/load lifecycle |
| `events/` | EventBus + lifecycle events |
| `hooks/` | before/after extension points |
| `extensions/` | public API for third parties |

## Related

- `PLUGIN_GUIDE.md`
- `EVENT_SYSTEM.md`
- `HOOK_SYSTEM.md`
- `EXTENSION_API.md`
