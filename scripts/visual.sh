#!/usr/bin/env bash
#
# Runs the visual suite on Linux so it matches the committed baselines byte-for-byte.
#
#   pnpm test:visual                    compare against the baselines
#   pnpm test:update-snapshots          accept intentional UI changes
#   scripts/visual.sh --grep countries  other playwright flags pass through
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
