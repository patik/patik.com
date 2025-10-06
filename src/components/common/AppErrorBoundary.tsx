import { ComponentType, FC, ReactElement, ReactNode } from 'react'
import {
    ErrorBoundary,
    ErrorBoundaryProps,
    FallbackProps,
    useErrorBoundary,
    withErrorBoundary,
} from 'react-error-boundary'

type ComponentWithFallbackProps = FC<FallbackProps>

const defaultOnError = (e: string | globalThis.Error | null | undefined) => {
    console.error(e)
}

let hasAlreadyResetBoundary = false

function ErrorFallback(/* props: FallbackProps */): ReactNode {
    const { resetBoundary } = useErrorBoundary()

    const onClick = () => {
        if (hasAlreadyResetBoundary) {
            window.location.reload()
        } else {
            hasAlreadyResetBoundary = true
            resetBoundary()
        }
    }

    return (
        <div className="p-2">
            <p>Could not load</p>

            <button onClick={onClick} onKeyDown={onClick} style={{ cursor: 'pointer' }}>
                Try again
            </button>
        </div>
    )
}

type Props = { children: ReactNode; FallbackComponent?: ComponentWithFallbackProps; hasPaper?: boolean }

function InnerLayer({
    FallbackComponent = () => <ErrorFallback />,
    ...otherProps
}: Props & { onError: ErrorBoundaryProps['onError'] }): ReactElement {
    return <ErrorBoundary FallbackComponent={FallbackComponent} {...otherProps} />
}

/**
 * Catches thrown exceptions to prevent parent components from breaking
 *
 * Heads up! This error boundaries will not catch errors for (**):
 *   - Event handlers (see https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers). Call useErrorBoundary in these cases.
 *   - Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks). Call useErrorBoundary in these cases.
 *   - Server side rendering
 *   - Errors thrown in the error boundary itself (rather than its children)
 *
 */
export function AppErrorBoundary(props: Props): ReactElement {
    return <InnerLayer onError={defaultOnError} {...props} />
}

// The library itself uses `any` and we need to match it. Doesn't make the type any less safe.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAppErrorBoundary<Props extends ComponentType<any>>(
    Component: Props
): ReturnType<typeof withErrorBoundary<Props>> {
    return withErrorBoundary(Component, {
        fallback: <ErrorFallback />,
        onError: defaultOnError,
    })
}
