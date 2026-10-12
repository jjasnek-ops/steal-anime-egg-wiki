# Steal Anime Egg Wiki

Unofficial fan-made English guide for **Roblox Steal Anime Eggs**, place **96727061242653**, by **And Collect Insane Animes**.

Production origin is fixed at **https://stealanimeegg.wiki**. This project does not claim Roblox certification or developer authorization.

## Stack and local use

Astro 7.3.8 + Starlight 0.42.6; static generation, MDX content, Pagefind search. Node >=22.12.0 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm audit:site
```

The source content is in src/content/docs. The final static output is dist. Do not commit credentials. Optional GA4 and Search Console configuration is documented in .env.example.

## Publication and scope

Nine content/navigation/trust pages ship initially, plus a noindex 404 page. Eight pages are indexable. The current code answer is “No active codes found.” No game-client redemption test is claimed.

Complete egg/pet/item/map databases, rankings, odds, timers, detailed controls and patch contents remain deferred. See research/page-matrix.md and research/evidence-ledger.md.

## Cloudflare Pages

Project name: steal-anime-egg-wiki. Use the dashboard direct-upload flow with the contents of dist, or an authenticated Wrangler session:

```sh
pnpm verify
pnpm deploy
```

No paid plan or background content generator is needed. GitHub source hosting and validation alone do not imply a connected Pages auto-deploy pipeline. The launch report records the actual method and final domain state.

## Checks and evidence

- Technical audit: reports/technical-audit.json.
- Preflight: reports/00-preflight.md.
- Keyword baseline: research/baseline-v4.1.json.
- Incremental SEO records: research/keywords-2026-10-12.json.
- Sources and claim boundaries: research/evidence-ledger.md.

Dates change only after a meaningful edit or actual recheck. pnpm refresh-evidence captures primary metadata for manual review; it never edits guide prose or dates automatically.

## Attribution

The site uses the MIT-licensed [Starlight](https://github.com/withastro/starlight) documentation/wiki template and [Astro](https://github.com/withastro/astro). The self-owned Maid Cafe Simulator wiki was inspected as a template reference; its game content and identity were not copied. Original editorial egg graphics are not game screenshots. Game names and trademarks belong to their owners.

