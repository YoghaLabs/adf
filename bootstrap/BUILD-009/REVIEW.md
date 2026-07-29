# BUILD-009 Architecture Review

## Checklist

- [ ] CLI only wraps PackageManager
- [ ] No hardcoded package catalogs in RuntimeEngine
- [ ] Circular deps rejected
- [ ] Lockfile pins versions
- [ ] Tests green

```bash
cd adf-core
python -m pytest -q
python adf.py search demo --root ..
python adf.py install demo-template --root ..
python adf.py list --installed --root ..
```
