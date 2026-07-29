"""Template manifest model and YAML parser."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Mapping

import yaml

from runtime.exceptions import AdfError
from templates.template_metadata import TemplateMetadata

MANIFEST_FILENAME = "template.yaml"
MANIFEST_SCHEMA_VERSION = "1.0"


class AdfManifestError(AdfError):
    """Manifest parse or schema failures."""


@dataclass
class TemplateManifest:
    """Parsed ``template.yaml`` contract for a template package.

    Attributes:
        schema_version: Manifest schema version (must match engine support).
        metadata: Template identity metadata.
        variables: Declared variable defaults / descriptions.
        dependencies: Other template names this template depends on.
        capabilities: Feature flags the template provides.
        outputs: Relative output paths the template emits.
        permissions: Declared write/permission intents.
        inherits: Optional parent template name (foundation inheritance).
        plugin_compatibility: Plugin names required at generation time.
        raw: Original mapping for advanced consumers.
    """

    schema_version: str
    metadata: TemplateMetadata
    variables: dict[str, Any] = field(default_factory=dict)
    dependencies: list[str] = field(default_factory=list)
    capabilities: list[str] = field(default_factory=list)
    outputs: list[str] = field(default_factory=list)
    permissions: list[str] = field(default_factory=list)
    inherits: str | None = None
    plugin_compatibility: list[str] = field(default_factory=list)
    raw: dict[str, Any] = field(default_factory=dict, repr=False)

    @property
    def name(self) -> str:
        """Template name from metadata."""
        return self.metadata.name

    @property
    def version(self) -> str:
        """Template version from metadata."""
        return self.metadata.version

    def to_dict(self) -> dict[str, Any]:
        """Serialize for CLI/tests."""
        return {
            "schema_version": self.schema_version,
            "metadata": self.metadata.to_dict(),
            "variables": dict(self.variables),
            "dependencies": list(self.dependencies),
            "capabilities": list(self.capabilities),
            "outputs": list(self.outputs),
            "permissions": list(self.permissions),
            "inherits": self.inherits,
            "plugin_compatibility": list(self.plugin_compatibility),
        }


def parse_manifest_dict(data: Mapping[str, Any]) -> TemplateManifest:
    """Parse a mapping into ``TemplateManifest``.

    Raises:
        AdfManifestError: On missing required fields or unsupported schema.
    """
    if not isinstance(data, Mapping):
        raise AdfManifestError("Manifest root must be a mapping")

    schema = str(data.get("schema_version") or data.get("manifest_version") or "").strip()
    if not schema:
        raise AdfManifestError("Manifest requires schema_version")
    if schema.split(".")[0] != MANIFEST_SCHEMA_VERSION.split(".")[0]:
        raise AdfManifestError(
            f"Unsupported manifest schema_version={schema}; "
            f"engine supports {MANIFEST_SCHEMA_VERSION}"
        )

    meta_src = data.get("metadata")
    if not isinstance(meta_src, Mapping):
        # Allow top-level name/version for compact manifests.
        meta_src = {
            "name": data.get("name", ""),
            "version": data.get("version", ""),
            "description": data.get("description", ""),
            "author": data.get("author", "YoghaLabs"),
            "tags": data.get("tags", []),
            "build": data.get("build", ""),
        }
    metadata = TemplateMetadata.from_dict(dict(meta_src))
    if not metadata.name:
        raise AdfManifestError("Manifest metadata.name is required")
    if not metadata.version:
        raise AdfManifestError("Manifest metadata.version is required")

    variables = data.get("variables") or {}
    if not isinstance(variables, Mapping):
        raise AdfManifestError("variables must be a mapping")

    inherits = data.get("inherits")
    inherits_name = str(inherits).strip() if inherits else None

    return TemplateManifest(
        schema_version=schema,
        metadata=metadata,
        variables=dict(variables),
        dependencies=_str_list(data.get("dependencies")),
        capabilities=_str_list(data.get("capabilities")),
        outputs=_str_list(data.get("outputs")),
        permissions=_str_list(data.get("permissions")),
        inherits=inherits_name or None,
        plugin_compatibility=_str_list(data.get("plugin_compatibility")),
        raw=dict(data),
    )


def parse_manifest(path: Path | str) -> TemplateManifest:
    """Load and parse a ``template.yaml`` file."""
    file_path = Path(path)
    if not file_path.is_file():
        raise AdfManifestError(f"Manifest not found: {file_path}")
    try:
        loaded = yaml.safe_load(file_path.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        raise AdfManifestError(f"Invalid YAML in {file_path}: {exc}") from exc
    if loaded is None:
        raise AdfManifestError(f"Empty manifest: {file_path}")
    if not isinstance(loaded, Mapping):
        raise AdfManifestError(f"Manifest root must be a mapping: {file_path}")
    return parse_manifest_dict(loaded)


def dump_manifest_spec() -> str:
    """Return the built-in manifest specification as YAML text."""
    return (
        "# ADF Template Manifest Specification v1.0\n"
        f"schema_version: \"{MANIFEST_SCHEMA_VERSION}\"\n"
        "metadata:\n"
        "  name: example-template\n"
        "  version: 0.1.0\n"
        "  description: Example template\n"
        "  author: YoghaLabs\n"
        "  tags: [foundation]\n"
        "  build: BUILD-007\n"
        "variables:\n"
        "  project_name: my-project\n"
        "  author: YoghaLabs\n"
        "dependencies: []\n"
        "capabilities:\n"
        "  - scaffold\n"
        "outputs:\n"
        "  - README.md\n"
        "  - VERSION\n"
        "permissions:\n"
        "  - write-files\n"
        "inherits: null\n"
        "plugin_compatibility:\n"
        "  - template\n"
        "  - generator\n"
    )


def _str_list(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, str):
        return [value]
    if isinstance(value, list):
        return [str(item) for item in value]
    raise AdfManifestError(f"Expected list of strings, got {type(value).__name__}")
