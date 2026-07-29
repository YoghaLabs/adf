# Extension API

Public surface for plugins:

- `contracts` (BasePlugin, PluginContext, …)
- `extensions.ExtensionAPI` (events, hooks, plugin manager, published services)

## Rule

Never import `engine.runtime_engine.RuntimeEngine` from third-party plugins.
