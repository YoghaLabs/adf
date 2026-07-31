#!/usr/bin/env python3
"""Write SHA256SUMS for files in a directory (GA artifact helper)."""

from __future__ import annotations

import hashlib
import sys
from pathlib import Path


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("usage: write_checksums.py <dist-dir>")
        return 2
    root = Path(argv[1]).resolve()
    if not root.is_dir():
        print(f"not a directory: {root}")
        return 2
    lines: list[str] = []
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        if path.name in {"SHA256SUMS", "SHA256SUMS.txt"}:
            continue
        rel = path.relative_to(root).as_posix()
        lines.append(f"{sha256_file(path)}  {rel}")
    out = root / "SHA256SUMS"
    out.write_text("\n".join(lines) + ("\n" if lines else ""), encoding="utf-8")
    print(f"wrote {out} ({len(lines)} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
