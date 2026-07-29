# BUILD-008 Architecture Review

## Checklist

- [ ] Generator never hardcodes project trees (ADR-006)
- [ ] Templates declare `.adf` / prompts / bootstrap outputs
- [ ] Dry-run writes nothing
- [ ] Rollback removes journaled files
- [ ] CLI init/new/generate/dry-run/validate documented
- [ ] Tests green

```bash
cd adf-core
python -m pytest -q
python adf.py dry-run demo --template generic --destination %TEMP% --root ..
python adf.py validate demo --template python --destination %TEMP% --root ..
```
