"""Checksum helpers for distribution artifacts."""

from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any


def file_checksum(path: Path | str, *, algorithm: str = "sha256") -> str:
    """Return hex digest for a file."""
    digest = hashlib.new(algorithm)
    with Path(path).open("rb") as handle:
        for chunk in iter(lambda: handle.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()


def tree_checksum(root: Path | str, *, algorithm: str = "sha256") -> str:
    """Deterministic checksum over a directory tree."""
    base = Path(root)
    hasher = hashlib.new(algorithm)
    for path in sorted(p for p in base.rglob("*") if p.is_file()):
        rel = path.relative_to(base).as_posix()
        hasher.update(rel.encode("utf-8"))
        hasher.update(b"\0")
        hasher.update(file_checksum(path, algorithm=algorithm).encode("utf-8"))
        hasher.update(b"\0")
    return hasher.hexdigest()


def verify_file(path: Path | str, expected: str, *, algorithm: str = "sha256") -> dict[str, Any]:
    """Verify a file against an expected checksum (raw or ``algo:hex``)."""
    actual = file_checksum(path, algorithm=algorithm)
    expected_value = expected.strip()
    if expected_value.lower().startswith(f"{algorithm}:"):
        expected_value = expected_value.split(":", 1)[1]
    ok = expected_value.lower() == actual.lower()
    return {
        "ok": ok,
        "path": str(path),
        "expected": expected,
        "actual": actual,
        "algorithm": algorithm,
    }


class ChecksumManager:
    """Checksum generation/verification facade for distribution."""

    def hash_file(self, path: Path | str) -> str:
        return file_checksum(path)

    def hash_tree(self, root: Path | str) -> str:
        return tree_checksum(root)

    def verify(self, path: Path | str, expected: str) -> dict[str, Any]:
        return verify_file(path, expected)
