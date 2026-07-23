#!/bin/bash
set -e

# Deploy script for midmarket-ledger to GitHub Pages
# Creates an orphan gh-pages branch with only static files

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
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Copy only the static files to temp directory
cp -r out/* "$TEMP_DIR/"

# Add CNAME if provided
if [ -n "$CNAME_DOMAIN" ]; then
  echo "$CNAME_DOMAIN" > "$TEMP_DIR/CNAME"
  echo "📝 Written CNAME: $CNAME_DOMAIN"
fi

# Add .nojekyll to prevent GitHub from processing files
touch "$TEMP_DIR/.nojekyll"

# Create orphan gh-pages branch (completely separate history)
git checkout --orphan gh-pages

# Clear working directory and stage area
git rm -rf . 2>/dev/null || true

# Copy static files
cp -r "$TEMP_DIR"/* .

# Commit the deployment
git add .
git commit -m "Deploy: $BUILD_HASH"

echo "✅ Deployment ready on gh-pages branch"
echo "   Commit hash: $(git rev-parse --short HEAD)"
echo "   Push with: git push -f origin gh-pages"

# Return to original branch
git checkout "$CURRENT_BRANCH"
