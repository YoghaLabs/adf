"""Dependency graph resolution with cycle detection."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Callable

from packages.dependency import satisfies
from packages.manifest import AdfPackageError, PackageManifest


@dataclass
class ResolvedNode:
    """A node in the resolved dependency plan."""

    package_id: str
    version: str
    constraint: str
    depends_on: list[str] = field(default_factory=list)


@dataclass
class ResolvePlan:
    """Ordered install plan (dependencies before dependents)."""

    nodes: list[ResolvedNode]

    def ids(self) -> list[str]:
        return [node.package_id for node in self.nodes]


LookupFn = Callable[[str], PackageManifest]


class DependencyResolver:
    """Resolve package dependencies with circular detection and semver checks."""

    def resolve(
        self,
        root: PackageManifest,
        lookup: LookupFn,
        *,
        installed: dict[str, str] | None = None,
    ) -> ResolvePlan:
        """Return a dependency-first install plan for ``root``.

        Args:
            root: Root package manifest to install.
            lookup: Callable returning the preferred manifest for a package id.
            installed: Optional already-installed id→version map.
        """
        installed = dict(installed or {})
        visiting: set[str] = set()
        visited: set[str] = set()
        order: list[ResolvedNode] = []

        def walk(manifest: PackageManifest, via: str) -> None:
            pkg_id = manifest.id
            if pkg_id in visiting:
                raise AdfPackageError(
                    f"circular dependency detected involving '{pkg_id}' (via {via})"
                )
            if pkg_id in visited:
                return
            visiting.add(pkg_id)
            child_ids: list[str] = []
            for dep_id, constraint in manifest.dependencies.items():
                if dep_id in installed and satisfies(installed[dep_id], constraint):
                    child_ids.append(dep_id)
                    continue
                dep_manifest = lookup(dep_id)
                if not satisfies(dep_manifest.version, constraint):
                    raise AdfPackageError(
                        f"dependency '{dep_id}' version {dep_manifest.version} "
                        f"does not satisfy '{constraint}' required by {pkg_id}"
                    )
                walk(dep_manifest, via=pkg_id)
                child_ids.append(dep_id)
            visiting.remove(pkg_id)
            visited.add(pkg_id)
            order.append(
                ResolvedNode(
                    package_id=pkg_id,
                    version=manifest.version,
                    constraint=via,
                    depends_on=child_ids,
                )
            )

        walk(root, via="root")
        return ResolvePlan(nodes=order)
