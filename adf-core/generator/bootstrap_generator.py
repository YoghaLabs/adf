"""Bootstrap-oriented generation helpers (manifest-driven)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from generator.project_builder import ProjectBuilder
from generator.project_manifest import ProjectManifest
from templates.engine import TemplateManager


class BootstrapGenerator:
    """Generate a bootstrapped ADF project from a template manifest."""

    def __init__(self, templates: TemplateManager, **builder_kwargs: Any) -> None:
        """Create a bootstrap generator."""
        self.templates = templates
        self.builder = ProjectBuilder(templates, **builder_kwargs)

    def generate(
        self,
        name: str,
        destination: Path | str = ".",
        *,
        template: str = "generic",
        author: str = "YoghaLabs",
        version: str = "0.1.0-alpha",
    ) -> dict[str, Any]:
        """Generate a bootstrapped project using the selected template."""
        manifest = ProjectManifest(
            name=name,
            template=template,
            author=author,
            version=version,
            destination=Path(destination),
        )
        return self.builder.build(manifest)
