# Bootstrap

Bootstrap defines how an ADF repository is brought online and how operators (human or AI) enter a valid working state.

## Contents

| File / path | Purpose |
|-------------|---------|
| `BUILD_CONTRACT.md` | Rules a BUILD must satisfy before it is considered complete |
| `BOOT_SEQUENCE.md` | Ordered steps to boot into the repository safely |
| `BUILD-002/` | BUILD-002 specification pack |
| `BUILD-003/` | BUILD-003 knowledge/ADR specification pack |
| `README.md` | This overview |

## Role in ADF

- **BUILD-001:** Shared bootstrap documentation and contracts
- **BUILD-002+:** Per-BUILD specification packs (`BUILD-00N/`)
- **Later:** Automation helpers may validate packs/structure without changing top-level layout

## Relationship to `.adf/`

`bootstrap/` describes the process. `.adf/` stores the live operating data and contracts the process consumes (`AI_BOOT.md`, `PROJECT_STATE.md`, etc.).

## Usage

1. Read `BOOT_SEQUENCE.md` when starting fresh or recovering.
2. Read `BUILD_CONTRACT.md` before declaring a BUILD done.
3. Use `prompts/resume.md` / `prompts/handoff.md` as session wrappers around the sequence.
