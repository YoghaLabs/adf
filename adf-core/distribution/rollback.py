"""Rollback snapshots for distribution installs."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from distribution.checksum import tree_checksum
from distribution.manifest import AdfDistributionError
from registry.metadata import utc_now_iso


class RollbackManager:
    """Snapshot / restore distribution install state."""

    def __init__(self, root: Path | str) -> None:
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)
        self.index_path = self.root / "index.json"

    def _load_index(self) -> dict[str, Any]:
        if self.index_path.is_file():
            data = json.loads(self.index_path.read_text(encoding="utf-8"))
            return data if isinstance(data, dict) else {}
        return {"snapshots": []}

    def _save_index(self, data: dict[str, Any]) -> None:
        self.index_path.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    def snapshot(self, source: Path | str, *, label: str = "") -> dict[str, Any]:
        """Copy ``source`` into a timestamped snapshot directory."""
        src = Path(source)
        if not src.exists():
            raise AdfDistributionError(f"cannot snapshot missing path: {src}")
        stamp = utc_now_iso().replace(":", "")
        name = label.strip() or stamp
        dest = self.root / name
        if dest.exists():
            shutil.rmtree(dest)
        if src.is_dir():
            shutil.copytree(src, dest)
        else:
            dest.mkdir(parents=True)
            shutil.copy2(src, dest / src.name)
        checksum = tree_checksum(dest)
        index = self._load_index()
        snapshots = list(index.get("snapshots") or [])
        entry = {
            "id": name,
            "created": utc_now_iso(),
            "path": str(dest),
            "checksum": checksum,
            "source": str(src),
        }
        snapshots.append(entry)
        index["snapshots"] = snapshots
        self._save_index(index)
        return {"ok": True, "snapshot": entry}

    def restore(self, snapshot_id: str, destination: Path | str) -> dict[str, Any]:
        """Restore a snapshot over ``destination``."""
        index = self._load_index()
        match = next(
            (row for row in index.get("snapshots") or [] if row.get("id") == snapshot_id),
            None,
        )
        if not match:
            raise AdfDistributionError(f"unknown snapshot: {snapshot_id}")
        src = Path(match["path"])
        dest = Path(destination)
        if dest.exists():
            if dest.is_dir():
                shutil.rmtree(dest)
            else:
                dest.unlink()
        if src.is_dir() and any(src.iterdir()) and (src / src.name).exists() is False:
            # directory snapshot of a tree
            shutil.copytree(src, dest)
        else:
            shutil.copytree(src, dest)
        return {"ok": True, "restored": snapshot_id, "destination": str(dest)}

    def verify(self, snapshot_id: str) -> dict[str, Any]:
        """Verify snapshot tree checksum against index."""
        index = self._load_index()
        match = next(
            (row for row in index.get("snapshots") or [] if row.get("id") == snapshot_id),
            None,
        )
        if not match:
            raise AdfDistributionError(f"unknown snapshot: {snapshot_id}")
        path = Path(match["path"])
        actual = tree_checksum(path)
        expected = str(match.get("checksum") or "")
        return {
            "ok": actual == expected,
            "snapshot": snapshot_id,
            "expected": expected,
            "actual": actual,
        }

    def list(self) -> list[dict[str, Any]]:
        return list(self._load_index().get("snapshots") or [])
