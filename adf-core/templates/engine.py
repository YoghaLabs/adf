"""TemplateManager — public facade for the Template Engine."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Mapping

from templates.manifest import TemplateManifest, dump_manifest_spec, parse_manifest
from templates.renderer import TemplateRenderer
from templates.template_builder import RenderPlan, TemplateBuilder
from templates.template_loader import LoadedTemplate, TemplateLoader
from templates.template_registry import TemplateRegistry
from templates.validator import TemplateValidator
from templates.variables import VariableResolver


class TemplateManager:
    """Coordinate load, validate, resolve, register, and render operations.

    Composition root for the template engine. Runtime and generators depend on
    this facade rather than concrete loaders/renderers.
    """

    def __init__(
        self,
        *,
        search_paths: list[Path] | None = None,
        registry: TemplateRegistry | None = None,
        loader: TemplateLoader | None = None,
        validator: TemplateValidator | None = None,
        resolver: VariableResolver | None = None,
        renderer: TemplateRenderer | None = None,
        builder: TemplateBuilder | None = None,
    ) -> None:
        """Create a template manager with injectable collaborators."""
        self.search_paths = list(search_paths or [])
        self.registry = registry or TemplateRegistry()
        self.loader = loader or TemplateLoader(search_paths=self.search_paths)
        self.validator = validator or TemplateValidator()
        self.resolver = resolver or VariableResolver(strict=True)
        self.renderer = renderer or TemplateRenderer(self.resolver)
        self.builder = builder or TemplateBuilder(self.resolver, self.renderer)

    def discover(self, root: Path | str | None = None) -> list[str]:
        """Discover templates under ``root`` (or first search path) and register."""
        target = Path(root) if root is not None else (
            self.search_paths[0] if self.search_paths else None
        )
        if target is None:
            return []
        if target not in self.loader.search_paths:
            self.loader.search_paths.append(target)
        return self.registry.discover(target, loader=self.loader)

    def load(self, path: Path | str) -> LoadedTemplate:
        """Load a template package and register it."""
        loaded = self.loader.load(path)
        if loaded.name not in self.registry:
            self.registry.register(loaded)
        else:
            # Refresh registration with newly loaded instance.
            self.registry.unregister(loaded.name)
            self.registry.register(loaded)
        return loaded

    def load_by_name(self, name: str) -> LoadedTemplate:
        """Load/register a template by name, preferring the registry."""
        if name in self.registry:
            return self.registry.get(name)
        loaded = self.loader.load_by_name(name)
        self.registry.register(loaded)
        return loaded

    def validate(self, target: Path | str | LoadedTemplate | TemplateManifest) -> list[str]:
        """Validate a path, loaded template, or manifest."""
        if isinstance(target, TemplateManifest):
            return self.validator.validate_manifest(target)
        if isinstance(target, LoadedTemplate):
            return self.validator.validate_loaded(target)
        path = Path(target)
        if path.is_file():
            return self.validator.validate_manifest(parse_manifest(path))
        return self.validator.validate_package(path)

    def resolve_variables(
        self,
        text: str,
        variables: Mapping[str, Any],
    ) -> str:
        """Resolve placeholders in text."""
        return self.resolver.resolve(text, variables)

    def build_plan(
        self,
        template: LoadedTemplate | str,
        destination: Path | str,
        overrides: Mapping[str, Any] | None = None,
    ) -> RenderPlan:
        """Create a render plan for a template."""
        loaded = template if isinstance(template, LoadedTemplate) else self.load_by_name(template)
        return self.builder.build_plan(loaded, destination, overrides)

    def render(
        self,
        template: LoadedTemplate | str,
        destination: Path | str,
        overrides: Mapping[str, Any] | None = None,
        *,
        overwrite: bool = False,
    ) -> list[Path]:
        """Validate, plan, and render a template to ``destination``."""
        loaded = template if isinstance(template, LoadedTemplate) else self.load_by_name(template)
        errors = self.validate(loaded)
        if errors:
            from templates.variables import AdfTemplateError

            raise AdfTemplateError(f"Template invalid: {'; '.join(errors)}")
        plan = self.builder.build_plan(loaded, destination, overrides)
        return self.builder.execute(
            plan,
            overwrite=overwrite,
            include_parents=True,
            template=loaded,
        )

    def list(self) -> list[dict[str, Any]]:
        """List registered templates."""
        return self.registry.list()

    def manifest_spec(self) -> str:
        """Return the built-in manifest specification YAML."""
        return dump_manifest_spec()
