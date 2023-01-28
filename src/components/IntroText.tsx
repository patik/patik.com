import { ReactNode } from 'react'

/**
 * Intro section when the contents should be treated as a single paragraph's text
 *
 * May contain inline elements such as <a> or encoded HTML entities; but all contents will be wrapped in the same <p>
 */
export default function IntroText({ children }: { children: ReactNode }) {
    return (
        <section className="intro">
            <p>{children}</p>
        </section>
    )
}
