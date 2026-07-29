# Memory

## Stable Facts

- Locked architecture + ADR rules still apply.
- Context Engine specs (BUILD-004) + Runtime foundation (BUILD-005) remain.
- **BUILD-006:** future capabilities ship as plugins; RuntimeEngine depends on contracts/PluginManager, not concrete plugin classes.
- Third-party plugins must use `extensions.ExtensionAPI` / `contracts` only.
- CLI: `adf.py plugins list|info|enable|disable`.

## Watch Items

- Do not start BUILD-007 before Architecture Review of BUILD-006.
