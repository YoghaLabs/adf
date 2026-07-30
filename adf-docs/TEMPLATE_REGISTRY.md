# Template Registry

**Module:** `adf-core/templates/template_registry.py`  
**Class:** `TemplateRegistry`

## API

| Method | Role |
|--------|------|
| `register` | Add a loaded template |
| `unregister` | Remove by name |
| `get` | Fetch by name |
| `list` | Summarize registered templates |
| `discover` | Scan a directory for `template.yaml` packages |

## Runtime Wiring

`RuntimeEngine` constructs `TemplateManager` with search path
`{repo}/adf-templates`, discovers packages, publishes the `templates` service
via `ExtensionAPI`, and registers `templates` on the component `Registry`.
