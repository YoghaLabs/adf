"""Resolve templates including inheritance and dependencies."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from generator.manifest_loader import ManifestLoader
from templates.engine import TemplateManager
from templates.template_builder import TemplateBuilder
from templates.template_loader import LoadedTemplate
from templates.variables import AdfTemplateError, VariableResolver


@dataclass
class ResolvedTemplate:
    """Fully resolved template graph for generation."""

    primary: LoadedTemplate
    chain: list[LoadedTemplate]
    dependencies: list[LoadedTemplate] = field(default_factory=list)
    variables: dict[str, Any] = field(default_factory=dict)
    capabilities: list[str] = field(default_factory=list)

    @property
    def name(self) -> str:
        return self.primary.name


class TemplateResolver:
    """Resolve parent inheritance, dependencies, and variable defaults."""

    def __init__(
        self,
        templates: TemplateManager,
        *,
        loader: ManifestLoader | None = None,
        builder: TemplateBuilder | None = None,
        resolver: VariableResolver | None = None,
    ) -> None:
        """Create a resolver."""
        self.templates = templates
        self.loader = loader or ManifestLoader(templates)
        self.builder = builder or TemplateBuilder()
        self.resolver = resolver or VariableResolver(strict=True)

    def resolve(
        self,
        name: str,
        overrides: dict[str, Any] | None = None,
    ) -> ResolvedTemplate:
        """Resolve a template by name via the Template Registry/search paths."""
        primary = self.loader.load_named(name)
        chain = self.builder.inheritance_chain(primary)
        deps: list[LoadedTemplate] = []
        seen = {item.name for item in chain}
        for item in chain:
            for dep_name in item.manifest.dependencies:
                if dep_name in seen:
                    continue
                try:
                    dep = self.loader.load_named(dep_name)
                except AdfTemplateError as exc:
                    raise AdfTemplateError(
                        f"Unresolved template dependency '{dep_name}' for {item.name}: {exc}"
                    ) from exc
                deps.append(dep)
                seen.add(dep.name)
        base_vars = self.builder.collect_variables(primary)
        variables = self.resolver.merge(base_vars, dict(overrides or {}))
        capabilities: list[str] = []
        for item in chain:
            for cap in item.manifest.capabilities:
                if cap not in capabilities:
                    capabilities.append(cap)
        return ResolvedTemplate(
            primary=primary,
            chain=chain,
            dependencies=deps,
            variables=variables,
            capabilities=capabilities,
        )
