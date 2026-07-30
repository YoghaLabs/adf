"""ADF CLI entry point — Service Layer only (never engines directly).

Commands: boot, doctor, status, version, context, resume, studio, plugins,
init, new, generate, dry-run, validate, install, remove, update,
search, list, verify, cache, …

Quick Start: adf-docs/quickstart/README.md
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any

from distribution.manifest import AdfDistributionError
from generator.filesystem import AdfGeneratorError
from loader.project_loader import ProjectLoader
from packages.manifest import AdfPackageError
from plugins.manager import AdfPluginError
from runtime.exceptions import AdfError
from services.contracts import ServiceException
from services.service_manager import ServiceManager
from templates.variables import AdfTemplateError


def _print_json(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, indent=2, sort_keys=True))


def _resolve_root(explicit: str | None) -> Path:
    if explicit:
        return Path(explicit).resolve()
    try:
        return ProjectLoader.find_root().repo_root
    except AdfError:
        return Path.cwd().resolve()


def _add_root(subparser: argparse.ArgumentParser) -> None:
    subparser.add_argument(
        "--root",
        help="ADF repository root (auto-detected when omitted)",
    )


def _manager(args: argparse.Namespace) -> ServiceManager:
    """CLI must obtain engines only through ServiceManager."""
    manager = ServiceManager(_resolve_root(getattr(args, "root", None)))
    manager.configure_defaults()
    return manager


def _emit(result: Any) -> int:
    payload = result.to_dict() if hasattr(result, "to_dict") else dict(result)
    _print_json(payload if "ok" in payload else payload)
    if hasattr(result, "ok"):
        return 0 if result.ok else 1
    return 0 if payload.get("ok", True) else 1


def cmd_version(args: argparse.Namespace) -> int:
    """Print package version via RuntimeService."""
    return _emit(_manager(args).runtime().version())


def cmd_boot(args: argparse.Namespace) -> int:
    """Boot all services and the runtime engine."""
    return _emit(_manager(args).boot())


def cmd_doctor(args: argparse.Namespace) -> int:
    """Run repository health checks."""
    return _emit(_manager(args).runtime().doctor())


def cmd_status(args: argparse.Namespace) -> int:
    """Show derived project status."""
    return _emit(_manager(args).runtime().status())


def cmd_context(args: argparse.Namespace) -> int:
    """Assemble a context pack."""
    return _emit(_manager(args).context().assemble(args.pack))


def cmd_resume(args: argparse.Namespace) -> int:
    """Resume protocol skeleton."""
    return _emit(_manager(args).runtime().resume())


def cmd_studio(args: argparse.Namespace) -> int:
    """Open ADF Studio (Control Center) or print launch instructions.

    Usability helper only — does not redesign Studio or CLI architecture.
    """
    root = _resolve_root(getattr(args, "root", None))
    studio_dir = root / "adf-studio"
    package_json = studio_dir / "package.json"
    guidance = {
        "ok": True,
        "data": {
            "studio_dir": str(studio_dir),
            "quick_start": "adf-docs/quickstart/README.md",
            "manual": "cd adf-studio && npm install && npm run dev",
            "note": "Studio is a control center, not an IDE.",
        },
    }
    if not package_json.is_file():
        guidance["ok"] = False
        guidance["error"] = f"adf-studio not found under {root}"
        _print_json(guidance)
        return 1
    if getattr(args, "print_only", False):
        _print_json(guidance)
        return 0
    npm = "npm.cmd" if os.name == "nt" else "npm"
    try:
        print(f"Starting ADF Studio from {studio_dir} …", file=sys.stderr)
        print("Quick Start: adf-docs/quickstart/README.md", file=sys.stderr)
        completed = subprocess.run(
            [npm, "run", "dev"],
            cwd=str(studio_dir),
            check=False,
        )
        return int(completed.returncode)
    except FileNotFoundError:
        guidance["ok"] = False
        guidance["error"] = "npm not found — install Node.js 20+ or run manually"
        _print_json(guidance)
        return 1


def cmd_plugins(args: argparse.Namespace) -> int:
    """Plugin CLI: list|info|enable|disable."""
    plugins = _manager(args).plugin()
    action = args.plugins_command
    if action == "list":
        return _emit(plugins.list())
    if action == "info":
        return _emit(plugins.info(args.name))
    if action == "enable":
        return _emit(plugins.enable(args.name))
    if action == "disable":
        return _emit(plugins.disable(args.name))
    _print_json({"error": f"unknown plugins command: {action}", "ok": False})
    return 2


def _gen_flags(args: argparse.Namespace) -> dict[str, Any]:
    return {
        "template": args.template,
        "dry_run": bool(args.dry_run),
        "overwrite": bool(args.overwrite),
        "author": args.author,
        "version": args.project_version,
    }


def cmd_pkg_install(args: argparse.Namespace) -> int:
    """Install a package id or distribution artifact via InstallerService."""
    return _emit(
        _manager(args).installer().install(
            args.target,
            overwrite=bool(args.overwrite),
            mode=getattr(args, "mode", "auto") or "auto",
        )
    )


def cmd_pkg_remove(args: argparse.Namespace) -> int:
    """Remove an installed package."""
    return _emit(_manager(args).package().remove(args.package_id))


def cmd_uninstall(args: argparse.Namespace) -> int:
    """Uninstall a distribution install or package."""
    return _emit(
        _manager(args).installer().uninstall(
            args.install_id, package=bool(args.package)
        )
    )


def cmd_pkg_update(args: argparse.Namespace) -> int:
    """Update packages or run distribution updater flows."""
    updater = _manager(args).updater()
    if bool(getattr(args, "apply", False)):
        return _emit(updater.apply(overwrite=True))
    if bool(getattr(args, "check", False)) or not getattr(args, "package_id", None):
        if getattr(args, "version", None):
            return _emit(updater.download(args.version, channel=args.channel))
        return _emit(updater.check(channel=args.channel))
    return _emit(_manager(args).marketplace().update(args.package_id))


def cmd_rollback(args: argparse.Namespace) -> int:
    """Rollback distribution install to a snapshot."""
    return _emit(_manager(args).updater().rollback(args.snapshot_id))


def cmd_release(args: argparse.Namespace) -> int:
    """Release management commands."""
    release = _manager(args).release()
    action = args.release_command
    if action == "channels":
        return _emit(release.channels())
    if action == "list":
        return _emit(release.list(channel=args.channel))
    if action == "create":
        kinds = args.kinds.split(",") if args.kinds else None
        return _emit(
            release.create(
                args.source,
                version=args.version,
                channel=args.channel,
                name=args.name,
                notes=args.notes or "",
                kinds=kinds,
            )
        )
    if action == "publish":
        return _emit(release.publish(args.version, channel=args.channel))
    if action == "promote":
        return _emit(
            release.promote(
                args.version,
                source_channel=args.source_channel,
                target_channel=args.target_channel,
            )
        )
    if action == "archive":
        return _emit(release.archive(args.version, channel=args.channel))
    _print_json({"ok": False, "error": f"unknown release command: {action}"})
    return 2


def cmd_package(args: argparse.Namespace) -> int:
    """Build a distribution package artifact."""
    return _emit(
        _manager(args).distribution().package(
            args.source, name=args.name, version=args.version, kind=args.kind
        )
    )


def cmd_bundle(args: argparse.Namespace) -> int:
    """Build a distribution bundle."""
    return _emit(
        _manager(args).distribution().bundle(
            args.source, name=args.name, version=args.version, kind=args.kind
        )
    )


def cmd_pkg_search(args: argparse.Namespace) -> int:
    """Search the marketplace / registry."""
    kwargs: dict[str, Any] = {}
    if args.type:
        kwargs["category"] = args.type
    if getattr(args, "verified", False):
        kwargs["verified_only"] = True
    if getattr(args, "publisher", None):
        kwargs["publisher"] = args.publisher
    mode = getattr(args, "mode", None)
    market = _manager(args).marketplace()
    if mode == "featured":
        return _emit(market.featured())
    if mode == "popular":
        return _emit(market.popular())
    if mode == "newest":
        return _emit(market.newest())
    return _emit(market.search(args.query or "", **kwargs))


def cmd_pkg_list(args: argparse.Namespace) -> int:
    """List registry or installed packages."""
    if bool(args.installed):
        return _emit(_manager(args).package().list(installed=True))
    return _emit(_manager(args).registry().list())


def cmd_pkg_verify(args: argparse.Namespace) -> int:
    """Verify installed packages / distribution installs / security."""
    return _emit(_manager(args).installer().verify(args.package_id))


def cmd_publish(args: argparse.Namespace) -> int:
    """Publish a package directory into the local registry."""
    return _emit(
        _manager(args).publisher().publish(
            args.source,
            publisher_id=args.publisher_id,
            overwrite=bool(args.overwrite),
        )
    )


def cmd_registry(args: argparse.Namespace) -> int:
    """Registry status / providers."""
    registry = _manager(args).registry()
    action = getattr(args, "registry_command", "status")
    if action == "providers":
        return _emit(registry.providers())
    return _emit(registry.status())


def cmd_sync(args: argparse.Namespace) -> int:
    """Synchronize local registry mirror."""
    return _emit(
        _manager(args).registry().sync(incremental=not bool(args.full))
    )


def cmd_pkg_cache(args: argparse.Namespace) -> int:
    """Inspect or clear the APM cache."""
    packages = _manager(args).package()
    if args.cache_command == "clear":
        return _emit(packages.cache_clear())
    return _emit(packages.cache_stats())


def cmd_init(args: argparse.Namespace) -> int:
    """Initialize a new ADF project (``adf init``)."""
    return _emit(
        _manager(args).generator().init_project(
            args.name, args.destination, **_gen_flags(args)
        )
    )


def cmd_new(args: argparse.Namespace) -> int:
    """Create a new ADF project (``adf new``)."""
    return cmd_init(args)


def cmd_generate(args: argparse.Namespace) -> int:
    """Generate from an explicit manifest (``adf generate``)."""
    generator = _manager(args).generator()
    manifest = {
        "name": args.name,
        "template": args.template,
        "author": args.author,
        "version": args.project_version,
        "destination": args.destination,
    }
    if getattr(args, "validate_only", False):
        return _emit(generator.validate(manifest))
    return _emit(
        generator.generate(
            manifest,
            dry_run=bool(args.dry_run),
            overwrite=bool(args.overwrite),
        )
    )


def cmd_dry_run(args: argparse.Namespace) -> int:
    """Preview generation without writing (``adf dry-run``)."""
    manifest = {
        "name": args.name,
        "template": args.template,
        "author": args.author,
        "version": args.project_version,
        "destination": args.destination,
    }
    return _emit(_manager(args).generator().dry_run(manifest))


def cmd_validate(args: argparse.Namespace) -> int:
    """Validate generation inputs (``adf validate``)."""
    manifest = {
        "name": args.name,
        "template": args.template,
        "author": args.author,
        "version": args.project_version,
        "destination": args.destination,
    }
    return _emit(_manager(args).generator().validate(manifest))


def _add_generator_args(parser: argparse.ArgumentParser) -> None:
    _add_root(parser)
    parser.add_argument("name", help="New project name")
    parser.add_argument(
        "--destination",
        default=".",
        help="Parent directory for the new project",
    )
    parser.add_argument(
        "--template",
        default="generic",
        help="Template/project type (default: generic)",
    )
    parser.add_argument(
        "--author",
        default="YoghaLabs",
        help="Author variable for templates",
    )
    parser.add_argument(
        "--project-version",
        default="0.1.0-alpha",
        help="Initial project VERSION value",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Plan generation without writing files",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Allow writing into a non-empty destination",
    )


def build_parser() -> argparse.ArgumentParser:
    """Create the CLI argument parser."""
    parser = argparse.ArgumentParser(
        prog="adf",
        description="ADF Service Layer CLI — AI Development Framework",
        epilog=(
            "Quick Start: adf-docs/quickstart/README.md\n"
            "First run:  python -m adf doctor --root . && "
            "python -m adf init my-first-project && python -m adf studio\n"
            "Install:    ./install   (Windows: .\\install.ps1)"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    sub = parser.add_subparsers(dest="command", required=False)

    version_parser = sub.add_parser("version", help="Show adf-core version")
    _add_root(version_parser)
    version_parser.set_defaults(func=cmd_version)

    boot_parser = sub.add_parser("boot", help="Boot services and runtime engine")
    _add_root(boot_parser)
    boot_parser.set_defaults(func=cmd_boot)

    doctor_parser = sub.add_parser("doctor", help="Validate repository layout/SSOT")
    _add_root(doctor_parser)
    doctor_parser.set_defaults(func=cmd_doctor)

    status_parser = sub.add_parser("status", help="Show project status")
    _add_root(status_parser)
    status_parser.set_defaults(func=cmd_status)

    context_parser = sub.add_parser("context", help="Assemble a context pack")
    _add_root(context_parser)
    context_parser.add_argument(
        "--pack",
        default="standard",
        choices=["quick", "standard", "deep"],
        help="Context pack size",
    )
    context_parser.set_defaults(func=cmd_context)

    resume_parser = sub.add_parser("resume", help="Resume skeleton")
    _add_root(resume_parser)
    resume_parser.set_defaults(func=cmd_resume)

    studio_parser = sub.add_parser(
        "studio",
        help="Open ADF Studio Control Center (or print launch instructions)",
    )
    _add_root(studio_parser)
    studio_parser.add_argument(
        "--print-only",
        action="store_true",
        help="Print launch instructions as JSON without starting Vite",
    )
    studio_parser.set_defaults(func=cmd_studio)

    plugins_parser = sub.add_parser("plugins", help="Plugin management")
    plugins_sub = plugins_parser.add_subparsers(dest="plugins_command", required=True)

    list_parser = plugins_sub.add_parser("list", help="List plugins")
    _add_root(list_parser)
    list_parser.set_defaults(func=cmd_plugins)

    info_parser = plugins_sub.add_parser("info", help="Show plugin info")
    _add_root(info_parser)
    info_parser.add_argument("name", help="Plugin name")
    info_parser.set_defaults(func=cmd_plugins)

    enable_parser = plugins_sub.add_parser("enable", help="Enable plugin")
    _add_root(enable_parser)
    enable_parser.add_argument("name", help="Plugin name")
    enable_parser.set_defaults(func=cmd_plugins)

    disable_parser = plugins_sub.add_parser("disable", help="Disable plugin")
    _add_root(disable_parser)
    disable_parser.add_argument("name", help="Plugin name")
    disable_parser.set_defaults(func=cmd_plugins)

    init_parser = sub.add_parser("init", help="Initialize a new ADF project")
    _add_generator_args(init_parser)
    init_parser.set_defaults(func=cmd_init)

    new_parser = sub.add_parser("new", help="Create a new ADF project")
    _add_generator_args(new_parser)
    new_parser.set_defaults(func=cmd_new)

    generate_parser = sub.add_parser("generate", help="Generate project from manifest options")
    _add_generator_args(generate_parser)
    generate_parser.add_argument(
        "--validate-only",
        action="store_true",
        help="Validate manifest without generating",
    )
    generate_parser.set_defaults(func=cmd_generate)

    dry_run_parser = sub.add_parser("dry-run", help="Preview project generation without writing")
    _add_generator_args(dry_run_parser)
    dry_run_parser.set_defaults(func=cmd_dry_run)

    validate_parser = sub.add_parser("validate", help="Validate generation inputs")
    _add_generator_args(validate_parser)
    validate_parser.set_defaults(func=cmd_validate)

    install_parser = sub.add_parser("install", help="Install a package or distribution artifact")
    _add_root(install_parser)
    install_parser.add_argument("target", help="Package id or artifact/manifest path")
    install_parser.add_argument("--overwrite", action="store_true")
    install_parser.add_argument(
        "--mode",
        choices=["auto", "package", "distribution", "bundle"],
        default="auto",
        help="Install mode (default: auto)",
    )
    install_parser.set_defaults(func=cmd_pkg_install)

    remove_parser = sub.add_parser("remove", help="Remove an installed ADF package")
    _add_root(remove_parser)
    remove_parser.add_argument("package_id", help="Package id")
    remove_parser.set_defaults(func=cmd_pkg_remove)

    uninstall_parser = sub.add_parser("uninstall", help="Uninstall distribution install or package")
    _add_root(uninstall_parser)
    uninstall_parser.add_argument("install_id", help="Install id or package id")
    uninstall_parser.add_argument(
        "--package",
        action="store_true",
        help="Force package uninstall via PackageManager",
    )
    uninstall_parser.set_defaults(func=cmd_uninstall)

    update_parser = sub.add_parser("update", help="Update package or check/apply distribution updates")
    _add_root(update_parser)
    update_parser.add_argument("package_id", nargs="?", default=None, help="Package id (APM update)")
    update_parser.add_argument("--check", action="store_true", help="Check distribution updates")
    update_parser.add_argument("--apply", action="store_true", help="Apply downloaded update")
    update_parser.add_argument("--version", default=None, help="Download a release version")
    update_parser.add_argument("--channel", default=None, help="Release channel")
    update_parser.set_defaults(func=cmd_pkg_update)

    rollback_parser = sub.add_parser("rollback", help="Rollback distribution install")
    _add_root(rollback_parser)
    rollback_parser.add_argument("snapshot_id", nargs="?", default=None, help="Snapshot id")
    rollback_parser.set_defaults(func=cmd_rollback)

    search_parser = sub.add_parser("search", help="Search the ADF marketplace/registry")
    _add_root(search_parser)
    search_parser.add_argument("query", nargs="?", default="", help="Search query")
    search_parser.add_argument("--type", dest="type", default=None, help="Filter by package type")
    search_parser.add_argument("--verified", action="store_true", help="Verified packages only")
    search_parser.add_argument("--publisher", default=None, help="Filter by publisher")
    search_parser.add_argument(
        "--mode",
        choices=["featured", "popular", "newest"],
        default=None,
        help="Marketplace shelf mode",
    )
    search_parser.set_defaults(func=cmd_pkg_search)

    list_pkg_parser = sub.add_parser("list", help="List registry or installed packages")
    _add_root(list_pkg_parser)
    list_pkg_parser.add_argument("--installed", action="store_true", help="List installed packages")
    list_pkg_parser.set_defaults(func=cmd_pkg_list)

    verify_parser = sub.add_parser("verify", help="Verify installed packages / distribution / security")
    _add_root(verify_parser)
    verify_parser.add_argument("package_id", nargs="?", default=None, help="Optional package/install id")
    verify_parser.set_defaults(func=cmd_pkg_verify)

    release_parser = sub.add_parser("release", help="Release management")
    release_sub = release_parser.add_subparsers(dest="release_command", required=True)
    rel_channels = release_sub.add_parser("channels", help="List release channels")
    _add_root(rel_channels)
    rel_channels.set_defaults(func=cmd_release, release_command="channels")
    rel_list = release_sub.add_parser("list", help="List releases")
    _add_root(rel_list)
    rel_list.add_argument("--channel", default=None)
    rel_list.set_defaults(func=cmd_release, release_command="list")
    rel_create = release_sub.add_parser("create", help="Create a release from a source tree")
    _add_root(rel_create)
    rel_create.add_argument("source", help="Source directory")
    rel_create.add_argument("--version", required=True)
    rel_create.add_argument("--channel", default="alpha")
    rel_create.add_argument("--name", default="adf")
    rel_create.add_argument("--notes", default="")
    rel_create.add_argument("--kinds", default="zip,tar.gz,wheel", help="Comma-separated kinds")
    rel_create.set_defaults(func=cmd_release, release_command="create")
    rel_publish = release_sub.add_parser("publish", help="Publish a created release")
    _add_root(rel_publish)
    rel_publish.add_argument("version")
    rel_publish.add_argument("--channel", default="alpha")
    rel_publish.set_defaults(func=cmd_release, release_command="publish")
    rel_promote = release_sub.add_parser("promote", help="Promote release across channels")
    _add_root(rel_promote)
    rel_promote.add_argument("version")
    rel_promote.add_argument("--from", dest="source_channel", required=True)
    rel_promote.add_argument("--to", dest="target_channel", required=True)
    rel_promote.set_defaults(func=cmd_release, release_command="promote")
    rel_archive = release_sub.add_parser("archive", help="Archive a release")
    _add_root(rel_archive)
    rel_archive.add_argument("version")
    rel_archive.add_argument("--channel", default="alpha")
    rel_archive.set_defaults(func=cmd_release, release_command="archive")

    package_parser = sub.add_parser("package", help="Build a distribution package artifact")
    _add_root(package_parser)
    package_parser.add_argument("source")
    package_parser.add_argument("--name", default="adf")
    package_parser.add_argument("--version", required=True)
    package_parser.add_argument("--kind", default="zip")
    package_parser.set_defaults(func=cmd_package)

    bundle_parser = sub.add_parser("bundle", help="Build a portable/offline/enterprise bundle")
    _add_root(bundle_parser)
    bundle_parser.add_argument("source")
    bundle_parser.add_argument("--name", default="adf")
    bundle_parser.add_argument("--version", required=True)
    bundle_parser.add_argument(
        "--kind",
        default="portable",
        choices=["portable", "offline", "enterprise", "desktop", "zip"],
    )
    bundle_parser.set_defaults(func=cmd_bundle)

    publish_parser = sub.add_parser("publish", help="Publish a package into the local registry")
    _add_root(publish_parser)
    publish_parser.add_argument("source", help="Path to package directory")
    publish_parser.add_argument("--publisher-id", default="YoghaLabs")
    publish_parser.add_argument("--overwrite", action="store_true")
    publish_parser.set_defaults(func=cmd_publish)

    registry_parser = sub.add_parser("registry", help="Registry status and providers")
    registry_sub = registry_parser.add_subparsers(dest="registry_command")
    reg_status = registry_sub.add_parser("status", help="Registry status")
    _add_root(reg_status)
    reg_status.set_defaults(func=cmd_registry, registry_command="status")
    reg_providers = registry_sub.add_parser("providers", help="List registry providers")
    _add_root(reg_providers)
    reg_providers.set_defaults(func=cmd_registry, registry_command="providers")
    _add_root(registry_parser)
    registry_parser.set_defaults(func=cmd_registry, registry_command="status")

    sync_parser = sub.add_parser("sync", help="Sync local registry mirror")
    _add_root(sync_parser)
    sync_parser.add_argument("--full", action="store_true", help="Full sync (not incremental)")
    sync_parser.set_defaults(func=cmd_sync)

    cache_parser = sub.add_parser("cache", help="APM cache stats/clear")
    cache_sub = cache_parser.add_subparsers(dest="cache_command")
    cache_stats = cache_sub.add_parser("stats", help="Show cache stats")
    _add_root(cache_stats)
    cache_stats.set_defaults(func=cmd_pkg_cache, cache_command="stats")
    cache_clear = cache_sub.add_parser("clear", help="Clear cache")
    _add_root(cache_clear)
    cache_clear.set_defaults(func=cmd_pkg_cache, cache_command="clear")
    _add_root(cache_parser)
    cache_parser.set_defaults(func=cmd_pkg_cache, cache_command="stats")

    return parser


def main(argv: list[str] | None = None) -> int:
    """CLI main entry."""
    parser = build_parser()
    args = parser.parse_args(argv)
    if not getattr(args, "command", None):
        parser.print_help()
        print(
            "\nTip: python -m adf doctor --root .\n"
            "Quick Start: adf-docs/quickstart/README.md",
            file=sys.stderr,
        )
        return 0
    try:
        return int(args.func(args))
    except (
        AdfError,
        AdfPluginError,
        AdfGeneratorError,
        AdfTemplateError,
        AdfPackageError,
        AdfDistributionError,
        ServiceException,
    ) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
