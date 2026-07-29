# BUILD-006 Architecture Review

## Checklist

- [ ] No new top-level repo folders
- [ ] RuntimeEngine uses PluginManager/factories only
- [ ] Contracts sufficient for third-party plugins
- [ ] Events/hooks execute in tests
- [ ] `pytest` passes in `adf-core`
- [ ] VERSION `0.6.0-alpha` synced
- [ ] BUILD-007 not started

## Suggested Commands

```bash
cd adf-core && python -m pytest -q
python adf-core/adf.py plugins list --root .
git diff --stat 1e59f41...HEAD
```
