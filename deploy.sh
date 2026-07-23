#!/bin/bash
set -e

# Deploy script for midmarket-ledger to GitHub Pages
# Usage: ./deploy.sh [basePath] [cname]
#   ./deploy.sh                                  # Deploy to /midmarket-ledger (default)
#   ./deploy.sh "" midmarket.hepburnadvisory.com.au  # Deploy to root with CNAME

BASE_PATH="${1:--midmarket-ledger}"
CNAME_DOMAIN="${2:-}"

# Ensure clean working tree
if ! git diff-index --quiet HEAD --; then
  echo "Error: Working tree is dirty. Commit or stash changes first."
  exit 1
fi

echo "🏗  Building static export..."
if [ -z "$BASE_PATH" ]; then
  NEXT_PUBLIC_BASE_PATH="" npm run build
else
  NEXT_PUBLIC_BASE_PATH="/$BASE_PATH" npm run build
fi

echo "📦 Preparing gh-pages deployment..."

# Create a temporary worktree for gh-pages
TEMP_BRANCH=$(mktemp -d)
trap "rm -rf $TEMP_BRANCH" EXIT

git worktree add "$TEMP_BRANCH" gh-pages 2>/dev/null || git worktree add "$TEMP_BRANCH" --orphan gh-pages

# Copy build output
rm -rf "$TEMP_BRANCH"/*
cp -r out/* "$TEMP_BRANCH/"

# Write CNAME if provided
if [ -n "$CNAME_DOMAIN" ]; then
  echo "$CNAME_DOMAIN" > "$TEMP_BRANCH/CNAME"
  echo "📝 Written CNAME: $CNAME_DOMAIN"
fi

# Commit and push
cd "$TEMP_BRANCH"
git add .
git commit -m "Deploy: $(git rev-parse --short HEAD)" || echo "No changes to commit"

echo "✅ Deployment ready on gh-pages branch"
echo "   Push with: git push origin gh-pages"
