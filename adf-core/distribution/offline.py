"""Offline distribution helpers — registry snapshot & offline installer packs."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from distribution.bundle_builder import BundleBuilder
from distribution.manifest import AdfDistributionError
from registry.metadata import utc_now_iso
from registry.sync import RegistrySync


class OfflineDistributor:
    """Create offline registry snapshots and offline installer bundles."""

    def __init__(self, repo_root: Path | str) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.snapshot_root = self.repo_root / ".adf" / "distribution" / "offline"
        self.snapshot_root.mkdir(parents=True, exist_ok=True)
        self.registry_source = self.repo_root / "release" / "apm-registry"
        self.mirror_root = self.snapshot_root / "registry-snapshot"
        self.syncer = RegistrySync(self.registry_source, self.mirror_root)
        self.bundles = BundleBuilder(self.snapshot_root / "bundles")

    def snapshot_registry(self, *, incremental: bool = True) -> dict[str, Any]:
        """Mirror the local registry for offline use."""
        result = self.syncer.sync(incremental=incremental)
        state_path = self.snapshot_root / "OFFLINE_REGISTRY.json"
        state_path.write_text(
            json.dumps(
                {
                    "created": utc_now_iso(),
                    "source": str(self.registry_source),
                    "mirror": str(self.mirror_root),
                    "sync": result,
                },
                indent=2,
                sort_keys=True,
            )
            + "\n",
            encoding="utf-8",
        )
        return {"ok": bool(result.get("ok")), "snapshot": str(self.mirror_root), "sync": result}

    def build_offline_bundle(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
    ) -> dict[str, Any]:
        """Build offline bundle including registry snapshot + docs."""
        snap = self.snapshot_registry(incremental=True)
        if not snap.get("ok"):
            raise AdfDistributionError("offline registry snapshot failed")
        docs = self.repo_root / "adf-docs"
        artifact = self.bundles.build_offline(
            source,
            name=name,
            version=version,
            registry_snapshot=self.mirror_root,
            docs_root=docs if docs.is_dir() else None,
        )
        return {"ok": True, "artifact": artifact.to_dict(), "registry_snapshot": snap}

    def offline_installer_stub(self, *, name: str, version: str) -> dict[str, Any]:
        """Materialize an offline installer descriptor (used by InstallerManager)."""
        path = self.snapshot_root / f"{name}-{version}-offline-installer.json"
        payload = {
            "name": name,
            "version": version,
            "kind": "offline-installer",
            "created": utc_now_iso(),
            "registry_snapshot": str(self.mirror_root),
            "packages": True,
            "bootstrap": True,
            "documentation": True,
        }
        path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return {"ok": True, "path": str(path), "installer": payload}

    def status(self) -> dict[str, Any]:
        ready = self.syncer.offline_ready()
        return {
            "snapshot_root": str(self.snapshot_root),
            "registry": ready,
            "bundles": sorted(str(p.name) for p in (self.snapshot_root / "bundles").glob("*") if p.is_file())
            if (self.snapshot_root / "bundles").exists()
            else [],
        }
