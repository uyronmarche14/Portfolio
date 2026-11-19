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
