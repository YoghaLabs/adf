# Workflow (Human Guide)

ADF delivery follows:

```text
Idea → Specification → Implementation → Review → Approval → Release
```

## Why This Order

Skipping specification produces redesign. Skipping review produces SSOT drift. Skipping approval lets the next BUILD start on shaky ground.

## Where It Lives

Binding detail: `.adf/WORKFLOW.md`  
Operator loop: `.adf/AI_RUNTIME.md`  
Build mechanics: `BUILD_SYSTEM.md`

## Practical Tips

- Write acceptance criteria before generating large doc/code sets
- Update `.adf` in the same session as the work
- Stop at BUILD boundaries

## Related

- `BEST_PRACTICES.md`
- `prompts/planning.md`
- `prompts/review.md`
