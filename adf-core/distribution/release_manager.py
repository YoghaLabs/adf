"""ReleaseManager — create / publish / promote / archive releases."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from distribution.bundle_builder import BundleBuilder
from distribution.checksum import ChecksumManager, file_checksum
from distribution.manifest import (
    AdfDistributionError,
    ArtifactRef,
    ReleaseManifest,
    load_manifest,
    save_manifest,
)
from distribution.package_builder import PackageBuilder
from distribution.release_channel import (
    CHANNEL_POLICIES,
    ReleaseChannel,
    can_promote,
    parse_channel,
)
from distribution.signature import SignatureManager
from registry.metadata import utc_now_iso
from runtime.constants import ENGINE_BUILD


class ReleaseManager:
    """Own release lifecycle; packaging is delegated to builders."""

    def __init__(self, repo_root: Path | str) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.dist_root = self.repo_root / "release" / "dist"
        self.archive_root = self.repo_root / "release" / "archive"
        self.dist_root.mkdir(parents=True, exist_ok=True)
        self.archive_root.mkdir(parents=True, exist_ok=True)
        self.checksums = ChecksumManager()
        self.signatures = SignatureManager()
        self.packages = PackageBuilder(self.dist_root / ".build")
        self.bundles = BundleBuilder(self.dist_root / ".build")

    def channels(self) -> list[dict[str, Any]]:
        return [policy.to_dict() for policy in CHANNEL_POLICIES.values()]

    def create_release(
        self,
        source: Path | str,
        *,
        name: str = "adf",
        version: str,
        channel: str | ReleaseChannel = "alpha",
        notes: str = "",
        kinds: list[str] | None = None,
    ) -> dict[str, Any]:
        """Build artifacts and write a draft release directory + manifest."""
        channel_enum = parse_channel(channel)
        src = Path(source)
        if not src.exists():
            raise AdfDistributionError(f"release source missing: {src}")

        release_dir = self.dist_root / channel_enum.value / version
        if release_dir.exists():
            shutil.rmtree(release_dir)
        release_dir.mkdir(parents=True)

        build_kinds = kinds or ["zip", "tar.gz", "wheel"]
        artifacts: list[ArtifactRef] = []
        for kind in build_kinds:
            if kind == "portable":
                artifact = self.bundles.build_portable(src, name=name, version=version)
            elif kind == "offline":
                artifact = self.bundles.build_offline(src, name=name, version=version)
            elif kind == "enterprise":
                artifact = self.bundles.build_enterprise(src, name=name, version=version)
            else:
                artifact = self.packages.build(src, name=name, version=version, kind=kind)
            # Copy artifact into release dir
            art_src = Path(artifact.path)
            art_dest = release_dir / art_src.name
            shutil.copy2(art_src, art_dest)
            artifact.path = str(art_dest)
            artifact.checksum = file_checksum(art_dest)
            artifact.size = art_dest.stat().st_size
            # Sign artifact
            sig = self.signatures.sign_file(art_dest)
            (release_dir / f"{art_dest.name}.sig").write_text(
                json.dumps(sig.to_dict(), indent=2) + "\n", encoding="utf-8"
            )
            artifacts.append(artifact)

        manifest = ReleaseManifest(
            name=name,
            version=version,
            channel=channel_enum.value,
            build=ENGINE_BUILD,
            created=utc_now_iso(),
            notes=notes,
            artifacts=artifacts,
            offline="offline" in build_kinds,
            enterprise="enterprise" in build_kinds,
        )
        manifest.checksum = self.checksums.hash_tree(release_dir)
        manifest.signature = self.signatures.sign_file(
            save_manifest(manifest, release_dir / "release.manifest.json")
        ).value
        # rewrite manifest with signature
        save_manifest(manifest, release_dir / "release.manifest.json")
        return {
            "ok": True,
            "release_dir": str(release_dir),
            "manifest": manifest.to_dict(),
        }

    def publish_release(
        self,
        version: str,
        *,
        channel: str | ReleaseChannel = "alpha",
    ) -> dict[str, Any]:
        """Mark a created release as published (writes PUBLISHED.json)."""
        channel_enum = parse_channel(channel)
        release_dir = self.dist_root / channel_enum.value / version
        manifest_path = release_dir / "release.manifest.json"
        if not manifest_path.is_file():
            raise AdfDistributionError(f"cannot publish missing release: {channel_enum.value}/{version}")
        manifest = load_manifest(manifest_path)
        published = {
            "version": version,
            "channel": channel_enum.value,
            "published_at": utc_now_iso(),
            "manifest_checksum": manifest.checksum,
        }
        (release_dir / "PUBLISHED.json").write_text(
            json.dumps(published, indent=2, sort_keys=True) + "\n", encoding="utf-8"
        )
        return {"ok": True, "published": published}

    def promote_channel(
        self,
        version: str,
        *,
        source_channel: str | ReleaseChannel,
        target_channel: str | ReleaseChannel,
    ) -> dict[str, Any]:
        """Promote a release from one channel to another."""
        source = parse_channel(source_channel)
        target = parse_channel(target_channel)
        if not can_promote(source, target):
            raise AdfDistributionError(
                f"cannot promote from {source.value} to {target.value}"
            )
        src_dir = self.dist_root / source.value / version
        if not (src_dir / "release.manifest.json").is_file():
            raise AdfDistributionError(f"source release missing: {source.value}/{version}")
        dest_dir = self.dist_root / target.value / version
        if dest_dir.exists():
            shutil.rmtree(dest_dir)
        shutil.copytree(src_dir, dest_dir)
        manifest = load_manifest(dest_dir / "release.manifest.json")
        manifest.channel = target.value
        save_manifest(manifest, dest_dir / "release.manifest.json")
        return {
            "ok": True,
            "version": version,
            "from": source.value,
            "to": target.value,
            "path": str(dest_dir),
        }

    def archive_release(
        self,
        version: str,
        *,
        channel: str | ReleaseChannel = "alpha",
    ) -> dict[str, Any]:
        """Move a release directory into the archive root."""
        channel_enum = parse_channel(channel)
        src_dir = self.dist_root / channel_enum.value / version
        if not src_dir.exists():
            raise AdfDistributionError(f"release missing: {channel_enum.value}/{version}")
        dest = self.archive_root / channel_enum.value / version
        if dest.exists():
            shutil.rmtree(dest)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(src_dir), str(dest))
        return {"ok": True, "archived": str(dest), "version": version, "channel": channel_enum.value}

    def list_releases(self, *, channel: str | ReleaseChannel | None = None) -> list[dict[str, Any]]:
        """List release manifests under release/dist."""
        rows: list[dict[str, Any]] = []
        channels = [parse_channel(channel)] if channel else list(CHANNEL_POLICIES.keys())
        for channel_enum in channels:
            root = self.dist_root / channel_enum.value
            if not root.is_dir():
                continue
            for manifest_path in sorted(root.glob("*/release.manifest.json")):
                manifest = load_manifest(manifest_path)
                rows.append(
                    {
                        "version": manifest.version,
                        "channel": manifest.channel,
                        "path": str(manifest_path.parent),
                        "published": (manifest_path.parent / "PUBLISHED.json").is_file(),
                        "artifacts": len(manifest.artifacts),
                    }
                )
        return rows
