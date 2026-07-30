# Generation Pipeline

1. **Load** template via Template Registry / `ManifestLoader`
2. **Resolve** inheritance + dependencies (`TemplateResolver`)
3. **Validate** template, variables, deps, destination (`GenerationValidator`)
4. **Plan** (optional dry-run) — folders/files/overwrites/variables
5. **Write** rendered files with journaling (`Writer` + filesystem abstraction)
6. **Verify** declared outputs exist
7. **Rollback** on failure (or via `GeneratorManager.rollback()`)

See ADR-006 for why this pipeline is manifest-driven.
