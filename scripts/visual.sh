#!/usr/bin/env bash
#
# Runs the visual suite on Linux, the platform the committed baselines come from.
#
#   pnpm test:visual                    compare against the baselines
#   pnpm test:update-snapshots          accept intentional UI changes
#   scripts/visual.sh --grep countries  other playwright flags pass through
#
# The baselines bake in whatever the Typekit kit (use.typekit.net/tfz6xpv.css) served when
# they were generated, so editing the kit — adding a family, widening a character set —
# re-rasterises every page carrying body text and invalidates the baselines on every branch
# at once, retroactively. The tell is a site-wide failure of 0.3-2% of pixels where the
# layout is identical, with only the element-scoped shots (code block, map) still passing:
# those are monospace and SVG, the two things the kit doesn't touch. That is the kit moving,
# not the CSS. Regenerate via Actions → "Update visual snapshots".
#
# Linux runs Playwright directly; elsewhere goes through the container. The build stays
# on the host (it needs .env and tmp/); CI=1 tells the config to just serve dist/.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ "$(uname -s)" = "Linux" ]; then
    # Already on the baseline platform, and CI builds dist/ in its own step.
    exec pnpm exec playwright test visual.spec.ts "$@"
fi

# Pinned to the installed version: a different browser build won't match the baselines.
PLAYWRIGHT_VERSION="$(node -p "require('@playwright/test/package.json').version")"
IMAGE="mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble"

# Can't reuse the host's node_modules — those binaries are macOS builds. Volumes keep the
# install warm; `docker volume rm` both if they get out of sync.
NODE_MODULES_VOLUME="patikcom-linux-node-modules"

# Without --store-dir, pnpm drops ~550MB beside the project, i.e. into the bind mount.
PNPM_STORE_VOLUME="patikcom-linux-pnpm-store"

# Corepack re-downloads pnpm on every run otherwise, since the container itself is throwaway.
COREPACK_CACHE_VOLUME="patikcom-linux-corepack-cache"

if ! docker info >/dev/null 2>&1; then
    echo "error: Docker isn't running. Start Docker Desktop and try again." >&2
    exit 1
fi

echo "==> Building the site on the host"
pnpm build

echo "==> Running visual tests in ${IMAGE}"
exec docker run --rm \
    --volume "$PWD":/work \
    --volume "${NODE_MODULES_VOLUME}":/work/node_modules \
    --volume "${PNPM_STORE_VOLUME}":/pnpm-store \
    --volume "${COREPACK_CACHE_VOLUME}":/root/.cache/node/corepack \
    --workdir /work \
    --env CI=1 \
    --env COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    "$IMAGE" \
    bash -c 'corepack enable pnpm \
        && pnpm install --frozen-lockfile --prefer-offline --store-dir /pnpm-store \
        && pnpm exec playwright test visual.spec.ts "$@"' bash "$@"
