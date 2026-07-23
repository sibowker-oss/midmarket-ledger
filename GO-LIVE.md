# Go-Live Steps — midmarket-ledger to midmarket.hepburnadvisory.com.au

**Status:** Not executed. Awaiting Simon's approval of staging deployment.

This document outlines the steps to publish midmarket-ledger from staging (GitHub Pages URL with noindex) to production (branded domain with indexing enabled).

## Prerequisites

- Staging deployment is complete and approved at `https://sibowker-oss.github.io/midmarket-ledger/`
- This repo (`github.com/sibowker-oss/midmarket-ledger`) is pushed to GitHub with `gh-pages` branch containing the static build
- DNS hosting for `hepburnadvisory.com.au` is on Cloudflare (proxied)
- You have CLI access to `gh` (GitHub CLI) and Cloudflare DNS

---

## Step 1 — Add Cloudflare DNS record

**Location:** Cloudflare Dashboard → `hepburnadvisory.com.au` → DNS → Add record

| Field   | Value                     |
|---------|---------------------------|
| Type    | `CNAME`                   |
| Name    | `midmarket`               |
| Target  | `sibowker-oss.github.io`  |
| Proxy   | Proxied (orange cloud)    |
| TTL     | Auto                      |

**Note:** This should match the same proxy setting as the existing `enterprise` subdomain.

---

## Step 2 — Rebuild at root with CNAME + redeploy

The branded subdomain serves at **root** (not a project path), so rebuild with an empty `basePath` and commit the CNAME:

```bash
cd /Users/simonbowker/Developer/midmarket-ledger

# Build with empty basePath and write CNAME
./deploy.sh "" midmarket.hepburnadvisory.com.au

# Push the gh-pages branch
git push origin gh-pages
```

---

## Step 3 — Enable GitHub Pages custom domain

```bash
gh api -X PUT repos/sibowker-oss/midmarket-ledger/pages \
  -f 'cname=midmarket.hepburnadvisory.com.au' \
  -F 'https_enforced=true'
```

GitHub will provision the TLS certificate (takes ~5 minutes). The site is then live at:
```
https://midmarket.hepburnadvisory.com.au/
```

---

## Step 4 — Remove noindex meta tag

Once the custom domain is live and HTTPS is enforced, update `app/layout.tsx` to remove the noindex directive:

```tsx
// Remove or comment out:
// <meta name="robots" content="noindex, nofollow" />

// Update metadata.robots:
export const metadata: Metadata = {
  title: "...",
  description: "...",
  robots: {
    index: true,
    follow: true,
  },
};
```

Rebuild and redeploy:

```bash
npm run build
./deploy.sh "" midmarket.hepburnadvisory.com.au
git push origin gh-pages
```

---

## Step 5 — Verify

- [ ] Visit `https://midmarket.hepburnadvisory.com.au/` — should load with HTTPS lock
- [ ] Check all three routes: `/`, `/register`, `/memo`
- [ ] Verify HTTPS enforced (no http:// redirect loop)
- [ ] Spot-check: fictional banner visible on every page
- [ ] Data boundary line present

---

## Rollback

If anything breaks:

1. Revert DNS record (remove `midmarket` CNAME from Cloudflare)
2. Remove Pages custom domain: `gh api -X DELETE repos/sibowker-oss/midmarket-ledger/pages`
3. Site reverts to `https://sibowker-oss.github.io/midmarket-ledger/`

---

## Notes

- **Do not execute these steps until Simon approves staging.**
- The DNS record must exist **before** setting the Pages custom domain, or the working GitHub Pages URL will 301-redirect to a domain that doesn't resolve yet.
- The `deploy.sh` script handles the build, CNAME writing, and gh-pages branch setup. Do not hand-edit `gh-pages`.
