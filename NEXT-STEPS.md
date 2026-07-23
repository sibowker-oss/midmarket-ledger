# Next Steps — Staging Deployment

The codebase is ready. To get to **staging URL** (`https://sibowker-oss.github.io/midmarket-ledger/` with noindex), follow these steps:

## 1. Create the GitHub repository

Create a **public** repository named `midmarket-ledger` under your GitHub account (`sibowker-oss`).

```bash
# Option A: Create on github.com manually
# → New repo → "midmarket-ledger" → Public → Create

# Option B: Use GitHub CLI
gh repo create sibowker-oss/midmarket-ledger --public
```

## 2. Push the feat/acme-demo branch to GitHub

```bash
cd /Users/simonbowker/Developer/midmarket-ledger

# Push feat/acme-demo (the build branch)
git push -u origin feat/acme-demo

# Do NOT merge to main or push to gh-pages yet
```

## 3. Enable GitHub Pages

In the repository settings on GitHub:

1. **Settings → Pages**
2. **Build and deployment** → **Source**: "Deploy from a branch"
3. **Branch**: Select `gh-pages` (will appear once you deploy in next step)
4. **Custom domain**: Leave empty for now (staging uses project path)

## 4. Build and deploy to gh-pages

```bash
cd /Users/simonbowker/Developer/midmarket-ledger

# Build the static export and prepare gh-pages branch
./deploy.sh

# This creates/updates the gh-pages branch locally with the build output
# Verify it worked:
git branch -a  # Should show gh-pages

# Push gh-pages to GitHub
git push origin gh-pages
```

## 5. Verify staging is live

Visit: **https://sibowker-oss.github.io/midmarket-ledger/**

Check:
- [ ] Page loads without errors
- [ ] All three routes work: `/`, `/register`, `/memo`
- [ ] Fictional banner visible on every page
- [ ] Data-boundary line at bottom
- [ ] Navigation links (Snapshot → Census → Memo) work
- [ ] No console errors
- [ ] Check noindex meta tag is present: `<meta name="robots" content="noindex, nofollow" />`

---

## 6. Review & approve

Once staging is live and verified:

- [ ] Test responsive design (phone/tablet/desktop)
- [ ] Check CTA links point to hepburnadvisory.com.au (the links are just href text for now)
- [ ] Verify all 16 reconciliation tests pass: `npm test`

If all looks good, **staging is approved for go-live**.

---

## 7. Go-live (when ready)

See [GO-LIVE.md](GO-LIVE.md) for steps to deploy to `midmarket.hepburnadvisory.com.au`.

---

## Troubleshooting

**Pages not building?**
- Check GitHub Actions in repo settings; there may be a default workflow. We don't use Actions—we push a pre-built `gh-pages` branch.
- Make sure `gh-pages` branch exists and contains the static build (files in `out/`).

**Staging URL shows 404?**
- Wait 5–10 minutes for GitHub Pages to re-index.
- Check the `gh-pages` branch contains the files (not just a commit).

**Links not working?**
- The site uses relative paths. Ensure `basePath: "/midmarket-ledger"` in `next.config.mjs` when building locally.
- The deploy script sets this automatically.

---

**Questions?** See README.md, CLAUDE.md, or GO-LIVE.md.
