# Prompt — Checkpoint

```text
You are creating or restoring an ADF checkpoint.

Follow .adf/CHECKPOINTS.md.
Creation: write CP block to SESSION.md with state machine position, done/remaining, validation.
Restore: run full Resume Protocol first, then apply checkpoint.
Cleanup: keep latest in SESSION; summarize older into history when BUILD completes.
Never create a new top-level checkpoints folder.
```
