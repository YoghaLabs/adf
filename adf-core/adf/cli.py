"""ADF CLI entry point — Service Layer only (never engines directly).

Commands: boot, doctor, status, version, context, resume, plugins,
init, new, generate, dry-run, validate, install, remove, update,
search, list, verify, cache.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

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
    """Install a package from the registry."""
    return _emit(
        _manager(args).package().install(args.package_id, overwrite=bool(args.overwrite))
    )


def cmd_pkg_remove(args: argparse.Namespace) -> int:
    """Remove an installed package."""
    return _emit(_manager(args).package().remove(args.package_id))


def cmd_pkg_update(args: argparse.Namespace) -> int:
    """Update/reinstall a package from the registry."""
    return _emit(_manager(args).package().update(args.package_id))


def cmd_pkg_search(args: argparse.Namespace) -> int:
    """Search the package registry."""
    return _emit(
        _manager(args).package().search(args.query or "", package_type=args.type)
    )


def cmd_pkg_list(args: argparse.Namespace) -> int:
    """List registry or installed packages."""
    return _emit(_manager(args).package().list(installed=bool(args.installed)))


def cmd_pkg_verify(args: argparse.Namespace) -> int:
    """Verify installed package integrity against the lockfile."""
    return _emit(_manager(args).package().verify(args.package_id))


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
    parser = argparse.ArgumentParser(prog="adf", description="ADF Service Layer CLI")
    sub = parser.add_subparsers(dest="command", required=True)

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

    install_parser = sub.add_parser("install", help="Install an ADF package")
    _add_root(install_parser)
    install_parser.add_argument("package_id", help="Package id")
    install_parser.add_argument("--overwrite", action="store_true")
    install_parser.set_defaults(func=cmd_pkg_install)

    remove_parser = sub.add_parser("remove", help="Remove an installed ADF package")
    _add_root(remove_parser)
    remove_parser.add_argument("package_id", help="Package id")
    remove_parser.set_defaults(func=cmd_pkg_remove)

    update_parser = sub.add_parser("update", help="Update an ADF package from the registry")
    _add_root(update_parser)
    update_parser.add_argument("package_id", help="Package id")
    update_parser.set_defaults(func=cmd_pkg_update)

    search_parser = sub.add_parser("search", help="Search the ADF package registry")
    _add_root(search_parser)
    search_parser.add_argument("query", nargs="?", default="", help="Search query")
    search_parser.add_argument("--type", dest="type", default=None, help="Filter by package type")
    search_parser.set_defaults(func=cmd_pkg_search)

    list_pkg_parser = sub.add_parser("list", help="List registry or installed packages")
    _add_root(list_pkg_parser)
    list_pkg_parser.add_argument("--installed", action="store_true", help="List installed packages")
    list_pkg_parser.set_defaults(func=cmd_pkg_list)

    verify_parser = sub.add_parser("verify", help="Verify installed packages / lockfile")
    _add_root(verify_parser)
    verify_parser.add_argument("package_id", nargs="?", default=None, help="Optional package id")
    verify_parser.set_defaults(func=cmd_pkg_verify)

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
    try:
        return int(args.func(args))
    except (
        AdfError,
        AdfPluginError,
        AdfGeneratorError,
        AdfTemplateError,
        AdfPackageError,
        ServiceException,
    ) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
