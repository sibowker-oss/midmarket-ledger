# AI Ledger Snapshot — Acme Corporation Demo

A static, read-only prototype of the **AI Ledger Snapshot** product for mid-market companies, populated with fictional **Acme Corporation** data.

## What this is

- **Three routes:** 
  - `/` — The hero: Snapshot on one page (all-in spend, four value lanes, cash conversion, idle seats, meter exposure, decisions)
  - `/register` — Full census of 14 tools/subscriptions with owners, costs, evidence tags
  - `/memo` — Decision memo with use cases, independent recommendation, illustrative scenario, 90-day action register

- **Acme Corporation:** Fictional equipment distributor, ~350 staff, ~A$210k/yr all-in AI spend
- **Internally consistent:** 14 tools, 6 material use cases, promised A$620k, measured A$180k, **banked A$75k (cash conversion 12.1%)**
- **No backend:** Static Next.js export, baked seed JSON, zero network calls

## Tech

- **Stack:** Next.js 14 + TypeScript + Tailwind CSS + Recharts
- **Design system:** Hepburn Advisory Ledger (dark surface), mirrors enterprise-ai-ledger
- **Tests:** 16 reconciliation selectors verify: lanes reconcile, banked ⊂ promised, register totals match, deciders named
- **Export:** Static HTML only; runs anywhere GitHub Pages can reach

## Build & test

```bash
npm install
npm test         # Run reconciliation selectors
npm run build    # Static export to ./out
npm run dev      # Local dev server (http://localhost:3000/midmarket-ledger)
```

## Deployment

**Staging first** (noindex, GitHub Pages project URL):
```bash
./deploy.sh                    # Builds and preps gh-pages branch
git push origin gh-pages       # Deploys to https://sibowker-oss.github.io/midmarket-ledger/
```

**Go-live** (branded domain, no noindex): See [GO-LIVE.md](GO-LIVE.md)

## Key constraints

- Everything is fictional; banner + data-boundary line on every page
- No fee number visible (pricing not signed off)
- "AI Ledger Snapshot" offer name lives in `lib/constants.ts` (one-line rename)
- Four value lanes **never summed**; time-freed visibly not-money
- One meter deliberately uncapped/unwatched (the story)
- Scenario carries "illustrative, not forecast" caveat

## Files

- `data/seed-data.json` — Acme Corporation numbers (14 tools, 6 use cases, all metrics)
- `lib/types.ts` — Data model
- `lib/constants.ts` — Offer name, disclaimer, copy (edit here for changes)
- `lib/calculations.ts` — Reconciliation helpers (used by tests)
- `__tests__/reconciliation.test.ts` — 16 selector tests verifying integrity
- `app/layout.tsx` — Root layout with noindex meta tag (remove on go-live)
- `app/page.tsx` — Hero (Snapshot on a page)
- `app/register/page.tsx` — Full census
- `app/memo/page.tsx` — Decision memo

---

**Owner:** Simon Bowker  
**Status:** Built, ready for staging deployment (GitHub Pages)  
**Next:** Push to `sibowker-oss/midmarket-ledger`, deploy to `gh-pages`, review at staging URL
