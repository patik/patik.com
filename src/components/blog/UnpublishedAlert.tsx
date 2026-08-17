import Container from './Container'
import css from './BlogIndex.module.css'

export default function UnpublishedAlert() {
    return (
        <div className={css.unpublished}>
            <Container>
                <div className={css.unpublishedContent}>
                    This post is not published. It will not be included in production builds.
                </div>
            </Container>
        </div>
    )
}
