/**
 * Downloads team crests from TheSportsDB into src/images/crests/, named after the team slug
 * so TeamCrest can glob them without a lookup table.
 *
 * Run by hand (`pnpm crests:refresh`) rather than during the build: TheSportsDB badge URLs
 * carry an upload timestamp and change when a club re-uploads, and a per-build fetch would
 * put a free third-party API in the critical path of every Netlify and CI build.
 *
 * Review the printed table before committing — the name match is a heuristic.
 */
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

interface SportsDbTeam {
    strTeam: string
    strSport: string
    strGender: string | null
    strBadge: string | null
}

interface SportsDbSearchResponse {
    teams: SportsDbTeam[] | null
}

interface TeamBadge {
    matchedName: string
    badgeUrl: string
}

/** Display names carry qualifiers TheSportsDB doesn't file teams under. */
const NATIONAL_TEAM_SUFFIX = /\s+(?:men|women)['’]s national team$/i
const CLUB_AFFIX = /^(?:fc|afc|ac|as|sc|cf)\s+|\s+(?:fc|afc|cf|sc)$/i

/** "United States" resolves to the U-17 side, and a name alone can't rule out a youth team. */
const YOUTH_TEAM = /\bu-?\d{2}\b/i

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const crestsDir = path.join(projectRoot, 'src/images/crests')
const apiKey = process.env.THESPORTSDB_API_KEY ?? '3'
const searchUrl = `https://www.thesportsdb.com/api/v1/json/${apiKey}/searchteams.php`

/**
 * Names TheSportsDB files differently than football.json does. Searching for the USMNT's full
 * name finds nothing, and plain "United States" returns the under-17 side.
 */
const SEARCH_OVERRIDES: Record<string, string> = {
    "United States Men's National Team": 'USA',
}

/** 200x200 source for a crest rendered at 24px — Astro downscales it at build time. */
const BADGE_VARIANT = '/small'

/** The free key allows roughly 30 requests a minute, and answers 429 past that. */
const REQUEST_INTERVAL_MS = 1200
const RATE_LIMIT_RETRIES = 3
const RATE_LIMIT_BACKOFF_MS = 15_000

function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

/** Retries only on 429 — any other failure is a real error worth surfacing immediately. */
async function fetchWithRateLimitRetry(url: string): Promise<Response> {
    for (let attempt = 0; attempt <= RATE_LIMIT_RETRIES; attempt += 1) {
        const response = await fetch(url)

        if (response.status !== 429) {
            return response
        }

        if (attempt < RATE_LIMIT_RETRIES) {
            console.warn(`    rate limited, waiting ${RATE_LIMIT_BACKOFF_MS / 1000}s`)
            await wait(RATE_LIMIT_BACKOFF_MS)
        }
    }

    throw new Error(`Rate limited by TheSportsDB after ${RATE_LIMIT_RETRIES} retries: ${url}`)
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function getTeamNames(): string[] {
    const footballData: { matches: { teams: { name: string }[] }[] } = JSON.parse(
        readFileSync(path.join(projectRoot, 'src/football.json'), 'utf8'),
    )

    return [...new Set(footballData.matches.flatMap((match) => match.teams.map((team) => team.name)))].sort()
}

/**
 * Progressively simpler queries for one display name: "Liverpool FC" only finds the women's
 * side, and "Netherlands Men's National Team" finds nothing until the qualifier comes off.
 */
function getSearchCandidates(teamName: string): string[] {
    const override = SEARCH_OVERRIDES[teamName]
    const withoutNationalSuffix = teamName.replace(NATIONAL_TEAM_SUFFIX, '')

    return [
        ...new Set(
            [override, teamName, withoutNationalSuffix, withoutNationalSuffix.replace(CLUB_AFFIX, '')].filter(
                (candidate): candidate is string => Boolean(candidate),
            ),
        ),
    ]
}

/** The senior men's team — never a women's or youth side filed under the same name. */
function isSeniorMensTeam(team: SportsDbTeam): boolean {
    return (
        team.strSport === 'Soccer' &&
        team.strGender !== 'Female' &&
        !YOUTH_TEAM.test(team.strTeam) &&
        Boolean(team.strBadge)
    )
}

async function search(query: string): Promise<SportsDbTeam[]> {
    const response = await fetchWithRateLimitRetry(`${searchUrl}?t=${encodeURIComponent(query)}`)

    if (!response.ok) {
        throw new Error(`Search for "${query}" failed: ${response.status} ${response.statusText}`)
    }

    const body: SportsDbSearchResponse = await response.json()

    return body.teams ?? []
}

async function findBadge(teamName: string): Promise<TeamBadge | null> {
    for (const [index, candidate] of getSearchCandidates(teamName).entries()) {
        if (index > 0) {
            await wait(REQUEST_INTERVAL_MS)
        }

        const match = (await search(candidate)).find(isSeniorMensTeam)

        if (match?.strBadge) {
            return { matchedName: match.strTeam, badgeUrl: match.strBadge }
        }
    }

    return null
}

async function downloadBadge(badgeUrl: string, filePath: string): Promise<number> {
    const response = await fetchWithRateLimitRetry(`${badgeUrl}${BADGE_VARIANT}`)

    if (!response.ok) {
        throw new Error(`Download of ${badgeUrl} failed: ${response.status} ${response.statusText}`)
    }

    const bytes = Buffer.from(await response.arrayBuffer())
    writeFileSync(filePath, bytes)

    return bytes.byteLength
}

/** Renaming a team in football.json changes its slug, orphaning the file under the old one. */
function pruneOrphanedCrests(expectedFileNames: Set<string>): void {
    readdirSync(crestsDir)
        .filter((fileName) => fileName.endsWith('.png') && !expectedFileNames.has(fileName))
        .forEach((fileName) => {
            rmSync(path.join(crestsDir, fileName))
            console.log(`  – ${'(orphaned)'.padEnd(18)} ${''.padEnd(18)} ${fileName} removed`)
        })
}

async function refreshCrests(): Promise<void> {
    const teamNames = getTeamNames()
    const missing: string[] = []

    mkdirSync(crestsDir, { recursive: true })

    for (const [index, teamName] of teamNames.entries()) {
        if (index > 0) {
            await wait(REQUEST_INTERVAL_MS)
        }

        const badge = await findBadge(teamName)

        if (!badge) {
            missing.push(teamName)
            console.warn(`  ✗ ${teamName.padEnd(36)} no soccer team found`)
            continue
        }

        const fileName = `${slugify(teamName)}.png`
        const size = await downloadBadge(badge.badgeUrl, path.join(crestsDir, fileName))

        console.log(`  ✓ ${teamName.padEnd(36)} ${badge.matchedName.padEnd(18)} ${fileName} (${size} bytes)`)
    }

    // After the downloads, so a run that dies partway can't strip crests it never replaced.
    pruneOrphanedCrests(new Set(teamNames.map((teamName) => `${slugify(teamName)}.png`)))

    console.log(`\n${teamNames.length - missing.length}/${teamNames.length} crests written to src/images/crests/`)

    if (missing.length > 0) {
        console.warn(`No crest for: ${missing.join(', ')}. Those teams render without one.`)
        process.exitCode = 1
    }
}

refreshCrests().catch((error: unknown) => {
    console.error(error)
    process.exit(1)
})
