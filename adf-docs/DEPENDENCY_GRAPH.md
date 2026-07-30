# Dependency Graph

**SSOT for Studio Dependency Graph view.** BUILD-015.

## Surface

`/visual/dependency` — projects, packages, plugins with `depends_on`, `imports`,
`loads` edges.

## Data

`DependencyClient.graph()` / `GraphClient.get("dependency")`.

## Rule

Studio never resolves versions or installs — it only draws envelopes.
