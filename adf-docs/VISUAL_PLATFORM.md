# Visual Intelligence Platform

**SSOT for ADF Studio Visual Intelligence.** BUILD-015 / `0.15.0-alpha`.

## Purpose

Interactive **read-only** visualization of relationships across Workspace, Projects,
Knowledge, Dependencies, Sessions, Runtime, Packages, Plugins, and Releases.

## Rules

1. Graphs are **read-only** presentation of Service Layer envelopes
2. Visualization is separated from SDK transport (`GraphRenderer` / React Flow)
3. Rendering is UI-only — no domain policy, install, or mutation logic
4. Business logic remains in Core services

## Modules

Knowledge · Dependency · Project · Workspace · Context · Session · Runtime ·
Package · Plugin · Release

## Stack

- `@xyflow/react` (React Flow)
- Graph engine under `adf-studio/src/features/visual/graphs/`
- SDK: `KnowledgeClient`, `DependencyClient`, `GraphClient`, `VisualizationClient`

## Related

- ADR-013 Visual Intelligence Architecture
- `GRAPH_ENGINE.md`, `KNOWLEDGE_GRAPH.md`, `DEPENDENCY_GRAPH.md`, `VISUAL_GUIDE.md`
