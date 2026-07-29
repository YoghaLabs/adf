"""UpdateManager — check / download / apply / rollback distribution updates."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from distribution.installer import InstallerManager
from distribution.manifest import AdfDistributionError, load_manifest
from distribution.release_channel import ReleaseChannel, parse_channel
from distribution.rollback import RollbackManager
from registry.metadata import utc_now_iso


class UpdateManager:
    """Independent update engine for distribution releases."""

    def __init__(
        self,
        repo_root: Path | str,
        *,
        installer: InstallerManager | None = None,
    ) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.releases_root = self.repo_root / "release" / "dist"
        self.download_root = self.repo_root / ".adf" / "distribution" / "downloads"
        self.download_root.mkdir(parents=True, exist_ok=True)
        self.installer = installer or InstallerManager(self.repo_root)
        self.rollback_manager = RollbackManager(
            self.repo_root / ".adf" / "distribution" / "rollback"
        )
        self.state_path = self.repo_root / ".adf" / "distribution" / "update-state.json"

    def _load_state(self) -> dict[str, Any]:
        if self.state_path.is_file():
            data = json.loads(self.state_path.read_text(encoding="utf-8"))
            return data if isinstance(data, dict) else {}
        return {"channel": "alpha", "current_version": "", "pending": None}

    def _save_state(self, state: dict[str, Any]) -> None:
        self.state_path.parent.mkdir(parents=True, exist_ok=True)
        self.state_path.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    def _channel_dir(self, channel: ReleaseChannel) -> Path:
        return self.releases_root / channel.value

    def check(self, *, channel: str | ReleaseChannel | None = None) -> dict[str, Any]:
        """Check for a newer release on the selected channel."""
        state = self._load_state()
        channel_enum = parse_channel(channel or state.get("channel") or "alpha")
        channel_dir = self._channel_dir(channel_enum)
        available: list[dict[str, Any]] = []
        if channel_dir.is_dir():
            for manifest_path in sorted(channel_dir.glob("*/release.manifest.json")):
                try:
                    manifest = load_manifest(manifest_path)
                except AdfDistributionError:
                    continue
                available.append(
                    {
                        "version": manifest.version,
                        "channel": manifest.channel,
                        "path": str(manifest_path),
                        "artifacts": len(manifest.artifacts),
                    }
                )
        current = str(state.get("current_version") or "")
        newest = available[-1] if available else None
        update_available = bool(newest and newest["version"] != current)
        return {
            "ok": True,
            "channel": channel_enum.value,
            "current_version": current,
            "update_available": update_available,
            "newest": newest,
            "available": available,
            "checked_at": utc_now_iso(),
        }

    def download(self, version: str, *, channel: str | ReleaseChannel | None = None) -> dict[str, Any]:
        """Copy release artifacts into the local download cache."""
        state = self._load_state()
        channel_enum = parse_channel(channel or state.get("channel") or "alpha")
        release_dir = self._channel_dir(channel_enum) / version
        manifest_path = release_dir / "release.manifest.json"
        if not manifest_path.is_file():
            raise AdfDistributionError(f"release not found: {channel_enum.value}/{version}")
        manifest = load_manifest(manifest_path)
        dest = self.download_root / channel_enum.value / version
        if dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(release_dir, dest)
        state["pending"] = {
            "version": version,
            "channel": channel_enum.value,
            "path": str(dest),
            "downloaded_at": utc_now_iso(),
            "manifest": manifest.to_dict(),
        }
        self._save_state(state)
        return {
            "ok": True,
            "downloaded": str(dest),
            "version": version,
            "channel": channel_enum.value,
        }

    def apply(self, *, overwrite: bool = True) -> dict[str, Any]:
        """Apply a previously downloaded release."""
        state = self._load_state()
        pending = state.get("pending")
        if not pending:
            raise AdfDistributionError("no pending update to apply")
        path = Path(pending["path"])
        manifest_path = path / "release.manifest.json"
        if self.installer.install_root.exists():
            self.rollback_manager.snapshot(
                self.installer.install_root,
                label=f"pre-update-{pending['version']}",
            )
        result = self.installer.install(
            str(manifest_path), overwrite=overwrite, mode="distribution"
        )
        state["current_version"] = pending["version"]
        state["channel"] = pending["channel"]
        state["last_applied"] = utc_now_iso()
        state["pending"] = None
        self._save_state(state)
        return {"ok": True, "applied": pending["version"], "install": result}

    def rollback(self, snapshot_id: str | None = None) -> dict[str, Any]:
        """Rollback to a snapshot (latest pre-update if omitted)."""
        snapshots = self.rollback_manager.list()
        if not snapshots:
            raise AdfDistributionError("no rollback snapshots available")
        target = snapshot_id or snapshots[-1]["id"]
        restored = self.rollback_manager.restore(target, self.installer.install_root)
        state = self._load_state()
        state["last_rollback"] = {"snapshot": target, "at": utc_now_iso()}
        self._save_state(state)
        return {"ok": True, "rollback": restored}
