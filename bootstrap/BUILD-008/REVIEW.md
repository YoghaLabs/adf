# BUILD-008 Architecture Review

## Checklist

- [ ] Generator depends on TemplateManager (not ad-hoc copy)
- [ ] Dry-run never writes project trees
- [ ] Overwrite protection default-safe
- [ ] CLI commands documented
- [ ] Tests green

```bash
cd adf-core
python -m pytest -q
python adf.py init demo --destination %TEMP% --dry-run --root ..
```
