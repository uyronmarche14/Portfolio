# /process explorer: copy to review (AI draft, not approved)

Status: proposal. Not an approved requirement. Nothing here is confirmed by the owner yet.

## Authored copy (please approve or edit)
- `app/lib/data/systemContent.ts`: "why it matters" and "example" for the 26 process steps, an example for each of the 21 documents,
  and when-to-use, outcome and per-step notes for the 4 scenarios. Generalized from the portfolio notes; no employer application or client names.
- `app/lib/data/infraMap.ts`: about 40 infrastructure items (request path, delivery, operations) with an evidence label each.

## Please confirm these claims about the CICT platform (read from its workflows and docs)
- Backend on Render (deploy hook), frontend on Cloudflare Workers via OpenNext, staging and production environments, health checks, smoke tests.
- CI: CodeQL, dependency audit, secret scan, dependency review, Playwright E2E; production gate with a typed "deploy" confirmation.
- API: Helmet, CORS allow-list, CSRF, general rate limiter. Database: MongoDB. Media: Cloudinary.
- Labelled **Concept** (no evidence of use): reverse proxy, cache layer, container registry, logging, monitoring and alerts, backups, restore drills.
- Kubernetes, Terraform and Helm are stated as not used.

## Conflicts to report
- CICT's architecture doc is a Draft that still mentions Vercel; its deploy workflows use Cloudflare Workers. The workflows were treated as the source of truth.
- This site's own hosting is not described by any deploy config in this repository, so it is not claimed.
- The "Request path" DNS item says the DNS record is created on first deploy from the Worker configuration; verify against the real zone.

## Expansion, 2026-11-20 (AI draft, not approved)

New and changed content, drawn from my own projects' deploy documents, workflows and configuration. Please confirm each claim.

**New items (about 60):**
- `app/lib/data/codingMap.ts`: 28 engineering practices shown inside the Tools tab ("In practice: ..."): API design, validation, data modeling, authentication, role-based authorization, uploads, components, forms and dashboards, state, routing, accessibility, motion, mobile, desktop, real-time, IoT, third-party APIs, tests, review, debugging, performance, refactoring and four AI practices. Evidence is read from the project technology lists.
- `app/lib/data/moreInfra.ts`: DNS in depth (registrar and nameservers, zone and access, records, TTL, cutover, subdomains), where it runs (Workers and OpenNext, Pages, Render, Vercel, headers file, SPA fallback, media delivery), ways to deploy (Wrangler, Pages direct upload, Render blueprint, previews, a demo target, live browser checks, dry runs, scoped tokens, migrations) and readiness and response (CSP, credential rotation, request correlation, recovery objectives, readiness checklist, incident contact).
- Tools added: Wrangler, OpenNext, Cloudflare Pages, GitHub Actions, Cloudinary, Helmet/CORS/rate limiting, Playwright, axe.
- Four scenarios added: role-based module, AI-assisted build, change after release, release and handover.

**Corrections to earlier drafts, please confirm:**
- Cloudflare is now **Built**, not Concept: the CICT frontend (Workers via OpenNext), a static company site (Pages), a trip-planning demo (Worker), and this portfolio. This portfolio deploys through Cloudflare Workers Builds on every push to main; its build settings live in the Cloudflare dashboard, not in the repository.
- Vercel is **Built** (company site, and the site that was cut over); Railway was only investigated.
- Logging moved from Concept to **Built** (Workers observability is enabled in the Worker configuration; retention and sampling are not reviewed).
- PostgreSQL moved to **Built** (local Docker database for the trip-planning app; Postgres behind Supabase).

**Still Concept (no evidence of use):** reverse proxy and load balancer, cache layer, container registry, firewall/bot protection, private networking, request correlation, uptime alerts, backups and restore drills, recovery objectives, incident contact. Several infrastructure folders in the studio project are empty scaffolds, so they are not claimed.

**Left out on purpose:** real hostnames and account identifiers (found in the CICT deploy notes and the trip-planning record), and any project whose name ties it to an employer. CICT branch protection is still a manual step in its own tracker, so it is not claimed.

## AI tooling additions, 2026-11-20 (AI draft, not approved)

Read from my workspace and project files; please confirm.
- **Tools (AI):** MCP (kept as **Concept**: no MCP server configuration is committed anywhere in my projects; only a workspace rule about sanitizing any that is), Skills, Agents and subagents, AGENTS.md and project instructions, and the agent harness (Claude Code day to day; OpenCode configured for two projects).
- **Practices (AI):** connecting tools through MCP (Concept), writing instructions an agent can follow, delegating to subagents, orchestration and routing logic, agent permissions and guardrails, AI drafts versus approved decisions, and evaluating AI behavior (Method).
- **Evidence read:** the workspace `AGENTS.md` hierarchy, two skills (module requirements, project environments), one requirements-writing subagent, CICT's fourteen role prompts with an orchestrator, and the OpenCode configuration (a read-only review agent, permissions, ten listed skills).
- **Not claimed:** the ready-made agent kit installed in this repository's `.agent` folder (20 agents, 36 skills, 11 workflows) is a third-party toolkit, so it is not listed as something I authored. The skill and subagent for module requirements were written for an employer project; they appear here only in general terms, without names.

## Tool notes, 2026-11-20 (AI draft, not approved)

`app/lib/data/toolContent.ts` explains every one of the 83 tools: how I used it, what for, and which other tools it was connected to (these links also appear in each tool's Connections). Written from the technology lists and feature lists of my own projects. Examples to check: Docker (containerized services in the learning management system, a local MongoDB for CICT, a local PostgreSQL for a trip planner), SQL Server (records and history behind an Express service layer and React forms), Express (the API for CICT, the supplier quality platform and a booking platform). Tools that were only explored or proposed (MCP, RAG, Power Query, the motion controller, GPS, game tools, the homelab) say so, and a test enforces that. Please correct anything that overstates what a tool was used for.
