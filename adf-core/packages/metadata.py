"""Package type constants and metadata helpers."""

from __future__ import annotations

from typing import Final

PACKAGE_TYPES: Final[tuple[str, ...]] = (
    "plugin",
    "template",
    "generator",
    "prompt",
    "bootstrap",
    "documentation",
    "extension",
    "theme",
)

PACKAGE_MANIFEST_FILENAME = "package.yaml"
PACKAGE_SCHEMA_VERSION = "1.0"
ENGINE_COMPAT = "adf-core>=0.8.0"
