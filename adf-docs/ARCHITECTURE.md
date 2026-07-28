# Architecture

## Locked Top-Level Structure

```text
adf/
├── .adf/              # Operating context (state, contracts, memory)
├── adf-core/          # Runtime core (from BUILD-005)
├── adf-studio/        # GUI (from BUILD-013)
├── adf-docs/          # Human documentation
├── adf-examples/      # Examples (content in BUILD-010)
├── adf-templates/     # Templates (system in BUILD-009)
├── bootstrap/         # Boot contracts & sequence
├── prompts/           # Prompt library
├── testing/           # Test harness (BUILD-011)
├── tools/             # Utilities (BUILD-003/008)
└── release/           # Release pipeline (BUILD-012+)
```

This layout is **locked**. Do not rename these folders. Do not add new top-level folders during normal builds.

## Architectural Layers

### 1. Operating Layer (`.adf/`)

Source of truth for identity, DNA, live state, AI contract, boot procedure, budgets, indexes, decisions, todos, memory, and session notes.

### 2. Process Layer (`bootstrap/`, `prompts/`)

How operators enter the system and which prompt modes they use. Automation comes later; contracts exist now.

### 3. Knowledge Layer (`adf-docs/`, root governance files)

Human-readable product and contribution docs, roadmap, changelog, license, version.

### 4. Runtime Layer (`adf-core/`, `tools/`, `testing/`)

Executable behavior and verification. Mostly deferred after BUILD-001.

### 5. Experience Layer (`adf-studio/`)

GUI over state, context, and build runners. Deferred to BUILD-013+.

### 6. Distribution Layer (`release/`, `adf-templates/`, `adf-examples/`)

How ADF is packaged, templated, and taught by example.

## Boundary Rules

| Rule | Rationale |
|------|-----------|
| No top-level sprawl | Keeps handoff and tooling stable |
| Docs are not disposable | Continuity depends on them |
| State is file-based | Chat is ephemeral; `.adf` is durable |
| Packages own one job | Prevents core/studio/docs entanglement |

## Evolution Model

Architecture evolves **inside** locked packages through cumulative BUILDs. A future architecture-change BUILD would be required to alter top-level names — and that is intentionally rare.

## Related Contracts

- `.adf/PROJECT_DNA.md` — philosophy
- `.adf/AI_CONTRACT.md` — operator rules
- `bootstrap/BUILD_CONTRACT.md` — completion gates
- `ROADMAP.md` — sequencing
