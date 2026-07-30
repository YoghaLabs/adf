"""Package.yaml manifest model and parser."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Mapping

import yaml

from packages.metadata import PACKAGE_MANIFEST_FILENAME, PACKAGE_SCHEMA_VERSION, PACKAGE_TYPES
from runtime.exceptions import AdfError


class AdfPackageError(AdfError):
    """Package manager failures."""


@dataclass
class PackageManifest:
    """Parsed ``package.yaml`` contract for an ADF package."""

    name: str
    id: str
    version: str
    author: str = "YoghaLabs"
    description: str = ""
    type: str = "extension"
    engine: str = "adf-core>=0.8.0"
    license: str = "MIT"
    homepage: str = ""
    repository: str = ""
    dependencies: dict[str, str] = field(default_factory=dict)
    capabilities: list[str] = field(default_factory=list)
    entrypoint: str = ""
    checksum: str = ""
    signature: str = ""
    schema_version: str = PACKAGE_SCHEMA_VERSION
    raw: dict[str, Any] = field(default_factory=dict, repr=False)

    def to_dict(self) -> dict[str, Any]:
        """Serialize for CLI/lockfile."""
        return {
            "schema_version": self.schema_version,
            "name": self.name,
            "id": self.id,
            "version": self.version,
            "author": self.author,
            "description": self.description,
            "type": self.type,
            "engine": self.engine,
            "license": self.license,
            "homepage": self.homepage,
            "repository": self.repository,
            "dependencies": dict(self.dependencies),
            "capabilities": list(self.capabilities),
            "entrypoint": self.entrypoint,
            "checksum": self.checksum,
            "signature": self.signature,
        }


def parse_package_dict(data: Mapping[str, Any]) -> PackageManifest:
    """Parse a mapping into ``PackageManifest``."""
    if not isinstance(data, Mapping):
        raise AdfPackageError("package manifest root must be a mapping")

    name = str(data.get("name", "")).strip()
    pkg_id = str(data.get("id") or name).strip()
    version = str(data.get("version", "")).strip()
    pkg_type = str(data.get("type", "")).strip()

    if not name:
        raise AdfPackageError("package name is required")
    if not pkg_id:
        raise AdfPackageError("package id is required")
    if not version:
        raise AdfPackageError("package version is required")
    if pkg_type not in PACKAGE_TYPES:
        raise AdfPackageError(
            f"unsupported package type '{pkg_type}'; expected one of {PACKAGE_TYPES}"
        )

    deps_raw = data.get("dependencies") or {}
    if isinstance(deps_raw, list):
        dependencies = {str(item): "*" for item in deps_raw}
    elif isinstance(deps_raw, Mapping):
        dependencies = {str(k): str(v) for k, v in deps_raw.items()}
    else:
        raise AdfPackageError("dependencies must be a mapping or list")

    caps = data.get("capabilities") or []
    if isinstance(caps, str):
        capabilities = [caps]
    elif isinstance(caps, list):
        capabilities = [str(c) for c in caps]
    else:
        raise AdfPackageError("capabilities must be a list")

    schema = str(data.get("schema_version") or PACKAGE_SCHEMA_VERSION).strip()

    return PackageManifest(
        name=name,
        id=pkg_id,
        version=version,
        author=str(data.get("author", "YoghaLabs")).strip() or "YoghaLabs",
        description=str(data.get("description", "")).strip(),
        type=pkg_type,
        engine=str(data.get("engine", "adf-core>=0.8.0")).strip(),
        license=str(data.get("license", "MIT")).strip() or "MIT",
        homepage=str(data.get("homepage", "")).strip(),
        repository=str(data.get("repository", "")).strip(),
        dependencies=dependencies,
        capabilities=capabilities,
        entrypoint=str(data.get("entrypoint", "")).strip(),
        checksum=str(data.get("checksum", "")).strip(),
        signature=str(data.get("signature", "")).strip(),
        schema_version=schema,
        raw=dict(data),
    )


def parse_package_manifest(path: Path | str) -> PackageManifest:
    """Load and parse a ``package.yaml`` file."""
    file_path = Path(path)
    if file_path.is_dir():
        file_path = file_path / PACKAGE_MANIFEST_FILENAME
    if not file_path.is_file():
        raise AdfPackageError(f"package manifest not found: {file_path}")
    try:
        loaded = yaml.safe_load(file_path.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        raise AdfPackageError(f"invalid YAML in {file_path}: {exc}") from exc
    if loaded is None:
        raise AdfPackageError(f"empty package manifest: {file_path}")
    return parse_package_dict(loaded)
