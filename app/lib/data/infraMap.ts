import type { Evidence, SeenIn } from "./processMap";

/**
 * The production side of a website: the path a request takes, how a change is released, and what keeps it running.
 * Anchored on the CICT platform (a public project on this site: its deploy workflows and docs) and on this repository.
 * Evidence is honest: things I built are "built", explanations of how a part works are "method", and anything with no evidence
 * (monitoring, backups, a container registry, a reverse proxy) is "concept". Kubernetes, Terraform and Helm are not used and are not nodes.
 */

export type InfraLane = "journey" | "release" | "ops";

export interface InfraGroup {
  id: string;
  lane: InfraLane;
  title: string;
  blurb: string;
  /** a group that is an ordered chain (steps follow each other) rather than a set */
  chain: boolean;
}

export interface InfraNode {
  lane: InfraLane;
  id: string;
  title: string;
  summary: string;
  /** why it matters on a production site */
  why: string;
  /** how it works, in a few short points */
  how: string[];
  group: string;
  order: number;
  evidence: Evidence;
  seenIn: SeenIn[];
  /** other nodes it relates to (steps, documents, tools, other infrastructure), each with the reason */
  links: [id: string, why: string][];
}

const CICT: SeenIn = { label: "CICT platform", href: "/projects/cict-organization-website" };
const SITE: SeenIn = { label: "This portfolio", href: "/" };

export const infraGroups: InfraGroup[] = [
  { id: "visit", lane: "journey", title: "A visitor's request", blurb: "What happens, in order, between typing an address and seeing a page.", chain: true },
  { id: "around", lane: "journey", title: "Around the request", blurb: "Parts that protect or speed up the path without being on every request.", chain: false },
  { id: "integrate", lane: "release", title: "Integrate", blurb: "Every change is checked before it can reach a user.", chain: true },
  { id: "ship", lane: "release", title: "Ship", blurb: "Staging first, then production, each verified after it goes live.", chain: true },
  { id: "recover", lane: "release", title: "Recover", blurb: "How a bad release is undone.", chain: false },
  { id: "config", lane: "release", title: "Environments and configuration", blurb: "What runs where, and how it is described and secured.", chain: false },
  { id: "observe", lane: "ops", title: "Observe", blurb: "Knowing whether the site is up and healthy.", chain: false },
  { id: "protect", lane: "ops", title: "Protect", blurb: "Keeping the site, its data and its dependencies safe.", chain: false },
  { id: "restore", lane: "ops", title: "Restore", blurb: "Getting back after something is lost.", chain: false },
];

const n = (
  lane: InfraLane,
  id: string,
  title: string,
  group: string,
  order: number,
  evidence: Evidence,
  summary: string,
  why: string,
  how: string[],
  links: [string, string][],
  seenIn: SeenIn[] = []
): InfraNode => ({ lane, id, title, group, order, evidence, summary, why, how, links, seenIn });

export const infraNodes: InfraNode[] = [
  // ---------------------------------------------------------------- request path
  n("journey", "j-browser", "The visitor's browser", "visit", 0, "method", "Starts every request: it needs an address, and it only knows the name.", "Everything below exists to turn a name someone types into a page that appears quickly and safely.", ["Takes a URL such as a hostname and a path", "Checks its own caches first", "Otherwise asks the next layer down to find the server"], [["j-dns", "The browser cannot connect to a name, so it asks DNS for an address."]]),
  n("journey", "j-dns", "DNS lookup", "visit", 1, "built", "Turns a hostname into the address of a server.", "If DNS is wrong, the site is unreachable no matter how healthy the servers are. It is also where a migration is switched over.", ["The browser asks a resolver, which asks the root, then the top-level domain, then the zone's authoritative name server", "The answer is a record: A or AAAA for an address, CNAME for an alias", "Each answer is cached for its time to live, so changes take time to spread", "In CICT the custom domains are declared in the Worker configuration and the DNS record is created on the first deploy, in the Cloudflare zone"], [["t-cf", "Cloudflare holds the zone and the custom domain."], ["r-staging", "A hostname for staging is created the first time staging deploys."], ["r-env-prod", "Production has its own hostname."]], [CICT]),
  n("journey", "j-tls", "TLS and HTTPS", "visit", 2, "built", "Encrypts the connection and proves the site is the right one.", "Without it, browsers warn visitors, logins can be read in transit, and modern features stop working.", ["A certificate ties the hostname to a key", "The handshake agrees the encryption before any page data is sent", "The certificate is issued and renewed automatically on Cloudflare", "A Strict-Transport-Security header tells browsers to always use HTTPS; this site sets one"], [["t-cf", "Certificates are issued for the custom domain by Cloudflare."], ["o-headers", "HSTS is one of the security headers."]], [CICT, SITE]),
  n("journey", "j-edge", "CDN and edge", "visit", 3, "built", "Serves files from a location near the visitor, and caches what does not change.", "Faster pages, less load on the origin, and a first line of defence for traffic spikes.", ["Static assets are served straight from the edge", "Cache rules say what may be stored and for how long", "Images and media can come from a media CDN; CICT uses Cloudinary for media"], [["t-cf", "Workers static assets are served from Cloudflare's edge."], ["j-web", "The edge hands dynamic requests to the web application."]], [CICT]),
  n("journey", "j-web", "Web application", "visit", 4, "built", "The part that builds the page: server-rendered or static.", "It decides what the visitor sees and calls the API for data.", ["CICT's Next.js frontend runs on Cloudflare Workers through OpenNext", "Static exports are served as plain assets with security headers", "It calls the API at an origin set per environment"], [["t-next", "The frontend is a Next.js application."], ["t-cf", "It runs on Cloudflare Workers."], ["t-react", "The interface is built with React."]], [CICT]),
  n("journey", "j-api", "API", "visit", 5, "built", "The server that holds the business rules and talks to the database.", "It is where permissions are enforced. Hiding a button is not security; refusing the request is.", ["An Express service on Render in CICT", "Helmet sets security headers; CORS allows only the configured frontend origins", "Cookies and CSRF protection guard sessions", "A general rate limiter caps requests per client"], [["t-express", "The API is an Express application."], ["t-hosts", "It is hosted on Render."], ["t-jwt", "Authentication and roles are checked here."], ["m-roles", "The permission matrix is enforced in this layer."]], [CICT]),
  n("journey", "j-data", "Database and storage", "visit", 6, "built", "Where the records and the uploaded files actually live.", "Everything the site remembers is here, so it is also what has to be backed up and protected.", ["CICT keeps its records in MongoDB, with separate staging and production databases", "Media is stored with a media provider", "The API is the only thing that talks to the database"], [["t-mongo", "The records are stored in MongoDB."], ["g-schema", "The schema plan decides what is stored."], ["o-backup", "Backups protect this layer."]], [CICT]),
  n("journey", "j-proxy", "Reverse proxy and load balancer", "around", 0, "concept", "A front door that forwards requests to one or more servers.", "It adds HTTPS, routing and spreading load, so one server can fail without the site going down.", ["Examples: Caddy or Nginx in front of containers on a server", "A managed platform usually does this for you", "Only in my homelab plan, not in a delivered project on this site"], [["t-homelab", "Caddy appears in the proposed homelab setup."]]),
  n("journey", "j-cache", "Cache layer", "around", 1, "concept", "A fast store for answers that are expensive to compute.", "Takes pressure off the database for repeated reads.", ["Typically Redis next to the API", "Needs a plan for when cached data becomes stale", "Part of the proposed homelab, not a delivered project"], [["t-homelab", "Redis is in the proposed homelab stack."]]),
  n("journey", "j-rate", "Rate limiting", "around", 2, "built", "Caps how many requests one client can make.", "Slows down abuse and accidents without blocking normal visitors.", ["The CICT API applies a general limiter to its /api routes", "A managed web application firewall is not used"], [["j-api", "The limiter runs inside the API."], ["t-express", "It is Express middleware."]], [CICT]),

  // ---------------------------------------------------------------- release
  n("release", "r-pr", "Pull request", "integrate", 0, "built", "A proposed change, reviewed and checked before it merges.", "It is the point where a second pair of eyes and the automated checks both get a say.", ["Opened against the staging or main branch", "Triggers the quality workflow", "Merging is the signal that a change is ready to ship"], [["t-git", "Branches and review live in Git and GitHub."], ["p-github", "The same trigger starts this site's workflow."], ["c-change", "A reviewed change is the code-level version of a change request."]], [CICT, SITE]),
  n("release", "r-ci", "Quality gates", "integrate", 1, "built", "Automated checks that must pass: contracts, backend, web, mobile.", "A change that breaks the build or the tests never reaches a user.", ["Install exactly what the lockfile says", "Type check, lint and test each package, in dependency order", "A failure stops everything after it"], [["p-typecheck", "This site runs the same kind of check."], ["p-lint", "Lint runs here too."], ["p-test", "Tests run here too."], ["v-gate", "Passing checks support, but do not replace, business acceptance."]], [CICT]),
  n("release", "r-sec", "Security scans", "integrate", 2, "built", "Code and dependency scanning on every change.", "Most real vulnerabilities arrive through dependencies, not through the code you wrote.", ["CodeQL analyses the code", "A dependency audit fails on high-severity advisories", "A secret scan looks for committed credentials", "Dependency review flags risky additions on pull requests"], [["t-git", "The scans run in GitHub Actions."], ["o-scan", "These scans are the protect side of operations."]], [CICT]),
  n("release", "r-e2e", "End-to-end tests", "integrate", 3, "built", "A real browser walks through the main journeys.", "Unit tests prove the pieces; this proves the whole thing still works the way a visitor uses it.", ["Playwright builds the web app and runs its journeys", "Runs on pushes and pull requests to staging and main", "Results are kept as an artifact"], [["t-e2e", "Browser end-to-end checks."], ["v-uat", "The automated cousin of business UAT."]], [CICT]),
  n("release", "r-build", "Build", "integrate", 4, "built", "Compile the application into what will actually be deployed.", "A release is only planned once it builds.", ["Contracts are built first, then the web app", "The same build is what gets verified in staging"], [["p-build", "This site's build step."], ["c-roadmap", "A buildable release is what the roadmap schedules."]], [CICT, SITE]),
  n("release", "r-staging", "Deploy to staging", "ship", 0, "built", "A full copy of production where a release is proven first.", "It catches problems that only appear when the real services are connected, without risking users.", ["A push to the staging branch triggers it", "The Render deploy hook updates the backend, then the frontend deploys to Cloudflare Workers", "A staging hostname is created on first deploy"], [["t-hosts", "The backend deploys through a Render hook."], ["t-cf", "The frontend deploys to Cloudflare Workers."], ["j-dns", "The staging hostname is created in DNS."]], [CICT]),
  n("release", "r-health-s", "Health check (staging)", "ship", 1, "built", "Wait until the new backend answers a health request.", "A deploy that started is not a deploy that works.", ["The workflow polls a health endpoint", "It fails the release if the service never becomes healthy"], [["o-health", "The health endpoint is the operational side."]], [CICT]),
  n("release", "r-smoke", "Smoke test", "ship", 2, "built", "A few quick requests to confirm the backend and frontend are live.", "Cheap proof that the basics work before anyone relies on it.", ["Check the backend responds", "Check the frontend responds", "Stop the release if either fails"], [["v-uat", "A small automated cousin of UAT."], ["t-postman", "A Postman smoke collection exists for the backend."]], [CICT]),
  n("release", "r-gate", "Production gate", "ship", 3, "built", "A deliberate step before production: a named environment and, for manual runs, a typed confirmation.", "Production changes should be intentional and traceable.", ["The production job runs in a GitHub environment", "A manual run requires typing 'deploy'", "A release-style commit message is checked and advised"], [["v-gate", "The same idea as the acceptance decision: it moves on only when it is approved."], ["c-log", "The release is recorded against the commit."]], [CICT]),
  n("release", "r-prod", "Deploy to production", "ship", 4, "built", "The same steps as staging, against the real services.", "What was proven in staging is what goes live.", ["Backend through its deploy hook, then the frontend on Cloudflare Workers", "A production hostname serves the site"], [["t-hosts", "The production backend runs on Render."], ["t-cf", "The production frontend runs on Cloudflare Workers."]], [CICT]),
  n("release", "r-health-p", "Production health check", "ship", 5, "built", "Verify backend and frontend after the release goes live.", "Confirms that production, not just staging, is healthy.", ["Backend health endpoint", "Frontend responds", "A failure is visible in the workflow run"], [["o-health", "Health checks are shared with operations."]], [CICT]),
  n("release", "r-rollback", "Rollback", "recover", 0, "method", "Return to the last good release when a new one misbehaves.", "Speed matters more than blame when users are affected.", ["Redeploy the previous release or restore the previous origin", "CICT's notes keep the previous origin available during a rollback window", "A rollback does not undo database changes, so those need their own plan"], [["v-gate", "A failed check sends work back, the same way."], ["c-change", "Anything beyond a revert becomes a change request."]], [CICT]),
  n("release", "r-env-staging", "Staging environment", "config", 0, "built", "Its own backend, hostname and data, separate from production.", "Mistakes and experiments stay away from real users and real data.", ["Staging branch, staging Worker, staging backend and its own database", "Origins are set by environment variables"], [["r-staging", "Deployed by the staging workflow."]], [CICT]),
  n("release", "r-env-prod", "Production environment", "config", 1, "built", "What real visitors use.", "Treated carefully: gated deploys, health checks and a rollback path.", ["Main branch, production Worker, production backend and database", "A separate hostname"], [["r-prod", "Deployed by the production workflow."], ["j-dns", "Has its own DNS record."]], [CICT]),
  n("release", "r-docker", "Containers", "config", 2, "built", "Package an application and its dependencies so it runs the same everywhere.", "Removes 'it works on my machine' from local development and testing.", ["Dockerfiles for several applications", "Docker Compose for local services, such as a MongoDB for development in CICT", "Containers are not how CICT's production runs; Render and Cloudflare handle that"], [["t-docker", "Docker is the tool."], ["t-localstack", "LocalStack emulates cloud storage in containers."]], [CICT]),
  n("release", "r-registry", "Container registry", "config", 3, "concept", "A store for built container images that servers pull from.", "Needed when you deploy your own containers, so every environment runs the identical image.", ["Not used in a delivered project here", "Would sit between the build step and the server"], [["t-docker", "The images would be built with Docker."]]),
  n("release", "r-iac", "Configuration as code", "config", 4, "built", "Hosting described in files kept with the code.", "A setup you can read and review is a setup you can repeat.", ["Wrangler configuration for Cloudflare Workers", "Render blueprint files for the backend", "Terraform, Helm and Kubernetes are not used here"], [["t-cf", "Wrangler configures the Workers."], ["t-hosts", "Render reads its blueprint file."]], [CICT]),
  n("release", "r-secrets", "Secrets and variables", "config", 5, "built", "Credentials and settings kept out of the repository.", "A leaked token is an incident; a secrets store makes leaks less likely.", ["GitHub Actions secrets hold deploy tokens and environment URLs", "Services get their settings as environment variables, such as the allowed CORS origin", "Nothing secret is committed"], [["t-git", "Secrets live in GitHub Actions."], ["o-scan", "A secret scan checks nothing slipped into the code."]], [CICT]),

  // ---------------------------------------------------------------- operations
  n("ops", "o-health", "Health checks", "observe", 0, "built", "A simple endpoint that says whether the service is alive.", "It is the cheapest and most useful signal: a platform, a workflow or a person can ask it.", ["The CICT API exposes health endpoints", "Deploy workflows wait on them", "A Postman smoke collection covers the backend"], [["r-health-s", "Used after a staging deploy."], ["r-health-p", "Used after a production deploy."], ["j-api", "Served by the API."]], [CICT]),
  n("ops", "o-logs", "Logging", "observe", 1, "concept", "A record of what the application did and what went wrong.", "Without logs, the first question after a failure has no answer.", ["Not documented as in place for the delivered projects", "The project's own deployment notes list observability as 'requires confirmation'"], [["j-api", "The API is where application logs come from."]]),
  n("ops", "o-monitor", "Monitoring and alerts", "observe", 2, "concept", "Watching uptime and error rates and telling someone when they cross a line.", "Users should not be the alarm.", ["Not documented as in place", "A first step would be an uptime check on the health endpoint"], [["o-health", "The health endpoint is the natural thing to monitor."]]),
  n("ops", "o-headers", "Security headers and CSP", "protect", 0, "built", "Headers that tell browsers how strictly to treat the site.", "Cheap protection against whole classes of attack, such as clickjacking and mixed content.", ["This site sets HSTS, content-type, frame and referrer headers", "The API uses Helmet for the same purpose", "A Content-Security-Policy restricts where scripts may come from; this site does not set one yet"], [["j-tls", "HSTS depends on HTTPS."], ["j-api", "Helmet runs in the API."]], [CICT, SITE]),
  n("ops", "o-cors", "CORS and CSRF", "protect", 1, "built", "Rules for which origins may call the API and for protecting cookie sessions.", "Stops other websites from using a visitor's logged-in browser against your API.", ["CORS allows only the configured frontend origins, set per environment", "CSRF protection guards state-changing requests"], [["j-api", "Both live in the API."], ["r-secrets", "The allowed origins are environment variables."]], [CICT]),
  n("ops", "o-scan", "Dependency and secret scanning", "protect", 2, "built", "Automated checks for vulnerable packages and leaked credentials.", "Keeps known problems out of the build.", ["CodeQL, dependency audit, secret scan and dependency review run in CI"], [["r-sec", "Runs as part of the release flow."]], [CICT]),
  n("ops", "o-access", "Access control", "protect", 3, "built", "Who may do what, enforced on the server.", "Authorization that exists only in the interface is not authorization.", ["Roles and tokens checked in the API", "A permission matrix documents the rules"], [["t-jwt", "Tokens and roles."], ["m-roles", "The permission matrix is the design."], ["a-perm", "The matrix is the document."]], [CICT]),
  n("ops", "o-backup", "Backups", "restore", 0, "concept", "Regular copies of the database and files, kept somewhere else.", "Hosting is not a backup. Deleted or corrupted data only comes back if a copy exists.", ["A documented requirement for the delivered projects, not shown as verified", "Needs a schedule, a separate location and a retention rule"], [["j-data", "The data layer is what is being protected."]]),
  n("ops", "o-restore", "Restore drills", "restore", 1, "concept", "Practising getting back from a backup.", "A backup you have never restored is a hope, not a plan.", ["Restore into a non-production target", "Record how long it took and what was missing"], [["o-backup", "A drill proves the backup works."]]),
];

export const infraNodeById = new Map(infraNodes.map((x) => [x.id, x]));
export const infraGroupById = new Map(infraGroups.map((g) => [g.id, g]));

export interface InfraEdge {
  id: string;
  from: string;
  to: string;
  kind: "journey" | "chain" | "relates";
  carries: string;
  why: string;
}

/** Chain edges follow `order` inside ordered groups; "relates" edges come from each node's links, listed once per pair. */
export function buildInfraEdges(): InfraEdge[] {
  const out: InfraEdge[] = [];
  const seen = new Set<string>();
  infraGroups
    .filter((g) => g.chain)
    .forEach((g) => {
      const list = infraNodes.filter((x) => x.group === g.id).sort((a, b) => a.order - b.order);
      list.slice(1).forEach((x, i) => {
        const prev = list[i];
        out.push({
          id: `${prev.id}>${x.id}`,
          from: prev.id,
          to: x.id,
          kind: g.lane === "journey" ? "journey" : "chain",
          carries: g.lane === "journey" ? "The request" : "A change that passed the previous step",
          why: g.lane === "journey" ? `${x.title} is the next stop for a request after ${prev.title}.` : `${x.title} only runs if ${prev.title} succeeds.`,
        });
        seen.add(`${prev.id}|${x.id}`);
        seen.add(`${x.id}|${prev.id}`);
      });
    });
  infraNodes.forEach((x) =>
    x.links.forEach(([other, why]) => {
      if (seen.has(`${x.id}|${other}`)) return;
      seen.add(`${x.id}|${other}`);
      seen.add(`${other}|${x.id}`);
      out.push({ id: `${x.id}~${other}`, from: x.id, to: other, kind: "relates", carries: "Related", why });
    })
  );
  return out;
}
