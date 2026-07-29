"""Public ADF Python API.

Supports::

    from adf import RuntimeService
    from adf import PackageService
    from adf import GeneratorService
    from adf import SDKClient
"""

from __future__ import annotations

from sdk.client import SDKClient
from sdk.distribution import DistributionClient
from sdk.installer import InstallerClient
from sdk.marketplace import MarketplaceClient
from sdk.publisher import PublisherClient
from sdk.registry import RegistryClient
from sdk.release import ReleaseClient
from sdk.updater import UpdaterClient
from services.distribution_service import DistributionService
from services.generator_service import GeneratorService
from services.installer_service import InstallerService
from services.marketplace_service import MarketplaceService
from services.package_service import PackageService
from services.publisher_service import PublisherService
from services.registry_service import RegistryService
from services.release_service import ReleaseService
from services.runtime_service import RuntimeService
from services.service_manager import ServiceManager
from services.updater_service import UpdaterService

__all__ = [
    "DistributionClient",
    "DistributionService",
    "GeneratorService",
    "InstallerClient",
    "InstallerService",
    "MarketplaceClient",
    "MarketplaceService",
    "PackageService",
    "PublisherClient",
    "PublisherService",
    "RegistryClient",
    "RegistryService",
    "ReleaseClient",
    "ReleaseService",
    "RuntimeService",
    "SDKClient",
    "ServiceManager",
    "UpdaterClient",
    "UpdaterService",
]

__version__ = "0.12.0a0"
