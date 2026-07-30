# ADF Documentation

Human-facing documentation for the AI Development Framework.

## Contents

| Doc | Description |
|-----|-------------|
| `WHAT_IS_ADF.md` | Product definition and value proposition |
| `GETTING_STARTED.md` | First steps for humans and AI operators |
| `ARCHITECTURE.md` | Locked structure and package boundaries |
| `AI_RUNTIME.md` | Human guide to the AI runtime model |
| `BUILD_SYSTEM.md` | How numbered BUILD increments work |
| `WORKFLOW.md` | Idea → release lifecycle |
| `BEST_PRACTICES.md` | Operating practices |
| `KNOWLEDGE_ARCHITECTURE.md` | Knowledge layer overview |
| `ADR_GUIDE.md` | How to write/use ADRs |
| `CONTEXT_ENGINE.md` | Context restore / future engine |
| `MEMORY_SYSTEM.md` | Memory/session model |
| `PROJECT_LIFECYCLE.md` | Lifecycle across builds |
| `CONTEXT_ENGINE_GUIDE.md` | Human guide to Context Engine |
| `SESSION_MANAGEMENT.md` | Session lifecycle practices |
| `CHECKPOINT_SYSTEM.md` | Checkpoint guide |
| `STATE_MACHINE.md` | Operator state guide |
| `AI_RESTORE_GUIDE.md` | Mandatory restore path for all AIs |
| `RUNTIME_ENGINE.md` | Executable runtime overview |
| `CLI_GUIDE.md` | CLI usage |
| `ENGINE_OVERVIEW.md` | Engine/manager map |
| `PACKAGE_STRUCTURE.md` | `adf-core` layout |
| `PLUGIN_ENGINE.md` | Plugin architecture overview |
| `PLUGIN_GUIDE.md` | How to use/author plugins |
| `EVENT_SYSTEM.md` | EventBus lifecycle events |
| `HOOK_SYSTEM.md` | before/after hooks |
| `EXTENSION_API.md` | Public extension surface |
| `TEMPLATE_ENGINE.md` | Template Engine overview |
| `TEMPLATE_MANIFEST.md` | `template.yaml` contract |
| `VARIABLE_SYSTEM.md` | `{{variable}}` resolution |
| `TEMPLATE_REGISTRY.md` | Template discovery/registry |
| `PROJECT_GENERATOR.md` | Project generation overview |
| `BOOTSTRAP_GENERATOR.md` | Bootstrap generation |
| `CLI_GENERATOR.md` | init/new/generate CLI |
| `SCAFFOLDER.md` | Locked-folder scaffolder |
| `GENERATION_PIPELINE.md` | Manifest-driven generation steps |
| `FILESYSTEM_ABSTRACTION.md` | Safe filesystem writers |
| `DRY_RUN.md` | Dry-run preview model |
| `PACKAGE_MANAGER.md` | APM overview |
| `PACKAGE_SPEC.md` | `package.yaml` contract |
| `PACKAGE_REGISTRY.md` | Registry backends |
| `DEPENDENCY_RESOLUTION.md` | Dep graph + cycles |
| `SEMVER_GUIDE.md` | Semver constraints |
| `SERVICE_LAYER.md` | Service Layer overview |
| `SERVICE_MANAGER.md` | ServiceManager API |
| `SDK_GUIDE.md` | Public SDK guide |
| `SDK_CLIENT.md` | SDKClient reference |
| `PUBLIC_API.md` | `from adf import …` contract |
| `REGISTRY.md` | Package registry SSOT |
| `MARKETPLACE.md` | Marketplace presentation layer |
| `REGISTRY_API.md` | Registry/Marketplace APIs |
| `PUBLISHER_GUIDE.md` | Publisher profiles/publish |
| `PACKAGE_SECURITY.md` | Checksum/signature/trust |
| `DISTRIBUTION.md` | Distribution platform overview |
| `INSTALLER.md` | InstallerManager |
| `UPDATER.md` | UpdateManager |
| `RELEASE_MANAGEMENT.md` | Channels + ReleaseManager |
| `OFFLINE_MODE.md` | Offline bundles/snapshots |
| `ENTERPRISE_DEPLOYMENT.md` | Enterprise profiles/bundles |
| `STUDIO_ARCHITECTURE.md` | ADF Studio Control Center architecture |
| `STUDIO_UI.md` | Shell, navigation, pages |
| `STATE_MANAGEMENT.md` | Zustand + Query rules |
| `THEME_SYSTEM.md` | Dark / Light / System |
| `DESKTOP_PACKAGING.md` | Tauri packaging notes |
| `WORKSPACE_SYSTEM.md` | Workspace hierarchy & manager |
| `PROJECT_EXPLORER.md` | Project Explorer |
| `SESSION_MANAGER.md` | Session Manager |
| `ACTIVITY_FEED.md` | Activity feed |
| `SEARCH_SYSTEM.md` | Search + command search |
| `VISUAL_PLATFORM.md` | Visual Intelligence overview |
| `GRAPH_ENGINE.md` | Graph engine |
| `KNOWLEDGE_GRAPH.md` | Knowledge Graph view |
| `DEPENDENCY_GRAPH.md` | Dependency Graph view |
| `VISUAL_GUIDE.md` | Operator visual guide |
| `RUNTIME_DASHBOARD.md` | AI Runtime Dashboard |
| `OBSERVABILITY.md` | Timelines & event stream |
| `COLLABORATION_PLATFORM.md` | AI Collaboration Platform |
| `AI_PARTICIPANTS.md` | AI as first-class Participant |
| `MULTI_AGENT_MODEL.md` | Multi-agent architecture (no automation) |
| `REVIEW_WORKFLOW.md` | Review & approval workflow |
| `NOTIFICATION_SYSTEM.md` | Collaboration notifications |
| `ORCHESTRATION_PLATFORM.md` | AI Orchestration Platform |
| `WORKFLOW_ENGINE.md` | Workflow lifecycle (non-executing) |
| `PIPELINE_ENGINE.md` | Pipeline stages & transitions |
| `ARTIFACT_FLOW.md` | Artifact kinds & dependencies |
| `APPROVAL_SYSTEM.md` | Review & approval gates |
| `ENTERPRISE_PLATFORM.md` | Enterprise Governance Platform |
| `RBAC_MODEL.md` | Hierarchical RBAC |
| `PERMISSION_SYSTEM.md` | Fine-grained permissions |
| `AUDIT_SYSTEM.md` | Immutable audit trail |
| `COMPLIANCE.md` | Compliance dashboard |
| `IDENTITY.md` | Identity & SSO catalog |
| `METRICS_SYSTEM.md` | Metrics presentation |
| `LOGGING_SYSTEM.md` | Log viewer |
| `DIAGNOSTICS.md` | Diagnostics panels |
| `README.md` | This index |

## Reading Order

1. `WHAT_IS_ADF.md`
2. `GETTING_STARTED.md`
3. `ARCHITECTURE.md`
4. `AI_RUNTIME.md` + `AI_RESTORE_GUIDE.md`
5. `CONTEXT_ENGINE_GUIDE.md` + `RUNTIME_ENGINE.md`
6. Root `ROADMAP.md`
7. `.adf/BOOT_SEQUENCE_V2.md` before edits

## Maintenance

- Keep docs aligned with `.adf` SSOT contracts
- Prefer useful, specific guidance over generic filler
- Expand operator/architect/contributor guides in BUILD-016 without abandoning these foundations
