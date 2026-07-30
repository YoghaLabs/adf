# Dry Run

**Module:** `adf-core/generator/dry_run.py`  
**CLI:** `adf dry-run`

Dry-run previews:

- folders
- files
- overwrite collisions
- resolved variables
- template inheritance chain

Nothing is written to disk. `GeneratorManager.dry_run()` and `adf dry-run` share
the same planner path.
