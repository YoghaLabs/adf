# BUILD-006 Spec

## Create under `adf-core/`

`plugins/`, `interfaces/`, `contracts/`, `events/`, `hooks/`, `extensions/`

## Implement

- PluginManager lifecycle APIs
- BasePlugin / AbstractPlugin / metadata / context / config
- Built-in plugins (context, prompt, template, generator, audit, studio, testing, bootstrap)
- EventBus + lifecycle events
- HookRegistry + before/after hooks
- ExtensionAPI public surface
- RuntimeEngine via PluginManager
- Registry plugin registration
- CLI plugins skeleton
- pytest coverage
