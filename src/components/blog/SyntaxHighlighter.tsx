import { CodeFenceConfig, getCodeFenceConfig } from '@src/lib/getCodeFenceConfig'
import postBodyStyles from '@src/styles/blog/post-body.module.scss'
import { omit } from 'lodash'
import { ComponentType, JSX, useEffect, useMemo, useState } from 'react'
import { PrismLight } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

PrismLight.registerLanguage('javascript', javascript)

const syntaxTheme = oneDark

/**
 * Explanation of syntaxHighlightSSRHack: with Next.js 13 and react-syntax highlighter 15.5.0 (February 2023),
 * we get the React 18 error "Hydration failed because the initial UI does not match what was rendered on the server."
 * This seems to happen only when including the `language` property from my `getCodeFenceConfig()` function's return
 * value. Plus, it only happens with some files that have code blocks.
 *
 * Therefore, to mitigate the error, the `language` is only included in the syntax highlight config after the
 * component is mounted. The affected markdown files include `syntaxHighlightSSRHack: true` in their frontmatter so
 * that other files don't need this hack and don't need to suffer from extra re-renders.
 *
 * The effect is that the syntax is not highlighted for the very first render, but this is very hard to notice.
 *
 */
export function SyntaxHighlighter({
    className,
    code,
    syntaxHighlightSSRHack,
    PreTag = 'div',
}: {
    className?: string
    code: string
    syntaxHighlightSSRHack?: boolean
    PreTag?: keyof JSX.IntrinsicElements | ComponentType<unknown> | undefined
}) {
    // Parse my custom string to determine the language, line highlighting, and starting line for this code block
    const fullConfig = useMemo(() => getCodeFenceConfig(className), [className])
    const [config, setConfig] = useState<CodeFenceConfig>(
        syntaxHighlightSSRHack ? omit(fullConfig, 'language') : fullConfig
    )

    useEffect(() => {
        if (syntaxHighlightSSRHack) {
            setConfig(fullConfig)
        }
    }, [fullConfig, syntaxHighlightSSRHack])

    return (
        <PrismLight
            style={syntaxTheme}
            PreTag={PreTag}
            className={`${className} ${postBodyStyles['codeFence']}`}
            showLineNumbers
            wrapLines
            useInlineStyles
            {...config}
        >
            {code}
        </PrismLight>
    )
}
