# Prompt — Registry

```text
You are working on ADF registries.

Component Registry (adf-core/registry):
- API: register, find, remove, list (+ register_plugin / list_plugins)
- Fail clearly on duplicates/missing keys
- In-memory unless a later BUILD specifies persistence

Template Registry (adf-core/templates/template_registry.py):
- API: register, unregister, get, list, discover
- Discover packages by template.yaml under adf-templates/
- Used by TemplateManager; do not duplicate discovery logic elsewhere
```
