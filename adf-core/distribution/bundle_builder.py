"""High-level bundle builders (portable / offline / enterprise / desktop)."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from distribution.checksum import file_checksum, tree_checksum
from distribution.manifest import AdfDistributionError, ArtifactRef
from distribution.package_builder import PackageBuilder
from registry.metadata import utc_now_iso


class BundleBuilder:
    """Compose multi-part distribution bundles."""

    def __init__(self, output_root: Path | str) -> None:
        self.output_root = Path(output_root)
        self.output_root.mkdir(parents=True, exist_ok=True)
        self.packages = PackageBuilder(self.output_root)

    def build_portable(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
    ) -> ArtifactRef:
        """Portable bundle: source tree + PORTABLE.json marker, zipped."""
        staging = self._stage(source, f"{name}-{version}-portable")
        (staging / "PORTABLE.json").write_text(
            json.dumps(
                {
                    "name": name,
                    "version": version,
                    "kind": "portable",
                    "created": utc_now_iso(),
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        artifact = self.packages.build(
            staging, name=f"{name}-portable", version=version, kind="zip"
        )
        artifact.kind = "portable"
        shutil.rmtree(staging)
        return artifact

    def build_offline(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
        registry_snapshot: Path | str | None = None,
        docs_root: Path | str | None = None,
    ) -> ArtifactRef:
        """Offline bundle: payload + registry snapshot + docs + OFFLINE.json."""
        staging = self._stage(source, f"{name}-{version}-offline")
        offline_dir = staging / "offline"
        offline_dir.mkdir(parents=True, exist_ok=True)
        if registry_snapshot and Path(registry_snapshot).exists():
            shutil.copytree(registry_snapshot, offline_dir / "registry", dirs_exist_ok=True)
        if docs_root and Path(docs_root).exists():
            shutil.copytree(docs_root, offline_dir / "docs", dirs_exist_ok=True)
        (staging / "OFFLINE.json").write_text(
            json.dumps(
                {
                    "name": name,
                    "version": version,
                    "kind": "offline",
                    "created": utc_now_iso(),
                    "includes": {
                        "registry": bool(registry_snapshot),
                        "docs": bool(docs_root),
                        "bootstrap": True,
                        "packages": True,
                    },
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        (offline_dir / "BOOTSTRAP.md").write_text(
            "# Offline Bootstrap\n\nUse this bundle without network access.\n",
            encoding="utf-8",
        )
        artifact = self.packages.build(
            staging, name=f"{name}-offline", version=version, kind="zip"
        )
        artifact.kind = "offline"
        shutil.rmtree(staging)
        return artifact

    def build_enterprise(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
        profile: dict[str, Any] | None = None,
    ) -> ArtifactRef:
        """Enterprise bundle with deployment profile."""
        staging = self._stage(source, f"{name}-{version}-enterprise")
        profile_data = {
            "name": name,
            "version": version,
            "kind": "enterprise",
            "created": utc_now_iso(),
            "profile": profile
            or {
                "org": "enterprise",
                "channel": "stable",
                "offline_default": True,
                "require_signature": True,
            },
        }
        (staging / "ENTERPRISE.json").write_text(
            json.dumps(profile_data, indent=2, sort_keys=True) + "\n", encoding="utf-8"
        )
        artifact = self.packages.build(
            staging, name=f"{name}-enterprise", version=version, kind="zip"
        )
        artifact.kind = "enterprise"
        shutil.rmtree(staging)
        return artifact

    def build_desktop(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
    ) -> ArtifactRef:
        """Future desktop bundle marker + zip payload."""
        return self.packages.build(source, name=name, version=version, kind="desktop")

    def _stage(self, source: Path | str, folder_name: str) -> Path:
        src = Path(source)
        if not src.exists():
            raise AdfDistributionError(f"bundle source missing: {src}")
        staging = self.output_root / ".staging" / folder_name
        if staging.exists():
            shutil.rmtree(staging)
        if src.is_dir():
            shutil.copytree(src, staging / "payload")
        else:
            (staging / "payload").mkdir(parents=True)
            shutil.copy2(src, staging / "payload" / src.name)
        return staging

    def describe(self, artifact: ArtifactRef) -> dict[str, Any]:
        path = Path(artifact.path)
        return {
            **artifact.to_dict(),
            "exists": path.is_file(),
            "checksum_ok": file_checksum(path) == artifact.checksum if path.is_file() else False,
            "tree_hint": tree_checksum(path.parent) if path.exists() else "",
        }
