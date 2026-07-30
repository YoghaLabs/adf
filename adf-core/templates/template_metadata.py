"""Template metadata model."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(frozen=True)
class TemplateMetadata:
    """Descriptive metadata for a template package.

    Attributes:
        name: Unique template identifier.
        version: Semver-like template version string.
        description: Human-readable purpose.
        author: Optional author or org.
        tags: Classification tags.
        build: ADF build that introduced the template.
    """

    name: str
    version: str
    description: str = ""
    author: str = "YoghaLabs"
    tags: tuple[str, ...] = ()
    build: str = ""

    def to_dict(self) -> dict[str, Any]:
        """Serialize metadata for JSON/CLI output."""
        return {
            "name": self.name,
            "version": self.version,
            "description": self.description,
            "author": self.author,
            "tags": list(self.tags),
            "build": self.build,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> TemplateMetadata:
        """Build metadata from a mapping."""
        tags = data.get("tags") or []
        return cls(
            name=str(data.get("name", "")).strip(),
            version=str(data.get("version", "")).strip(),
            description=str(data.get("description", "")).strip(),
            author=str(data.get("author", "YoghaLabs")).strip() or "YoghaLabs",
            tags=tuple(str(t) for t in tags),
            build=str(data.get("build", "")).strip(),
        )
