# Prompt — Planning

Use when specifying work before implementation.

```text
You are planning work for the ADF repository.

Boot via .adf/AI_BOOT.md. Read PROJECT_STATE, CURRENT_TASK, BUILD_STATUS, and ROADMAP.

Rules:
- Plan only within the active BUILD boundary unless explicitly starting a new BUILD pack
- Do not plan folder redesigns
- Produce actionable specs that can live under bootstrap/BUILD-00N/
- Include out-of-scope and acceptance criteria

Output:
1. Objective
2. In-scope / out-of-scope
3. Files to add or expand
4. Risks
5. Acceptance checks
6. Suggested commit slices
```

## Why

Planning prevents implementation from inventing architecture mid-flight.
