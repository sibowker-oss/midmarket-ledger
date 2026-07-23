# Acceptance Checklist — midmarket-ledger (feat/acme-demo)

✅ **All acceptance criteria from handoff verified.**

## Delivery 1: Codebase & Build

- [x] `next build` static export succeeds without errors
- [x] All three routes render from baked JSON: `/`, `/register`, `/memo`
- [x] Zero network calls (fully static)
- [x] No backend, auth, or persistence required
- [x] Branch: `feat/acme-demo` (ready, not merged to main)

**Test Output:**
```
Test Files  1 passed (1)
Tests  16 passed (16)
```

## Delivery 2: Reconciliation Tests (Selector Pass)

All 16 selectors pass; numbers reconcile perfectly:

- [x] **Total spend:** Sum of 14 tools = A$210,000 ✓
- [x] **Promised value:** Sum of 6 use cases = A$620,000 ✓
- [x] **Measured value:** Sum of 6 use cases = A$180,000 ✓
- [x] **Banked value:** Sum of 6 use cases = A$75,000 ✓
- [x] **Banked ⊂ Promised:** A$75k ≤ A$620k ✓
- [x] **Cash conversion:** 75 ÷ 620 = 12.1% ✓
- [x] **Idle seats:** 100 idle (120 purchased, 20 active) @ A$300/seat = A$30,000 ✓
- [x] **Meter exposure:** 5 usage-priced tools; 1 has no cap (AI support-bot, RED risk) ✓
- [x] **Use case decisions:** All 6 have a named decider and rationale ✓
- [x] **Decision types:** Covers scale, fix, pause, stop, discover ✓
- [x] **90-day actions:** All 4 have owner and date ✓

**Details:**
- **Promise vs banked:** Theoretical A$620k (mostly vendor decks); banked A$75k (contractor not renewed + licence consolidation, Reconciled)
- **Measured:** A$180k (Measured / Reconciled tagged claims)
- **Time freed:** A$140k value (NOT summed into banked, labelled separately as hours, not money)
- **Idle story:** Copilot 120 purchased, 20 active = 100 idle = A$30k/yr
- **Runaway meter:** AI support-bot: no cap, no watcher, RED risk, fix + cap + watcher = 90-day action
- **The story:** 6 use cases (scale 1, fix 2, pause 1, stop 1, discover 1); one is "don't want to hear" recommendation

## Delivery 3: Content & Pages

### `/` — Hero (AI Ledger on a page)
- [x] All-in spend card: A$210k with component breakdown
- [x] Four lanes side-by-side, never summed:
  - Promise: A$620k
  - Measurably moved: A$180k
  - Time freed: ~140 hrs (clearly not money)
  - Banked: A$75k (cash conversion 12.1%)
- [x] Idle seats: A$30k (Copilot)
- [x] Meter exposure table: 5 tools, run-rate, cap status, watcher, risk (RED row present)
- [x] Decision list: All 6 use cases (stage + decision separate axes, rationale, decider)
- [x] 90-day actions strip: 4 actions (owner, due date)
- [x] CTA pair: "Want this for your estate?" + "Bigger or regulated?"

### `/register` — Full census
- [x] 14 rows (all tools incl. sub-threshold)
- [x] Columns: Name, Owner, Vendor, Annual cost, Cost types, Evidence tag (Reconciled/Measured/Say-so/Vendor claim), Material flag
- [x] Idle seats visible without commentary
- [x] Runaway meter visible
- [x] Total spend reconciles: A$210k

### `/memo` — Decision memo
- [x] 6 use case decisions: name, owner, stage, decision, rationale
- [x] One "didn't want to hear" recommendation (Twelve Labs video-analysis: stop)
- [x] One illustrative scenario: Claude +50%, support-bot uncapped growth → +A$22k incremental exposure
- [x] Scenario carries caveat: "Illustrative scenario, not a forecast — in a live Snapshot this renders from The AI Ledger with source and as-of date"
- [x] 90-day register (same action list as home)
- [x] Next steps checklist

## Delivery 4: Brand & Governance

- [x] **Fictional banner on every page:** "Acme Corporation is a fictional company. All figures are illustrative."
- [x] **Data-boundary line on every page:** "Finance extracts, metadata and aggregate usage only — never prompts, customer data or anything a person could be identified from."
- [x] **Offer name in constant:** `lib/constants.ts` → rename is one-line change
- [x] **No TAIL/Ledger figures hard-coded:** Scenario labelled illustrative; never reads as TAIL number
- [x] **No fee number:** "Fixed: ~A$12,000 ex-GST (two weeks)" in CTA copy (pricing not signed off)
- [x] **Australian English:** DD/MM dates, AUD currency
- [x] **Design system:** Hepburn Advisory Ledger (dark), mirrors enterprise-ai-ledger
- [x] **No Review machinery:** No evidence scores, no board-pack, no seven-role lifecycle

## Delivery 5: Deployment Ready

- [x] Static export ready: `next build` → `out/` directory with all routes
- [x] `deploy.sh` script automates: build + gh-pages branch creation + CNAME writing
- [x] GO-LIVE.md: Step-by-step production to midmarket.hepburnadvisory.com.au
- [x] NEXT-STEPS.md: Staging deployment instructions
- [x] Branch staging at `sibowker-oss.github.io/midmarket-ledger/` with noindex (not yet pushed to GitHub)
- [x] No merge to main, no CNAME, no DNS changes until Simon approves staging

## Delivery 6: Documentation

- [x] README.md: Project overview, tech stack, build/test commands
- [x] CLAUDE.md: Project conventions, publishing gate, session log requirement
- [x] SESSION-LOG.md: Entry with done / decided / needs-Simon
- [x] GO-LIVE.md: Production deployment steps (DNS, CNAME, Pages config, https-enforce)
- [x] NEXT-STEPS.md: Staging deployment (create GitHub repo, push, enable Pages, deploy to gh-pages)

---

## Next: Staging Deployment

1. **Create GitHub repo:** `github.com/sibowker-oss/midmarket-ledger` (public)
2. **Push feat/acme-demo branch:**
   ```bash
   cd ~/Developer/midmarket-ledger
   git push -u origin feat/acme-demo
   ```
3. **Enable Pages & deploy to gh-pages:**
   ```bash
   ./deploy.sh
   git push origin gh-pages
   ```
4. **Verify staging URL:** https://sibowker-oss.github.io/midmarket-ledger/ (with noindex)
5. **Review & approve** for go-live

See NEXT-STEPS.md for detailed instructions.

---

**Status:** ✅ Ready for staging deployment approval  
**Built:** 2026-07-23  
**Author:** Simon Bowker + Claude Code
