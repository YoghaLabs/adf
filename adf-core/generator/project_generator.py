"""Project generator — read manifests, resolve, and generate projects."""

from __future__ import annotations

from typing import Any

from generator.bootstrap_generator import BootstrapGenerator
from generator.project_builder import ProjectBuilder
from generator.project_manifest import ProjectManifest
from templates.engine import TemplateManager


class ProjectGenerator:
    """Responsible for end-to-end project generation from template metadata.

    Reads template manifests, resolves variables/dependencies/inheritance,
    and emits the project tree declared by templates (documentation, prompts,
    `.adf`, runtime config, bootstrap package, etc.).
    """

    def __init__(
        self,
        templates: TemplateManager,
        *,
        dry_run: bool = False,
        overwrite: bool = False,
    ) -> None:
        """Create a project generator."""
        self.templates = templates
        self.dry_run = dry_run
        self.overwrite = overwrite
        self.builder = ProjectBuilder(
            templates, dry_run=dry_run, overwrite=overwrite
        )
        self.bootstrap = BootstrapGenerator(templates, dry_run=dry_run, overwrite=overwrite)
        # Share one builder/journal across bootstrap and generate paths.
        self.bootstrap.builder = self.builder

    def generate(self, manifest: ProjectManifest | dict[str, Any]) -> dict[str, Any]:
        """Generate a project from a manifest or mapping."""
        if isinstance(manifest, dict):
            manifest = ProjectManifest.from_mapping(manifest)
        return self.builder.build(manifest)

    def new_project(
        self,
        name: str,
        destination: str | Any = ".",
        **kwargs: Any,
    ) -> dict[str, Any]:
        """Convenience wrapper for ``adf new`` / ``adf init``."""
        return self.bootstrap.generate(name, destination, **kwargs)
