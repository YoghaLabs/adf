"""Registry synchronization — local mirror / offline / incremental."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from packages.manifest import parse_package_manifest
from packages.metadata import PACKAGE_MANIFEST_FILENAME
from registry.metadata import utc_now_iso


class RegistrySync:
    """Synchronize registry catalogs into a local mirror and offline cache index."""

    def __init__(
        self,
        source_root: Path | str,
        mirror_root: Path | str,
        *,
        state_path: Path | str | None = None,
    ) -> None:
        self.source_root = Path(source_root)
        self.mirror_root = Path(mirror_root)
        self.mirror_root.mkdir(parents=True, exist_ok=True)
        self.state_path = Path(state_path) if state_path else self.mirror_root / ".sync-state.json"

    def _load_state(self) -> dict[str, Any]:
        if self.state_path.is_file():
            data = json.loads(self.state_path.read_text(encoding="utf-8"))
            return data if isinstance(data, dict) else {}
        return {}

    def _save_state(self, state: dict[str, Any]) -> None:
        self.state_path.parent.mkdir(parents=True, exist_ok=True)
        self.state_path.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    def sync(self, *, incremental: bool = True) -> dict[str, Any]:
        """Mirror packages from source registry to local mirror."""
        state = self._load_state()
        known = dict(state.get("packages") or {})
        copied: list[str] = []
        skipped: list[str] = []
        if not self.source_root.is_dir():
            return {"ok": False, "error": f"source missing: {self.source_root}"}

        for child in sorted(self.source_root.iterdir()):
            if not child.is_dir() or not (child / PACKAGE_MANIFEST_FILENAME).is_file():
                continue
            try:
                manifest = parse_package_manifest(child)
            except Exception:
                continue
            key = manifest.id
            stamp = f"{manifest.version}:{manifest.checksum or ''}"
            dest = self.mirror_root / key
            if incremental and known.get(key) == stamp and dest.is_dir():
                skipped.append(key)
                continue
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(child, dest)
            known[key] = stamp
            copied.append(key)

        state = {
            "updated": utc_now_iso(),
            "packages": known,
            "incremental": incremental,
            "source": str(self.source_root),
            "mirror": str(self.mirror_root),
        }
        self._save_state(state)
        return {
            "ok": True,
            "copied": copied,
            "skipped": skipped,
            "count_copied": len(copied),
            "count_skipped": len(skipped),
            "state": state,
        }

    def offline_ready(self) -> dict[str, Any]:
        """Report whether mirror has at least one package."""
        packages = [
            p.name
            for p in self.mirror_root.iterdir()
            if p.is_dir() and (p / PACKAGE_MANIFEST_FILENAME).is_file()
        ] if self.mirror_root.is_dir() else []
        return {"ok": bool(packages), "packages": packages, "count": len(packages)}
