# Preflight — Steal Anime Egg Wiki
Date: 2026-10-12 (Asia/Shanghai). Production origin: https://stealanimeegg.wiki

## Available
- Node.js 22.19.0; pnpm 11.25.0; Git 2.51.0.
- GitHub CLI authenticated as jjasnek-ops with repository access.
- Cloudflare dashboard authenticated. Account ID e26c192b02bb6ba662ec2e8a64a2c3a7.
- In-app browser supports DOM inspection; Google session authenticated. US-English unpersonalized Google SERP actually inspected.
- Roblox public APIs reachable. Target identity confirmed: place 96727061242653 / universe 10759478428 / creator group 424082979.
- Existing self-owned Astro wiki inspected as a template reference. Starlight is an alternative mature documentation/wiki template.
- Workspace empty; no ancestor AGENTS.md found.
- Raw official API and Google Suggest captures saved.

## Resolved / resolvable
- Wrangler absent globally; official npm Wrangler 4.149.0 works through npx.
- CLI Wrangler is unauthenticated. Browser dashboard session is authenticated, so Pages UI deployment remains available.
- Browser wrapper getTab timed out twice; documented browser.tabs.get + playwright.domSnapshot works.
- Dependencies and search assets can be installed from official npm registry.

## Measurement limitations
- Ahrefs / Semrush authenticated APIs unavailable. Historical KD 10 and first-result DR 4 are inherited user observations, not newly measured.
- Search volume and current DR unavailable. No fabricated numeric substitutes.
- Google Suggest successfully retrieved for four baseline queries.
- Google Trends API returned HTTP 429; browser check pending.
- Similarweb web-tool access failed; browser check pending.
- YouTube popularity is qualitative game-context evidence, not Google search-volume evidence.
- No game-client session or in-game code redemption test has occurred.

## Deployment state before work
- Domain owned per user; fixed domain will not be changed.
- DNS apex A: 54.149.79.189 / 34.216.117.25.
- Delegation: launch1.spaceship.net / launch2.spaceship.net.
- HTTPS request failed certificate establishment. Domain not serving the requested wiki.
- Cloudflare zone onboarding and registrar nameserver configuration may be needed.
- GSC and GA4 property access not yet inspected.
- No paid resources, resource deletions, or unrelated project modifications authorized or needed.

This file records preflight observations. Later resolution is recorded in launch and acceptance reports.

