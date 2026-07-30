# BUILD-007 Migration Notes

## From BUILD-006

- Plugin architecture remains; Template Engine is a core package + `templates` service
- `TemplatePlugin` now can list/validate via the published service

## ROADMAP Clarification

Earlier ROADMAP labeled BUILD-007 as “Task & State Machine” and BUILD-009 as
“Template System”. This BUILD’s master prompt **supersedes** that labeling:
BUILD-007 delivers the Template Engine. Later builds will re-home deferred themes.

## Operator Notes

```bash
# Discover foundation template (when running against this repo)
python -c "from pathlib import Path; from templates.engine import TemplateManager; m=TemplateManager(search_paths=[Path('../adf-templates')]); print(m.discover())"
```

## Non-Migrations

- Do not delete plugin packages
- Do not invent a second template syntax
