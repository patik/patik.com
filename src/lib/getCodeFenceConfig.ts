import rangeParser from 'parse-numeric-range'
import { HTMLProps } from 'react'

const lineHighlightPattern = /^[\d,-]+$/

function getLineHighlights(meta?: string): ((lineNum: number) => HTMLProps<HTMLElement>) | undefined {
    if (!meta || !lineHighlightPattern.test(meta)) {
        return
    }

    const highlight = rangeParser(meta)

    return function lineProps(lineToCheck: number) {
        const data = highlight.includes(lineToCheck) ? 'highlight' : undefined

        return { data }
    }
}

// Match my custom config that comes after the language name on the line that begins the code fence, e.g. ```lang meta-is-here
// https://regex101.com/r/5HhUUL/1
// https://regex101.com/r/nxCycw/1

const languagePattern = /\blanguage-(\w+)\b/
const highlightPattern = /\bhighlight-([\d,-]+)\b/
const startPattern = /\bstart-(\d+)\b/

export type CodeFenceConfig = {
    language?: string // Should match a language name known to the markdown interpreter
    startingLineNumber?: number
    lineProps?: (lineNum: number) => HTMLProps<HTMLElement>
}

export function getCodeFenceConfig(className?: string): CodeFenceConfig {
    if (!className || !languagePattern.test(className)) {
        return {}
    }

    let language = 'js',
        highlight,
        startingLine

    className.split('::').forEach((piece) => {
        if (languagePattern.test(piece)) {
            language = (languagePattern.exec(piece) ?? [])[1]
        } else if (highlightPattern.test(piece)) {
            highlight = (highlightPattern.exec(piece) ?? [])[1]
        } else if (startPattern.test(piece)) {
            startingLine = (startPattern.exec(piece) ?? [])[1]
        }
    })

    return {
        language,
        startingLineNumber: startingLine ? Number(startingLine) : undefined,
        lineProps: getLineHighlights(highlight),
    }
}
