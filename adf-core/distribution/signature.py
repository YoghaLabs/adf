"""Digital signature abstraction for distribution artifacts."""

from __future__ import annotations

import hashlib
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

from distribution.checksum import file_checksum


@dataclass
class SignatureRecord:
    """Opaque signature record (PKI-ready, local-capable)."""

    algorithm: str
    value: str
    signer: str = "YoghaLabs"

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


class SignatureManager:
    """Local signature abstraction — HMAC-like opaque digests until PKI arrives."""

    def __init__(self, *, signer: str = "YoghaLabs", secret: str = "adf-local-sign") -> None:
        self.signer = signer
        self.secret = secret

    def sign_file(self, path: Path | str) -> SignatureRecord:
        """Create an opaque signature from file checksum + signer secret."""
        digest = file_checksum(path)
        payload = f"{self.signer}:{digest}:{self.secret}".encode("utf-8")
        value = hashlib.sha256(payload).hexdigest()
        return SignatureRecord(algorithm="adf-opaque-sha256", value=value, signer=self.signer)

    def verify_file(self, path: Path | str, signature: str | SignatureRecord) -> dict[str, Any]:
        """Verify an opaque signature for a file."""
        expected = signature.value if isinstance(signature, SignatureRecord) else str(signature)
        actual = self.sign_file(path)
        ok = actual.value == expected
        return {
            "ok": ok,
            "path": str(path),
            "expected": expected,
            "actual": actual.value,
            "algorithm": actual.algorithm,
            "signer": actual.signer,
        }
