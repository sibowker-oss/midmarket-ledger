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

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
BUILD_HASH=$(git rev-parse --short HEAD)
BUILD_DIR=$(pwd)/out

# Check if gh-pages branch exists; if not, create it
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
  echo "Creating new gh-pages branch..."
  git checkout --orphan gh-pages
  git rm -rf . 2>/dev/null || true
  git commit --allow-empty -m "Initial gh-pages commit"
  git checkout "$CURRENT_BRANCH"
fi

# Now update gh-pages with new build
git checkout gh-pages

# Clear old files
git rm -rf . 2>/dev/null || true

# Copy build output (use absolute path)
cp -r "$BUILD_DIR"/* .

# Write CNAME if provided
if [ -n "$CNAME_DOMAIN" ]; then
  echo "$CNAME_DOMAIN" > CNAME
  echo "📝 Written CNAME: $CNAME_DOMAIN"
fi

# Commit
git add .
git commit -m "Deploy: $BUILD_HASH" || echo "No changes to commit"

echo "✅ Deployment ready on gh-pages branch"
echo "   Commit hash: $(git rev-parse --short HEAD)"
echo "   Push with: git push origin gh-pages"

# Return to original branch
git checkout "$CURRENT_BRANCH"
