"""Installed / resolvable package entity."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

from packages.manifest import PackageManifest


@dataclass
class Package:
    """A package rooted on disk with a parsed manifest."""

    root: Path
    manifest: PackageManifest

    @property
    def id(self) -> str:
        return self.manifest.id

    @property
    def name(self) -> str:
        return self.manifest.name

    @property
    def version(self) -> str:
        return self.manifest.version

    @property
    def type(self) -> str:
        return self.manifest.type

    def to_dict(self) -> dict[str, Any]:
        """Serialize package identity + location."""
        data = self.manifest.to_dict()
        data["root"] = str(self.root)
        return data
