import { ReactNode } from 'react'

/**
 * Intro section when the contents has its own paragraph tags
 *
 * Ideal for when multiple paragraphs are needed
 */
export default function IntroFormatted({ children }: { children: ReactNode }) {
    return <section className="intro">{children}</section>
}
