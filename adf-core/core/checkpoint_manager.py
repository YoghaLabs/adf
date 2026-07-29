"""Checkpoint create/restore/list for session continuity."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

from runtime.exceptions import AdfCheckpointError


class CheckpointManager:
    """Manage operator checkpoints under ``.adf/local/checkpoints/``.

    Checkpoints complement markdown ``SESSION.md`` notes with machine-readable
    records the Runtime Engine can restore.
    """

    def __init__(self, repo_root: Path | str) -> None:
        """Initialize checkpoint storage."""
        self.repo_root = Path(repo_root).resolve()
        self.checkpoints_dir = self.repo_root / ".adf" / "local" / "checkpoints"

    def create(
        self,
        *,
        build: str,
        operator_state: str,
        done: list[str] | None = None,
        remaining: list[str] | None = None,
    ) -> dict[str, Any]:
        """Create a checkpoint record.

        Args:
            build: Active BUILD id.
            operator_state: State-machine position.
            done: Completed items.
            remaining: Remaining items.

        Returns:
            Checkpoint dictionary.
        """
        self.checkpoints_dir.mkdir(parents=True, exist_ok=True)
        stamp = datetime.now(timezone.utc).strftime("%Y%m%d")
        checkpoint_id = f"CP-{stamp}-{build}-{uuid4().hex[:6]}"
        checkpoint = {
            "id": checkpoint_id,
            "build": build,
            "operator_state": operator_state,
            "done": list(done or []),
            "remaining": list(remaining or []),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        path = self.checkpoints_dir / f"{checkpoint_id}.json"
        path.write_text(json.dumps(checkpoint, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        (self.checkpoints_dir / "LATEST").write_text(checkpoint_id + "\n", encoding="utf-8")
        return checkpoint

    def restore(self, checkpoint_id: str | None = None) -> dict[str, Any]:
        """Restore a checkpoint by id or the latest pointer.

        Raises:
            AdfCheckpointError: If no checkpoint is available.
        """
        target = checkpoint_id or self._latest_id()
        if not target:
            raise AdfCheckpointError("No checkpoint id provided and no LATEST checkpoint")
        path = self.checkpoints_dir / f"{target}.json"
        if not path.is_file():
            raise AdfCheckpointError(f"Checkpoint not found: {target}")
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise AdfCheckpointError("Checkpoint file must be a JSON object")
        return data

    def list(self) -> list[str]:
        """List checkpoint ids (newest first by filename)."""
        if not self.checkpoints_dir.is_dir():
            return []
        ids = [p.stem for p in self.checkpoints_dir.glob("CP-*.json")]
        return sorted(ids, reverse=True)

    def _latest_id(self) -> str | None:
        latest = self.checkpoints_dir / "LATEST"
        if not latest.is_file():
            return None
        value = latest.read_text(encoding="utf-8").strip()
        return value or None
