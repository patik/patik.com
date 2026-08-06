#!/usr/bin/env bash
#
# Runs the visual regression suite on Linux, so the screenshots it renders match the
# committed baselines byte-for-byte. Baselines are Linux-only — see snapshotPathTemplate
# in playwright.config.ts for why.
#
#   pnpm test:visual                    compare against the committed baselines
#   pnpm test:update-snapshots          accept intentional UI changes
#   scripts/visual.sh --grep countries  any other playwright flags pass through
#
# On Linux (CI, or a Linux dev box) this runs Playwright directly. Anywhere else it goes
# through the Playwright container, building the site on the host first: the build needs
# the Cloudinary credentials in .env and the local tmp/ fetch cache, and CI=1 is what
# makes playwright.config.ts skip its own build step and just serve the dist/ we hand it.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ "$(uname -s)" = "Linux" ]; then
    # Already on the baseline platform; a container would buy nothing. CI builds dist/ in
    # its own step, so don't rebuild it here.
    exec pnpm exec playwright test visual.spec.ts "$@"
fi

# Pin to the installed Playwright version. A container whose browser build differs from
# the one that produced the baselines defeats the entire point of using a container.
PLAYWRIGHT_VERSION="$(node -p "require('@playwright/test/package.json').version")"
IMAGE="mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble"

# Linux-native node_modules. It cannot be the host's — those binaries (sharp, rollup,
# oxlint) are macOS builds. A named volume keeps the install warm between runs; clear both
# volumes with `docker volume rm patikcom-linux-node-modules patikcom-linux-pnpm-store`
# if they ever get out of sync.
NODE_MODULES_VOLUME="patikcom-linux-node-modules"

# pnpm can't write to the container's home directory, so it falls back to a store beside
# the project — which is the bind-mounted repo, i.e. half a gigabyte dumped into the
# working tree. --store-dir below sends it to this volume instead, mounted outside /work
# so that not even an empty mount-point directory lands in the repo.
PNPM_STORE_VOLUME="patikcom-linux-pnpm-store"

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
    --workdir /work \
    --env CI=1 \
    "$IMAGE" \
    bash -c 'corepack enable pnpm \
        && pnpm install --frozen-lockfile --prefer-offline --store-dir /pnpm-store \
        && pnpm exec playwright test visual.spec.ts "$@"' bash "$@"
