# BUILD-007 Architecture Review

## Checklist

- [ ] TemplateManager is the only public generation entry for templates
- [ ] Manifest schema is documented and versioned
- [ ] No RuntimeEngine concrete template class instantiation beyond manager
- [ ] PyYAML dependency justified and pinned in pyproject/requirements
- [ ] Tests green on develop

## Suggested Commands

```bash
cd adf-core
python -m pytest -q
python -c "from templates.engine import TemplateManager; print(TemplateManager().manifest_spec()[:40])"
```

Do not start BUILD-009 from this review.
