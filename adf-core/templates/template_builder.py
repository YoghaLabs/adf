"""Assemble variable maps and render plans for templates."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Mapping

from templates.manifest import MANIFEST_FILENAME
from templates.renderer import TemplateRenderer
from templates.template_loader import LoadedTemplate
from templates.variables import VariableResolver


@dataclass
class RenderPlan:
    """Plan describing how a template will be rendered."""

    template_name: str
    variables: dict[str, Any]
    source_root: Path
    destination_root: Path
    inheritance_chain: list[str] = field(default_factory=list)


class TemplateBuilder:
    """Compose inheritance chains and variable defaults into a render plan."""

    def __init__(
        self,
        resolver: VariableResolver | None = None,
        renderer: TemplateRenderer | None = None,
    ) -> None:
        """Create a builder."""
        self.resolver = resolver or VariableResolver(strict=True)
        self.renderer = renderer or TemplateRenderer(self.resolver)

    def collect_variables(self, template: LoadedTemplate) -> dict[str, Any]:
        """Merge parent defaults then child defaults (child wins)."""
        chain = self.inheritance_chain(template)
        merged: dict[str, Any] = {}
        for item in chain:
            merged = self.resolver.merge(merged, item.manifest.variables)
        return merged

    def inheritance_chain(self, template: LoadedTemplate) -> list[LoadedTemplate]:
        """Return templates from root parent to child."""
        chain: list[LoadedTemplate] = []
        current: LoadedTemplate | None = template
        seen: set[str] = set()
        while current is not None:
            if current.name in seen:
                break
            seen.add(current.name)
            chain.append(current)
            current = current.parent
        chain.reverse()
        return chain

    def build_plan(
        self,
        template: LoadedTemplate,
        destination: Path | str,
        overrides: Mapping[str, Any] | None = None,
    ) -> RenderPlan:
        """Build a render plan with resolved variable map."""
        base = self.collect_variables(template)
        variables = self.resolver.merge(base, dict(overrides or {}))
        chain_names = [item.name for item in self.inheritance_chain(template)]
        return RenderPlan(
            template_name=template.name,
            variables=variables,
            source_root=template.files_root,
            destination_root=Path(destination),
            inheritance_chain=chain_names,
        )

    def execute(
        self,
        plan: RenderPlan,
        *,
        overwrite: bool = False,
        include_parents: bool = True,
        template: LoadedTemplate | None = None,
    ) -> list[Path]:
        """Execute a render plan.

        When ``include_parents`` is True and ``template`` is provided, parent
        file trees are rendered first (foundation inheritance).
        """
        written: list[Path] = []
        if include_parents and template is not None:
            for item in self.inheritance_chain(template):
                written.extend(self._render_package(item, plan, overwrite=overwrite))
            return written
        return self.renderer.render_tree(
            plan.source_root,
            plan.destination_root,
            plan.variables,
            overwrite=overwrite,
        )

    def _render_package(
        self,
        item: LoadedTemplate,
        plan: RenderPlan,
        *,
        overwrite: bool,
    ) -> list[Path]:
        """Render files for one package in the inheritance chain."""
        written: list[Path] = []
        source = item.files_root
        if not source.is_dir():
            return written
        if source == item.root:
            for path in sorted(source.iterdir()):
                if path.name == MANIFEST_FILENAME:
                    continue
                if path.is_file():
                    written.append(
                        self.renderer.render_file(
                            path,
                            plan.destination_root / path.name,
                            plan.variables,
                            overwrite=overwrite,
                        )
                    )
                elif path.is_dir() and path.name == "files":
                    written.extend(
                        self.renderer.render_tree(
                            path,
                            plan.destination_root,
                            plan.variables,
                            overwrite=overwrite,
                        )
                    )
            return written
        return self.renderer.render_tree(
            source,
            plan.destination_root,
            plan.variables,
            overwrite=overwrite,
        )
