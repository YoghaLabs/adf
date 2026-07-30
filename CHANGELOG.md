# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.19.0-alpha** / **BUILD-019** / **develop**

## [Unreleased]

### Planned
- BUILD-020 Production v1.0 / Release Candidate packaging (Phase 4 — after Architecture Review of BUILD-019)

## [0.19.0-alpha] — 2026-07-30

### Added
- Enterprise Governance Platform under `adf-studio/src/features/enterprise/`
- Organization hierarchy, identity/SSO catalog, hierarchical RBAC, permission matrix
- Immutable audit trail, compliance dashboard, licenses, environments, analytics
- SDK: OrganizationClient, IdentityClient, RoleClient, PermissionClient, AuditClient, ComplianceClient, LicenseClient, AnalyticsClient
- Docs: ENTERPRISE_PLATFORM, RBAC_MODEL, PERMISSION_SYSTEM, AUDIT_SYSTEM, COMPLIANCE, IDENTITY
- ADR-017 Enterprise Governance Architecture
- Prompts + `bootstrap/BUILD-019/`
- Vitest enterprise suite

### Changed
- Version identity advanced to `0.19.0-alpha` / BUILD-019
- ROADMAP BUILD-019 theme: Release Candidate → Enterprise Governance (operator master prompt)

### Locked
- No redesign / no new platform
- Governance service-driven; audit immutable; RBAC hierarchical

## [0.18.0-alpha] — 2026-07-30

### Added
- AI Orchestration Platform under `adf-studio/src/features/orchestration/`
- Workflow + pipeline engines (model/UI/SDK); stages, artifacts, gates, execution plans
- Visual pipeline board (board/kanban/timeline/dependency/graph) + execution view
- SDK: WorkflowClient, PipelineClient, ArtifactClient, ExecutionClient, ApprovalClient
- Docs: ORCHESTRATION_PLATFORM, WORKFLOW_ENGINE, PIPELINE_ENGINE, ARTIFACT_FLOW, APPROVAL_SYSTEM
- ADR-016 AI Orchestration Architecture
- Prompts + `bootstrap/BUILD-018/`
- Vitest orchestration suite

### Changed
- Version identity advanced to `0.18.0-alpha` / BUILD-018
- ROADMAP BUILD-018 theme: Audit Framework → AI Orchestration (operator master prompt)

### Locked
- No AI automation / no autonomous execution
- Orchestration separated from execution; workflow owns lifecycle

## [0.17.0-alpha] — 2026-07-30

### Added
- AI Collaboration Platform under `adf-studio/src/features/collaboration/`
- Participants (human + AI) as first-class identities; multi-agent model (architecture only)
- Reviews, approvals, comments, presence, notifications, assignments, activity timeline
- SDK: CollaborationClient, ParticipantClient, PresenceClient, ReviewClient, NotificationClient, AssignmentClient
- Docs: COLLABORATION_PLATFORM, AI_PARTICIPANTS, MULTI_AGENT_MODEL, REVIEW_WORKFLOW, NOTIFICATION_SYSTEM
- ADR-015 AI Collaboration Architecture
- Prompts + `bootstrap/BUILD-017/`
- Vitest collaboration suite

### Changed
- Version identity advanced to `0.17.0-alpha` / BUILD-017
- ROADMAP BUILD-017 theme: Testing Framework → AI Collaboration (operator master prompt)

### Locked
- AI is a Participant (not plugin/extension/tool/widget)
- No agent automation in BUILD-017

## [0.16.0-alpha] — 2026-07-30

### Added
- AI Runtime Dashboard under `adf-studio/src/features/runtime/`
- Observability timelines, metrics, logs, diagnostics, jobs, inspectors, event stream
- SDK: RuntimeDashboardClient, MetricsClient, LogsClient, DiagnosticsClient, TimelineClient
- Stores: RuntimeDashboard, Metrics, Log, Timeline, Diagnostic
- Docs: RUNTIME_DASHBOARD, OBSERVABILITY, METRICS_SYSTEM, LOGGING_SYSTEM, DIAGNOSTICS
- ADR-014 AI Observability Architecture
- Prompts + `bootstrap/BUILD-016/`
- Vitest runtime suite
- Phase 3 User Experience complete

### Changed
- Version identity advanced to `0.16.0-alpha` / BUILD-016
- `/runtime` hosts full observability dashboard

## [0.15.0-alpha] — 2026-07-30

### Added
- Visual Intelligence Platform under `adf-studio/src/features/visual/`
- Graph engine + React Flow canvas; 10 graph modules
- SDK: KnowledgeClient, DependencyClient, GraphClient, VisualizationClient
- Stores: GraphStore, SelectionStore, LayoutStore, FilterStore
- Visual dashboards + graph search
- Docs: VISUAL_PLATFORM, GRAPH_ENGINE, KNOWLEDGE_GRAPH, DEPENDENCY_GRAPH, VISUAL_GUIDE
- ADR-013 Visual Intelligence Architecture
- Prompts + `bootstrap/BUILD-015/`
- Vitest visual suite

### Changed
- Version identity advanced to `0.15.0-alpha` / BUILD-015

## [0.14.0-alpha] — 2026-07-30

### Added
- Workspace Experience Platform under `adf-studio/src/features/workspace/`
- Workspace Manager, Project Explorer, Session Manager, Activity Feed, Search
- SDK clients: SessionClient, SearchClient, ActivityClient (+ extended Workspace/Project)
- Zustand stores: Session, Activity, Search; expanded Workspace/Project explorer
- Command Palette quick actions; Dashboard workspace overview widgets
- Docs: WORKSPACE_SYSTEM, PROJECT_EXPLORER, SESSION_MANAGER, ACTIVITY_FEED, SEARCH_SYSTEM
- ADR-012 Workspace Experience Architecture
- Prompts + `bootstrap/BUILD-014/`
- Vitest workspace experience suite

### Changed
- Version identity advanced to `0.14.0-alpha` / BUILD-014

## [0.13.0-alpha] — 2026-07-30

### Added
- ADF Studio Core in `adf-studio/` (Desktop Control Center, not an IDE)
- Application shell, navigation, dashboard widgets, core pages
- Zustand stores + TanStack Query; SDK TypeScript adapters over ServiceEnvelope fixtures
- ThemeManager (Dark / Light / System); Tauri scaffold
- Vitest + RTL smoke, layout, navigation, SDK tests
- Docs: STUDIO_ARCHITECTURE, STUDIO_UI, STATE_MANAGEMENT, THEME_SYSTEM, DESKTOP_PACKAGING
- ADR-011 ADF Studio Architecture
- Prompts: studio, dashboard, layout, ui
- `bootstrap/BUILD-013/`

### Changed
- Version identity advanced to `0.13.0-alpha` / BUILD-013
- Phase 3 UX started

## [0.12.0-alpha] — 2026-07-30

### Added
- Distribution platform in `adf-core/distribution/`
- InstallerManager / UpdateManager / ReleaseManager / RollbackManager
- Packaging: zip, tar.gz, wheel, portable, offline, enterprise, desktop marker
- Services + SDK clients for distribution/installer/updater/release
- CLI: uninstall, release, package, bundle, rollback; extended install/update/verify
- ADR-010 Distribution & Release Architecture
- Docs + prompts + `bootstrap/BUILD-012/`
- pytest `tests/test_distribution.py`

### Changed
- Version identity advanced to `0.12.0-alpha` / BUILD-012
- Phase 2 Platform & Distribution complete

## [0.11.0-alpha] — 2026-07-30

### Added
- Registry & Marketplace platform

## [0.10.0-alpha] — 2026-07-30

### Added
- Service Layer & Public SDK
