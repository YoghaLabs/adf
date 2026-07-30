"""Semantic version parsing and constraint matching."""

from __future__ import annotations

import re
from dataclasses import dataclass

from packages.manifest import AdfPackageError

_SEMVER_RE = re.compile(
    r"^v?(?P<major>0|[1-9]\d*)\.(?P<minor>0|[1-9]\d*)\.(?P<patch>0|[1-9]\d*)"
    r"(?:-(?P<pre>[0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$"
)


@dataclass(frozen=True, order=True)
class SemVer:
    """Comparable semantic version."""

    major: int
    minor: int
    patch: int
    pre: str = ""

    @classmethod
    def parse(cls, text: str) -> SemVer:
        """Parse a semver string (allows optional leading ``v`` and pre-release)."""
        match = _SEMVER_RE.match(str(text).strip())
        if not match:
            # Allow ADF-style 0.9.0-alpha by normalizing.
            alt = str(text).strip().lstrip("v")
            alt_match = re.match(
                r"^(?P<major>0|[1-9]\d*)\.(?P<minor>0|[1-9]\d*)\.(?P<patch>0|[1-9]\d*)"
                r"(?:-(?P<pre>[0-9A-Za-z.-]+))?$",
                alt,
            )
            if not alt_match:
                raise AdfPackageError(f"invalid semantic version: {text}")
            match = alt_match
        return cls(
            major=int(match.group("major")),
            minor=int(match.group("minor")),
            patch=int(match.group("patch")),
            pre=str(match.group("pre") or ""),
        )

    def __str__(self) -> str:
        base = f"{self.major}.{self.minor}.{self.patch}"
        return f"{base}-{self.pre}" if self.pre else base


def _cmp_semver(a: SemVer, b: SemVer) -> int:
    for left, right in (
        (a.major, b.major),
        (a.minor, b.minor),
        (a.patch, b.patch),
    ):
        if left != right:
            return -1 if left < right else 1
    # No pre-release sorts after pre-release (semver rule approximation).
    if a.pre == b.pre:
        return 0
    if not a.pre:
        return 1
    if not b.pre:
        return -1
    return -1 if a.pre < b.pre else 1


def satisfies(version: str, constraint: str) -> bool:
    """Return True if ``version`` satisfies a simple constraint.

    Supported:
    - ``*`` / empty — any
    - exact ``1.2.3``
    - ``^1.2.3`` compatible major (or minor when major=0)
    - ``~1.2.3`` same major.minor, patch >=
    - ``>=1.2.3`` / ``>`` / ``<=`` / ``<``
    """
    constraint = str(constraint or "*").strip()
    if constraint in {"*", "", "latest"}:
        return True
    ver = SemVer.parse(version)

    if constraint.startswith("^"):
        base = SemVer.parse(constraint[1:])
        if ver.major != base.major:
            return False
        if base.major == 0 and ver.minor != base.minor:
            return False
        return _cmp_semver(ver, base) >= 0

    if constraint.startswith("~"):
        base = SemVer.parse(constraint[1:])
        return (
            ver.major == base.major
            and ver.minor == base.minor
            and _cmp_semver(ver, base) >= 0
        )

    for op in (">=", "<=", ">", "<"):
        if constraint.startswith(op):
            base = SemVer.parse(constraint[len(op) :])
            cmp = _cmp_semver(ver, base)
            if op == ">=":
                return cmp >= 0
            if op == "<=":
                return cmp <= 0
            if op == ">":
                return cmp > 0
            return cmp < 0

    return SemVer.parse(constraint) == ver


def is_valid_version(version: str) -> bool:
    """Return True when ``version`` parses as semver."""
    try:
        SemVer.parse(version)
        return True
    except AdfPackageError:
        return False
