# Prompt — Template Engine

```text
You are working on the ADF Template Engine (adf-core/templates).

Rules:
- All project generation must go through TemplateManager
- Templates live under adf-templates/ with template.yaml manifests
- Use VariableResolver for {{placeholders}} — do not invent alternate syntax
- Keep inheritance foundation-only (parent then child); no complex graph yet
- Never write placeholders or empty generated docs
- Depend on contracts/facades; do not bypass into RuntimeEngine internals
```
