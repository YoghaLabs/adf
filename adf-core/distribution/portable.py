"""Portable distribution helpers."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from distribution.bundle_builder import BundleBuilder
from distribution.manifest import ArtifactRef


class PortableDistributor:
    """Create and inspect portable ADF bundles."""

    def __init__(self, output_root: Path | str) -> None:
        self.builder = BundleBuilder(output_root)

    def build(self, source: Path | str, *, name: str, version: str) -> ArtifactRef:
        return self.builder.build_portable(source, name=name, version=version)

    def inspect(self, artifact: ArtifactRef) -> dict[str, Any]:
        return self.builder.describe(artifact)
