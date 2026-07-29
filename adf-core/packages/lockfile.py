"""adf.lock lockfile for installed package pinning."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from packages.manifest import AdfPackageError

LOCKFILE_NAME = "adf.lock"
LOCKFILE_VERSION = 1


@dataclass
class LockEntry:
    """Pinned installed package."""

    id: str
    name: str
    version: str
    type: str
    path: str
    dependencies: dict[str, str] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "version": self.version,
            "type": self.type,
            "path": self.path,
            "dependencies": dict(self.dependencies),
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> LockEntry:
        return cls(
            id=str(data["id"]),
            name=str(data.get("name", data["id"])),
            version=str(data["version"]),
            type=str(data.get("type", "extension")),
            path=str(data.get("path", "")),
            dependencies={str(k): str(v) for k, v in (data.get("dependencies") or {}).items()},
        )


@dataclass
class LockFile:
    """In-memory representation of ``adf.lock``."""

    packages: dict[str, LockEntry] = field(default_factory=dict)
    tree: dict[str, list[str]] = field(default_factory=dict)
    version: int = LOCKFILE_VERSION

    def to_dict(self) -> dict[str, Any]:
        return {
            "lockfile_version": self.version,
            "packages": {key: entry.to_dict() for key, entry in sorted(self.packages.items())},
            "dependency_tree": {key: list(vals) for key, vals in sorted(self.tree.items())},
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> LockFile:
        packages = {
            key: LockEntry.from_dict(val)
            for key, val in (data.get("packages") or {}).items()
        }
        tree = {
            key: [str(item) for item in vals]
            for key, vals in (data.get("dependency_tree") or {}).items()
        }
        return cls(
            packages=packages,
            tree=tree,
            version=int(data.get("lockfile_version") or LOCKFILE_VERSION),
        )


class LockFileStore:
    """Read/write ``adf.lock`` at a repository root."""

    def __init__(self, repo_root: Path | str) -> None:
        self.repo_root = Path(repo_root)
        self.path = self.repo_root / LOCKFILE_NAME

    def load(self) -> LockFile:
        """Load lockfile or return empty."""
        if not self.path.is_file():
            return LockFile()
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise AdfPackageError(f"invalid lockfile {self.path}: {exc}") from exc
        return LockFile.from_dict(data)

    def save(self, lock: LockFile) -> Path:
        """Persist lockfile as JSON."""
        self.path.write_text(
            json.dumps(lock.to_dict(), indent=2, sort_keys=True) + "\n",
            encoding="utf-8",
            newline="\n",
        )
        return self.path

    def installed_versions(self) -> dict[str, str]:
        """Return id→version map."""
        lock = self.load()
        return {key: entry.version for key, entry in lock.packages.items()}
