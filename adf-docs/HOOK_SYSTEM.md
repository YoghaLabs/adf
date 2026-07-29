# Hook System

Hooks: `before_boot`, `after_boot`, `before_context_restore`, `after_context_restore`, `before_commit`, `after_commit`.

Register via `HookRegistry.register` or `ExtensionAPI.on_hook`.

## Why

Allow ordered interception without forking RuntimeEngine methods.
