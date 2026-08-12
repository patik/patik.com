import { formatPartialDate, normalizeDatePrecision, type DatePrecision } from '@src/utils/formatPartialDate'
import { slugify } from '@src/utils/slugify'

export type TeamRole = 'home' | 'away' | 'neutral'

export type MatchResult = 'win' | 'draw' | 'loss'

export interface MatchTeam {
    name: string
    role: TeamRole
    score: number
}

export interface MatchScorer {
    name: string
    team: string
    minute: string
}

export interface FootballMatch {
    id: string
    date: string
    datePrecision: DatePrecision
    venue: string
    city: string
    state: string | null
    country: string
    competition: string
    season: string | null
    stage: string | null
    teams: MatchTeam[]
    aggregate?: string
    scorers: MatchScorer[]
    attendance: number | null
    referee: string | null
    note?: string
}

export interface TeamAppearance {
    match: FootballMatch
    role: TeamRole
    result: MatchResult
    goalsFor: number
    goalsAgainst: number
}

export interface TeamSummary {
    name: string
    totalAppearances: number
    wins: number
    draws: number
    losses: number
    goalsFor: number
    goalsAgainst: number
    appearances: TeamAppearance[]
}

export interface FootballStats {
    matchCount: number
    teamCount: number
    goalCount: number
    competitionCount: number
    countryCount: number
    yearRange: string
}

export interface FootballPageViewData {
    stats: FootballStats
    matches: {
        newest: FootballMatch[]
        oldest: FootballMatch[]
    }
    teams: {
        byName: TeamSummary[]
        byCount: TeamSummary[]
    }
}

interface SourceMatchTeam {
    name: string
    role: string
    score: number
}

interface SourceFootballMatch {
    id: string
    date: string
    datePrecision: string
    venue: string
    city: string
    state: string | null
    country: string
    competition: string
    season: string | null
    stage: string | null
    teams: SourceMatchTeam[]
    aggregate?: string
    scorers: MatchScorer[]
    attendance: number | null
    referee: string | null
    note?: string
}

interface SourceFootballData {
    matches: SourceFootballMatch[]
}

const RESULT_LABELS: Record<MatchResult, string> = {
    win: 'Win',
    draw: 'Draw',
    loss: 'Loss',
}

export function normalizeFootballMatches(data: SourceFootballData): FootballMatch[] {
    return data.matches.map((match) => ({
        ...match,
        datePrecision: normalizeDatePrecision(match.datePrecision),
        teams: match.teams.map((team) => ({
            name: team.name,
            role: normalizeTeamRole(team.role),
            score: team.score,
        })),
    }))
}

/**
 * Builds every football page collection used by the static Astro template.
 * The client script then only switches between already-rendered panels.
 */
export function getFootballPageViewData(data: SourceFootballData): FootballPageViewData {
    const matches = normalizeFootballMatches(data)

    return {
        stats: getFootballStats(matches),
        matches: {
            newest: getMatchesByDate(matches, 'desc'),
            oldest: getMatchesByDate(matches, 'asc'),
        },
        teams: {
            byName: getTeamsByName(matches),
            byCount: getTeamsByAppearanceCount(matches),
        },
    }
}

export function getFootballStats(matches: FootballMatch[]): FootballStats {
    const teams = new Set<string>()
    const competitions = new Set<string>()
    const countries = new Set<string>()
    let goalCount = 0

    matches.forEach((match) => {
        competitions.add(match.competition)
        countries.add(match.country)

        match.teams.forEach((team) => {
            teams.add(team.name)
            goalCount += team.score
        })
    })

    const sortedMatches = getMatchesByDate(matches, 'asc')
    const firstYear = sortedMatches[0]?.date.slice(0, 4) ?? ''
    const lastYear = sortedMatches.at(-1)?.date.slice(0, 4) ?? ''

    return {
        matchCount: matches.length,
        teamCount: teams.size,
        goalCount,
        competitionCount: competitions.size,
        countryCount: countries.size,
        yearRange: firstYear && lastYear ? `${firstYear}-${lastYear}` : '',
    }
}

export function getMatchesByDate(matches: FootballMatch[], direction: 'asc' | 'desc'): FootballMatch[] {
    return [...matches].sort((firstMatch, secondMatch) => {
        const comparison = firstMatch.date.localeCompare(secondMatch.date)

        if (comparison !== 0) {
            return direction === 'asc' ? comparison : comparison * -1
        }

        return firstMatch.id.localeCompare(secondMatch.id)
    })
}

export function getTeamSummaries(matches: FootballMatch[]): TeamSummary[] {
    const summaries = new Map<string, TeamSummary>()

    matches.forEach((match) => {
        match.teams.forEach((team) => {
            const summary = summaries.get(team.name) ?? createTeamSummary(team.name)
            const appearance = createTeamAppearance(match, team)

            summary.totalAppearances += 1
            summary.goalsFor += appearance.goalsFor
            summary.goalsAgainst += appearance.goalsAgainst
            summary.appearances.push(appearance)

            if (appearance.result === 'win') {
                summary.wins += 1
            }

            if (appearance.result === 'draw') {
                summary.draws += 1
            }

            if (appearance.result === 'loss') {
                summary.losses += 1
            }

            summaries.set(team.name, summary)
        })
    })

    return [...summaries.values()].map((summary) => ({
        ...summary,
        appearances: [...summary.appearances].sort((firstAppearance, secondAppearance) => {
            const comparison = firstAppearance.match.date.localeCompare(secondAppearance.match.date)

            if (comparison !== 0) {
                return comparison * -1
            }

            return firstAppearance.match.id.localeCompare(secondAppearance.match.id)
        }),
    }))
}

export function getTeamsByName(matches: FootballMatch[]): TeamSummary[] {
    return getTeamSummaries(matches).sort((firstTeam, secondTeam) => firstTeam.name.localeCompare(secondTeam.name))
}

export function getTeamsByAppearanceCount(matches: FootballMatch[]): TeamSummary[] {
    return getTeamSummaries(matches).sort((firstTeam, secondTeam) => {
        if (secondTeam.totalAppearances !== firstTeam.totalAppearances) {
            return secondTeam.totalAppearances - firstTeam.totalAppearances
        }

        return firstTeam.name.localeCompare(secondTeam.name)
    })
}

/** Home team first so the scoreline reads the conventional way; neutral ties keep source order. */
export function getOrderedTeams(match: FootballMatch): MatchTeam[] {
    const homeTeam = match.teams.find((team) => team.role === 'home')
    const awayTeam = match.teams.find((team) => team.role === 'away')

    if (homeTeam && awayTeam) {
        return [homeTeam, awayTeam]
    }

    return match.teams
}

export function formatMatchDate(match: FootballMatch): string {
    return formatPartialDate(match.date, match.datePrecision)
}

export function formatMatchLocation(match: FootballMatch): string {
    const region = match.state ?? match.country

    return `${match.city}, ${region}`
}

export function formatCompetition(match: FootballMatch): string {
    return match.season ? `${match.competition} ${match.season}` : match.competition
}

export function formatCompetitionDetail(match: FootballMatch): string {
    const competition = formatCompetition(match)

    return match.stage ? `${competition} • ${match.stage}` : competition
}

export function formatScore(match: FootballMatch): string {
    return getOrderedTeams(match)
        .map((team) => team.score)
        .join('–')
}

export function formatScoreline(match: FootballMatch): string {
    const [firstTeam, secondTeam] = getOrderedTeams(match)

    if (!firstTeam || !secondTeam) {
        return match.teams.map((team) => team.name).join(' v ')
    }

    return `${firstTeam.name} ${firstTeam.score}–${secondTeam.score} ${secondTeam.name}`
}

export function formatMinute(minute: string): string {
    return `${minute}'`
}

export function formatAttendance(attendance: number): string {
    return attendance.toLocaleString('en-US')
}

export function getResultLabel(result: MatchResult): string {
    return RESULT_LABELS[result]
}

export function getTeamAnchor(name: string): string {
    return `team-${slugify(name)}`
}

function createTeamSummary(name: string): TeamSummary {
    return {
        name,
        totalAppearances: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        appearances: [],
    }
}

function createTeamAppearance(match: FootballMatch, team: MatchTeam): TeamAppearance {
    const goalsAgainst = match.teams.reduce(
        (total, otherTeam) => (otherTeam.name === team.name ? total : total + otherTeam.score),
        0,
    )

    return {
        match,
        role: team.role,
        result: getMatchResult(team.score, goalsAgainst),
        goalsFor: team.score,
        goalsAgainst,
    }
}

function getMatchResult(goalsFor: number, goalsAgainst: number): MatchResult {
    if (goalsFor > goalsAgainst) {
        return 'win'
    }

    if (goalsFor < goalsAgainst) {
        return 'loss'
    }

    return 'draw'
}

function normalizeTeamRole(role: string): TeamRole {
    switch (role) {
        case 'home':
        case 'away':
        case 'neutral':
            return role
        default:
            throw new Error(`Unknown team role: ${role}`)
    }
}
