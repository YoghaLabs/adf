# Business Rules

**Package:** `business/ADF-v1.0/`  
**Status:** Authoritative for business work

## Core Rules

1. **Business documents are authoritative** for business decisions (positioning, GTM, pricing narrative, investor/enterprise packaging).
2. **Engineering must not contradict Business** on claims that are business-owned (market promise, packaging, commercial posture), once those claims are recorded in Business SSOT.
3. **Business must not contradict Engineering** on what the product actually ships. Capability statements must match RC1/engineering SSOT or be clearly labeled roadmap.
4. **Business follows Product.** Strategy describes the product that exists (or an explicitly dated roadmap item).
5. **No duplicated documents.** Do not copy `/legal`, `/adf-docs`, or `/.adf` content into business folders; link instead.
6. **Markdown is the master format.** PDF, DOCX, PPT, and XLSX are generated artifacts, not SSOT.
7. **Structure is LOCKED.** Do not rename, remove, or add folders under `business/ADF-v1.0/`.
8. **Template is mandatory.** Every future strategy document uses `DOCUMENT_TEMPLATE.md`.
9. **Phase stop rule.** Do not start the next BUSINESS phase until the current phase is complete and an explicit prompt authorizes continuation.
10. **Decision logging.** Durable choices are recorded in `BUSINESS_DECISIONS.md`.

## Conflict Resolution

| Conflict type | Resolution |
|---------------|------------|
| Business claim vs shipped engineering | Prefer engineering truth; amend business doc |
| Engineering messaging vs approved business positioning | Prefer business positioning for external narrative; update engineering docs if needed for consistency |
| Legal product text vs business legal strategy | `/legal` wins for license/EULA/copyright text |

## Narrative Standards (LOCKED from BUSINESS-002 → BUSINESS-011)

These standards govern all business documents from BUSINESS-002 onward.
They are **locked** for the remainder of the ADF v1.0 business program.

1. **No promotional excess.** Write for diligence, not advertising. Prefer precise
   description over slogans.
2. **No unfounded superlatives.** Do not claim “best in the world,” “revolutionary,”
   “number one,” “industry-leading,” or similar without verifiable evidence recorded
   in Business SSOT. If evidence is absent, do not make the claim.
3. **Capability truth.** Every product capability claim must match what was actually
   delivered in BUILD-001 … BUILD-020 (`1.0.0-rc1`) or be clearly labeled as
   roadmap / future work.
4. **Audience fitness.** Every narrative must be suitable for investors, enterprise
   customers, and government institutions: measured tone, clear structure, no hype.
5. **Consistency across phases.** Positioning, philosophy, and capability language
   from the Executive Package must not be contradicted by later BUSINESS phases
   without a logged decision in `BUSINESS_DECISIONS.md`.

## Product Edition Principles (LOCKED from BUSINESS-003 → BUSINESS-011)

Authoritative for editions, packaging, and commercial product claims (BD-008):

1. **No false promises.** Do not present unshipped features as available. Roadmaps may
   be visionary but must label shipped (RC1 / GA) vs direction.
2. **Community remains useful.** Community Edition must not be artificially crippled
   solely to force upgrades.
3. **Professional focus.** Professional Edition targets software houses, consultants,
   and development teams needing commercial use and support.
4. **Enterprise focus.** Enterprise Edition emphasizes organizational needs: SSO-oriented
   governance, audit, deployment, and enterprise support — with honest RC1 vs roadmap
   boundaries.
5. **Cloud is future vision.** Cloud Edition is not available in ADF `1.0.0-rc1` and
   must not be sold or implied as current.

## Quality

- Professional, enterprise-grade writing
- Consistent formatting
- No placeholder or lorem content
- Update SSOT status files when phase state changes
- Follow Narrative Standards above on every new or revised business document
