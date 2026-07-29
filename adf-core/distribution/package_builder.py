"""Artifact builders — zip, tar.gz, wheel, and generic archives."""

from __future__ import annotations

import shutil
import tarfile
import zipfile
from pathlib import Path
from typing import Any

from distribution.checksum import file_checksum
from distribution.manifest import AdfDistributionError, ArtifactRef


class PackageBuilder:
    """Build distribution package formats from a source tree."""

    SUPPORTED = (
        "zip",
        "tar.gz",
        "wheel",
        "portable",
        "enterprise",
        "offline",
        "desktop",
    )

    def __init__(self, output_root: Path | str) -> None:
        self.output_root = Path(output_root)
        self.output_root.mkdir(parents=True, exist_ok=True)

    def build(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
        kind: str = "zip",
    ) -> ArtifactRef:
        """Build an artifact of ``kind`` from ``source``."""
        src = Path(source)
        if not src.exists():
            raise AdfDistributionError(f"package source missing: {src}")
        kind_key = kind.strip().lower()
        if kind_key not in self.SUPPORTED:
            raise AdfDistributionError(f"unsupported package kind: {kind}")

        if kind_key == "zip":
            path = self._build_zip(src, f"{name}-{version}.zip")
        elif kind_key == "tar.gz":
            path = self._build_tar_gz(src, f"{name}-{version}.tar.gz")
        elif kind_key == "wheel":
            path = self._build_wheel(src, name=name, version=version)
        elif kind_key == "desktop":
            # Future desktop bundle: portable zip with desktop marker.
            path = self._build_zip(src, f"{name}-{version}-desktop.zip")
            (path.parent / f"{path.stem}.desktop-marker").write_text(
                "future-desktop-bundle\n", encoding="utf-8"
            )
        else:
            # portable / enterprise / offline are produced via BundleBuilder primarily;
            # still emit a zip payload here for package-builder API completeness.
            path = self._build_zip(src, f"{name}-{version}-{kind_key}.zip")

        return ArtifactRef(
            name=path.name,
            kind=kind_key,
            path=str(path),
            checksum=file_checksum(path),
            size=path.stat().st_size,
        )

    def _build_zip(self, source: Path, filename: str) -> Path:
        dest = self.output_root / filename
        if dest.exists():
            dest.unlink()
        if source.is_file():
            with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED) as archive:
                archive.write(source, arcname=source.name)
            return dest
        base = source.name
        with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            for path in sorted(p for p in source.rglob("*") if p.is_file()):
                archive.write(path, arcname=f"{base}/{path.relative_to(source).as_posix()}")
        return dest

    def _build_tar_gz(self, source: Path, filename: str) -> Path:
        dest = self.output_root / filename
        if dest.exists():
            dest.unlink()
        mode = "w:gz"
        with tarfile.open(dest, mode) as archive:
            archive.add(source, arcname=source.name)
        return dest

    def _build_wheel(self, source: Path, *, name: str, version: str) -> Path:
        """Build a minimal valid-enough wheel zip (``*.whl``)."""
        safe_name = name.replace("-", "_")
        wheel_name = f"{safe_name}-{version}-py3-none-any.whl"
        staging = self.output_root / f".wheel-staging-{safe_name}-{version}"
        if staging.exists():
            shutil.rmtree(staging)
        dist_info = staging / f"{safe_name}-{version}.dist-info"
        dist_info.mkdir(parents=True)
        (dist_info / "METADATA").write_text(
            f"Metadata-Version: 2.1\nName: {name}\nVersion: {version}\nSummary: ADF distribution wheel\n",
            encoding="utf-8",
        )
        (dist_info / "WHEEL").write_text(
            "Wheel-Version: 1.0\nGenerator: adf-distribution\nRoot-Is-Purelib: true\nTag: py3-none-any\n",
            encoding="utf-8",
        )
        payload = staging / safe_name
        if source.is_dir():
            shutil.copytree(source, payload)
        else:
            payload.mkdir(parents=True)
            shutil.copy2(source, payload / source.name)
        (dist_info / "RECORD").write_text("", encoding="utf-8")
        dest = self.output_root / wheel_name
        if dest.exists():
            dest.unlink()
        with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            for path in sorted(p for p in staging.rglob("*") if p.is_file()):
                archive.write(path, arcname=path.relative_to(staging).as_posix())
        shutil.rmtree(staging)
        return dest

    def list_kinds(self) -> list[dict[str, Any]]:
        return [{"kind": kind, "supported": True} for kind in self.SUPPORTED]
