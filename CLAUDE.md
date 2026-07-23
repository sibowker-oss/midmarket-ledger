# CLAUDE.md — AI Ledger Snapshot (Acme demo)

A publishable, interactive prototype of the **AI Ledger Snapshot** — a Hepburn
Advisory product concept for mid-market companies, populated with a fictional
equipment-distribution company (**Acme Corporation** — illustrative, not real).

- **Owner:** Simon Bowker (sibowker@gmail.com)
- **Repo:** github.com/sibowker-oss/midmarket-ledger
- **Stack:** Next.js static export → GitHub Pages (sibowker-oss.github.io/midmarket-ledger)
- **Sister repo:** enterprise-ai-ledger (do not touch)

## Publishing gate

Nothing reaches a public URL without staging first. This repo's `main` builds to
GitHub Pages — treat any push to `main` as a publish and get Simon's explicit
in-session approval first. Staging always ships with `noindex` meta tag and no
inbound links.

## Key hard gates

1. **Staging first** — deploy to plain GitHub Pages URL with noindex before any merge to main
2. **No CNAME or DNS changes** — these require Simon's approval at staging sign-off
3. **Offer name in one constant** — `lib/constants.ts` holds "AI Ledger Snapshot"; renaming is one-line
4. **Everything fictional** — banner on every page + data-boundary line visible
5. **No fee figure** — pricing not signed off; "fixed fee, two weeks" copy only
6. **Selector tests pass** — lanes reconcile, cash conversion correct, register totals match, all deciders named

## Session log

At the end of any significant session, append a one-line entry to `SESSION-LOG.md`:

    YYYY-MM-DD — done: <what shipped> — decided: <decisions> — needs-Simon: <approvals>.
