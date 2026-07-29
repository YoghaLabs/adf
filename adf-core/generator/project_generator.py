"""Project generator facade and GeneratorManager."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from generator.bootstrap_generator import BootstrapGenerator
from generator.filesystem import AdfGeneratorError
from generator.project_builder import ProjectBuilder
from generator.project_manifest import ProjectManifest
from templates.engine import TemplateManager


class ProjectGenerator:
    """High-level project generation API."""

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
        self.bootstrap = BootstrapGenerator(
            templates, dry_run=dry_run, overwrite=overwrite
        )

    def generate(self, manifest: ProjectManifest | dict[str, Any]) -> dict[str, Any]:
        """Generate a project from a manifest or mapping."""
        if isinstance(manifest, dict):
            manifest = ProjectManifest.from_mapping(manifest)
        return self.builder.build(manifest)

    def new_project(
        self,
        name: str,
        destination: Path | str = ".",
        **kwargs: Any,
    ) -> dict[str, Any]:
        """Convenience wrapper for ``adf new``."""
        return self.bootstrap.generate(name, destination, **kwargs)


class GeneratorManager:
    """Public manager used by RuntimeEngine and CLI.

    Owns TemplateManager discovery defaults and constructs generators with
    dry-run / overwrite flags.
    """

    def __init__(
        self,
        repo_root: Path | str | None = None,
        templates: TemplateManager | None = None,
    ) -> None:
        """Create a generator manager.

        Args:
            repo_root: Optional ADF repo used to locate ``adf-templates``.
            templates: Injected TemplateManager (tests).
        """
        if templates is not None:
            self.templates = templates
        else:
            root = Path(repo_root).resolve() if repo_root else Path.cwd()
            search = root / "adf-templates"
            self.templates = TemplateManager(
                search_paths=[search] if search.is_dir() else []
            )
            if search.is_dir():
                self.templates.discover(search)
        self.repo_root = Path(repo_root).resolve() if repo_root else None

    def create(
        self,
        *,
        dry_run: bool = False,
        overwrite: bool = False,
    ) -> ProjectGenerator:
        """Create a ProjectGenerator with the given flags."""
        return ProjectGenerator(
            self.templates, dry_run=dry_run, overwrite=overwrite
        )

    def init_project(
        self,
        name: str,
        destination: Path | str = ".",
        *,
        template: str = "foundation",
        dry_run: bool = False,
        overwrite: bool = False,
        author: str = "YoghaLabs",
        version: str = "0.1.0-alpha",
    ) -> dict[str, Any]:
        """Initialize a new project (CLI ``adf init`` / ``adf new``)."""
        generator = self.create(dry_run=dry_run, overwrite=overwrite)
        return generator.new_project(
            name,
            destination,
            template=template,
            author=author,
            version=version,
        )

    def generate(
        self,
        manifest: ProjectManifest | dict[str, Any],
        *,
        dry_run: bool = False,
        overwrite: bool = False,
    ) -> dict[str, Any]:
        """Generate from an explicit manifest (CLI ``adf generate``)."""
        generator = self.create(dry_run=dry_run, overwrite=overwrite)
        return generator.generate(manifest)

    def validate_manifest(self, manifest: ProjectManifest | dict[str, Any]) -> list[str]:
        """Validate without writing."""
        if isinstance(manifest, dict):
            manifest = ProjectManifest.from_mapping(manifest)
        builder = ProjectBuilder(self.templates, dry_run=True, overwrite=True)
        return builder.validate(manifest)


# Re-export error for CLI convenience
__all__ = [
    "AdfGeneratorError",
    "GeneratorManager",
    "ProjectGenerator",
    "ProjectManifest",
]
