"""Runtime configuration for adf-core."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class RuntimeConfig:
    """Configuration for the Runtime Engine.

    Attributes:
        repo_root: Absolute path to the ADF repository root.
        adf_dir_name: Name of the SSOT directory (locked as ``.adf``).
        context_pack: Default context pack size (quick|standard|deep).
    """

    repo_root: Path
    adf_dir_name: str = ".adf"
    context_pack: str = "standard"
    extra: dict[str, str] = field(default_factory=dict)

    @property
    def adf_dir(self) -> Path:
        """Return the ``.adf`` SSOT directory path."""
        return self.repo_root / self.adf_dir_name

    @classmethod
    def from_repo_root(cls, repo_root: Path | str) -> RuntimeConfig:
        """Build config from a repository root path."""
        return cls(repo_root=Path(repo_root).resolve())
