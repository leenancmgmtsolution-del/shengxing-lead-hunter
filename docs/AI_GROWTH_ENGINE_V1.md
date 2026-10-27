# AI Growth Engine V1 — Backend Blueprint
Status: Design only. No production deployment, tokens, customer data, or live Meta connection.

## Boundary
Muse/Meta marketing -> authorized Meta Lead Ads webhook or owned landing page -> intake API -> PostgreSQL -> job queue -> CRM -> human advisor -> optional NS Loan Engine (separate authenticated service).
Muse availability and API interoperability are unverified. Never scrape Meta private data.

## Core services
- Next.js dashboard (existing scaffold); TypeScript API (Fastify or NestJS); PostgreSQL; Redis/BullMQ; private encrypted object storage.
- HTTPS webhook endpoint with Meta signature verification, challenge verification, replay protection, idempotent event IDs, retry and dead-letter queue.
- Lead source fields: source, page_id, form_id, campaign_id, adset_id, ad_id, leadgen_id, consent record, timestamp. Pull authorized lead details server-side; no secrets in browser.
- Normalize phone to E.164; deduplicate by verified phone + source identifiers; keep merges reversible and audited.
- Workflow states NEW, CONTACT_PENDING, CONTACTED, QUALIFIED, DOCUMENTS_PENDING, ADVISOR_REVIEW, SUBMITTED, APPROVED, DECLINED, WON, LOST, DO_NOT_CONTACT.
- Rule-driven priority based on voluntarily supplied inquiry and recency; no sensitive inferred attributes. AI score is advisory and explainable.
- Human approval for outbound messaging templates, financial recommendations, ad changes and loan submission.
- Advisor task SLA target: alert on new lead immediately, first human contact target within 15 minutes during business hours; configurable.
- RBAC owner/admin/advisor/reviewer; encryption, audit log, retention/deletion policy, consent withdrawal and opt-out handling.
- NS Loan Engine only receives explicitly authorized minimum fields via separate API; never send CTOS/Experian PDFs or sensitive data to Muse/Meta.
- Aggregate conversion metrics; offline conversion upload only where permitted and with appropriate consent; avoid sending financial hardship/credit status to ad platforms.

## Tables
leads, lead_sources, lead_consents, lead_events, lead_assignments, tasks, conversations, campaign_snapshots, attribution_events, opportunities, documents_metadata, workflow_runs, webhook_events, audit_logs, users, roles.

## KPI definitions
CPL = ad_spend / unique leads
Qualified CPL = ad_spend / human-verified qualified leads
Contact rate = contacted leads / leads
Qualified rate = qualified leads / contacted leads
Submission rate = submitted cases / qualified leads
Approval rate = approved cases / submitted cases
Collected fee ROAS = collected advisor fees attributed to campaigns / ad_spend
Report cohorts by lead creation date and conversion date separately. Distinguish pending from lost.

## Implementation sequence
P0: security, consent, schema, auth, webhook simulator, lead CRUD, deduplication, task dashboard, audit log.
P1: Meta official integration subject to app permissions; job queue, retry, attribution, advisor notifications.
P2: NS Loan Engine adapter after API/data-contract audit; document intake with user permission; funnel analytics.
P3: Muse campaign reporting import/API if available, recommendation engine and supervised experiments.

## Acceptance tests
Webhook signature rejects tampering; repeated lead event creates one lead; failed jobs retry safely; opt-out blocks messages; advisor cannot read other advisor's cases; consent deletion propagates; no sensitive values in logs; backups restore; dashboard reconciles spend and leads; loan engine failure does not lose lead.

## Open prerequisites
Meta Business Manager and Page ownership, approved app permissions and webhook configuration; Muse availability; approved messaging channel; domain and hosting; privacy notice and PDPA controls; NS Loan Engine API contract; actual historical funnel data.

## Guardrails
No auto-approval guarantees, no sensitive-attribute ad targeting, no scraping of private profiles, no unsolicited bulk messaging, no autonomous ad spending.
