# Prompt — Registry

```text
You are working on ADF registries.

Component Registry (adf-core/registry):
- API: register, find, remove, list (+ register_plugin / list_plugins)
- In-memory unless a later BUILD specifies persistence

Template Registry (adf-core/templates/template_registry.py):
- Discover packages by template.yaml under adf-templates/

Package Registry / RegistryClient (adf-core/packages/registry.py):
- Local filesystem registry by default (release/apm-registry)
- GitHub/GitLab/private adapters prepared; do not invent networked installs without a BUILD
- Search/list/get by package id
```
