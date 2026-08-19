/**
 * Converts scripts/seed-netherlands-2027.sql into an E2E harness seed payload
 * so the demo recording can load the real Netherlands itinerary without a login.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

const SQL_PATH = '/Volumes/Projects/dovetail/scripts/seed-netherlands-2027.sql'
const OUT_PATH = new URL('./netherlands-seed.json', import.meta.url).pathname

const sql = readFileSync(SQL_PATH, 'utf8')

type SqlValue = string | number | boolean | null

/** Extracts every top-level parenthesised tuple from a VALUES body. */
function extractTuples(body: string): string[] {
    const tuples: string[] = []
    let depth = 0
    let inString = false
    let start = -1

    for (let i = 0; i < body.length; i++) {
        const char = body[i]

        if (inString) {
            if (char === "'") {
                if (body[i + 1] === "'") {
                    i++
                    continue
                }
                inString = false
            }
            continue
        }

        if (char === "'") {
            inString = true
            continue
        }

        if (char === '(') {
            if (depth === 0) {
                start = i + 1
            }
            depth++
            continue
        }

        if (char === ')') {
            depth--
            if (depth === 0 && start >= 0) {
                tuples.push(body.slice(start, i))
                start = -1
            }
        }
    }

    return tuples
}

/** Splits a tuple body on top-level commas, ignoring commas inside strings or nested calls. */
function splitTopLevel(tuple: string): string[] {
    const parts: string[] = []
    let depth = 0
    let inString = false
    let current = ''

    for (let i = 0; i < tuple.length; i++) {
        const char = tuple[i]

        if (inString) {
            current += char
            if (char === "'") {
                if (tuple[i + 1] === "'") {
                    current += "'"
                    i++
                    continue
                }
                inString = false
            }
            continue
        }

        if (char === "'") {
            inString = true
            current += char
            continue
        }

        if (char === '(') depth++
        if (char === ')') depth--

        if (char === ',' && depth === 0) {
            parts.push(current)
            current = ''
            continue
        }

        current += char
    }

    parts.push(current)
    return parts.map((part) => part.trim())
}

function parseValue(raw: string): SqlValue {
    const token = raw.replace(/::[a-z_]+(\[\])?$/i, '').trim()

    if (/^null$/i.test(token)) return null
    if (/^true$/i.test(token)) return true
    if (/^false$/i.test(token)) return false
    if (/^gen_random_uuid\(\)$/i.test(token)) return null
    if (/^-?\d+(\.\d+)?$/.test(token)) return Number(token)

    if (token.startsWith("'") && token.endsWith("'")) {
        return token.slice(1, -1).replace(/''/g, "'")
    }

    return token
}

function parseRows(body: string): SqlValue[][] {
    return extractTuples(body).map((tuple) => splitTopLevel(tuple).map(parseValue))
}

/** Slices the SQL between a start marker and an end marker. */
function section(startMarker: string, endMarker: string, fromIndex = 0): string {
    const start = sql.indexOf(startMarker, fromIndex)
    if (start < 0) throw new Error(`Marker not found: ${startMarker}`)
    const end = sql.indexOf(endMarker, start)
    if (end < 0) throw new Error(`End marker not found: ${endMarker}`)
    return sql.slice(start + startMarker.length, end)
}

// Every id below must be a real UUID: the app's mutations sync to a real Postgres
// backend (even from local E2E seed data) whose columns are UUID-typed, and a
// non-UUID id fails there with "invalid input syntax for type uuid" the first time
// something tries to write it back (e.g. checking off a wishlist item).
const TRIP_ID = 'a1e4c9d2-8f3b-4b7e-9c1a-2d6f8e4b7a01'
const USER_ID = 'e2e-user'
const TIMESTAMP = '2026-08-01T09:00:00.000Z'

function str(value: SqlValue): string | null {
    return typeof value === 'string' ? value : null
}

// --- Days -----------------------------------------------------------------
const daysBody = section('accommodation_description\n  )\n  VALUES', 'RETURNING id, date')
const dayRows = parseRows(daysBody)

const dayIdByDate = new Map<string, string>()

const days = dayRows.map((row) => {
    const date = String(row[2])
    const id = randomUUID()
    dayIdByDate.set(date, id)
    return {
        id,
        trip_id: TRIP_ID,
        date,
        city: str(row[3]),
        accommodation_name: str(row[4]),
        accommodation_address: str(row[5]),
        accommodation_lat: null,
        accommodation_lng: null,
        accommodation_description: str(row[6]),
    }
})

// --- Entries --------------------------------------------------------------
const entriesBody = section('JOIN (VALUES', ') AS e(date')
const entryRows = parseRows(entriesBody)

interface SeedEntry {
    id: string
    trip_day_id: string
    type: string
    text: string
    address: string | null
    start_time: string | null
    end_time: string | null
    sort_order: number
    created_at: string
    title: string | null
    pickup_at_hotel?: boolean | null
    pickup_location?: string | null
    pickup_notes?: string | null
    dropoff_at_hotel?: boolean | null
    dropoff_location?: string | null
    dropoff_notes?: string | null
}

/** Postgres `time` renders as HH:MM in the app; trim any seconds the seed carries. */
function toTime(value: SqlValue): string | null {
    const raw = str(value)
    return raw ? raw.slice(0, 5) : null
}

const entries: SeedEntry[] = entryRows.map((row) => {
    const date = String(row[0])
    const dayId = dayIdByDate.get(date)
    if (!dayId) throw new Error(`Unknown day date in entries: ${date}`)
    return {
        id: randomUUID(),
        trip_day_id: dayId,
        type: String(row[1]),
        text: String(row[2]),
        address: str(row[3]),
        start_time: toTime(row[4]),
        end_time: toTime(row[5]),
        sort_order: Number(row[6]),
        created_at: TIMESTAMP,
        title: null,
    }
})

// --- Transfer details (the UPDATE that clears address and adds pickup/dropoff) ---
const transferStart = sql.indexOf('UPDATE trip_entries entry')
const transferBody = section('JOIN (VALUES', ') AS example(', transferStart)
const transferRows = parseRows(transferBody)

for (const row of transferRows) {
    const date = String(row[0])
    const text = String(row[1])
    const dayId = dayIdByDate.get(date)
    const entry = entries.find((candidate) => candidate.trip_day_id === dayId && candidate.text === text)
    if (!entry) throw new Error(`Transfer target not found: ${date} / ${text}`)

    entry.address = null
    entry.pickup_at_hotel = row[2] as boolean | null
    entry.pickup_location = str(row[3])
    entry.pickup_notes = str(row[4])
    entry.dropoff_at_hotel = row[5] as boolean | null
    entry.dropoff_location = str(row[6])
    entry.dropoff_notes = str(row[7])
}

// --- Wishlist -------------------------------------------------------------
const wishlistBody = section('INSERT INTO trip_wishlist_items (id, trip_id, name, type, notes, address, url, sort_order)\nVALUES', ';\n\n--')
const wishlistRows = parseRows(wishlistBody)

const wishlistItems = wishlistRows.map((row) => ({
    id: randomUUID(),
    trip_id: TRIP_ID,
    name: String(row[2]),
    type: String(row[3]),
    notes: str(row[4]),
    address: str(row[5]),
    url: str(row[6]),
    checked_off: false,
    sort_order: Number(row[7]),
    created_at: TIMESTAMP,
}))

// --- Notes ----------------------------------------------------------------
const notesBody = section('INSERT INTO trip_notes (id, trip_id, content, is_private, sort_order)\nVALUES', ';\n')
const noteRows = parseRows(notesBody)

const notes = noteRows.map((row) => ({
    id: randomUUID(),
    trip_id: TRIP_ID,
    content: String(row[2]),
    is_private: Boolean(row[3]),
    sort_order: Number(row[4]),
    created_at: TIMESTAMP,
    updated_at: TIMESTAMP,
}))

const seed = {
    trips: [
        {
            id: TRIP_ID,
            user_id: USER_ID,
            name: 'Netherlands 2027',
            start_date: '2027-02-18',
            end_date: '2027-03-11',
            week_starts_sunday: false,
            map_link_provider: 'apple',
            created_at: TIMESTAMP,
            updated_at: TIMESTAMP,
        },
    ],
    tripDays: days,
    tripEntries: entries,
    tripNotes: notes,
    wishlistItems,
}

writeFileSync(OUT_PATH, JSON.stringify(seed, null, 2))

console.log(
    `days=${days.length} entries=${entries.length} transfers=${transferRows.length} wishlist=${wishlistItems.length} notes=${notes.length}`,
)
console.log('sample entry:', JSON.stringify(entries[0]))
console.log('sample transfer:', JSON.stringify(entries.find((e) => e.pickup_notes)))
console.log('sample note:', JSON.stringify(notes[0]))
