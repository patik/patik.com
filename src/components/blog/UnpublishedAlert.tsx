import cn from 'classnames'
import Container from './Container'

export default function UnpublishedAlert() {
    return (
        <div
            className={cn('border-b', {
                'bg-neutral-800 border-neutral-800 text-white': true,
            })}
        >
            <Container>
                <div className="py-2 text-center text-sm">
                    This post is not published. It will not be included in production builds.
                </div>
            </Container>
        </div>
    )
}
