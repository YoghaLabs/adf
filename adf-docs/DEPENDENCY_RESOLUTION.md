# Dependency Resolution

**Class:** `DependencyResolver`

- Builds a dependency-first install plan
- Detects circular dependencies
- Checks semantic version constraints (`^`, `~`, `>=`, exact, `*`)
- Honors already-installed versions from `adf.lock` when they satisfy constraints
