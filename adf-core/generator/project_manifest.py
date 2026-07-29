"""Project generation manifest (runtime options, not template.yaml)."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Mapping


@dataclass
class ProjectManifest:
    """Options describing a project to generate.

    Attributes:
        name: Project / directory name.
        template: Template name registered in TemplateManager.
        author: Author string for variables.
        version: Initial VERSION value.
        destination: Parent directory for the project root.
        extras: Additional template variables.
    """

    name: str
    template: str = "foundation"
    author: str = "YoghaLabs"
    version: str = "0.1.0-alpha"
    destination: Path = field(default_factory=lambda: Path("."))
    extras: dict[str, Any] = field(default_factory=dict)

    @property
    def project_root(self) -> Path:
        """Resolved project root path."""
        return (Path(self.destination) / self.name).resolve()

    def variables(self) -> dict[str, Any]:
        """Variable map passed to TemplateManager."""
        values = {
            "project_name": self.name,
            "author": self.author,
            "version": self.version,
        }
        values.update(self.extras)
        return values

    def to_dict(self) -> dict[str, Any]:
        """Serialize for CLI/tests."""
        return {
            "name": self.name,
            "template": self.template,
            "author": self.author,
            "version": self.version,
            "destination": str(self.destination),
            "project_root": str(self.project_root),
            "extras": dict(self.extras),
        }

    @classmethod
    def from_mapping(cls, data: Mapping[str, Any]) -> ProjectManifest:
        """Build from a mapping."""
        return cls(
            name=str(data["name"]).strip(),
            template=str(data.get("template", "foundation")).strip() or "foundation",
            author=str(data.get("author", "YoghaLabs")).strip() or "YoghaLabs",
            version=str(data.get("version", "0.1.0-alpha")).strip() or "0.1.0-alpha",
            destination=Path(str(data.get("destination", "."))),
            extras=dict(data.get("extras") or {}),
        )
