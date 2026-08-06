import type { ReactNode } from 'react'
import css from './LinkGrid.module.css'

type Item = {
    imageSrc: { src: string }
    imageAlt: string
    url: string
    className: string
    title: ReactNode
}

function TravelLinkItem({ item }: { item: Item }): ReactNode {
    const { imageSrc, imageAlt, url, className, title } = item

    return (
        <a className={className} href={url}>
            <img alt={imageAlt} src={imageSrc.src} />
            <span>{title}</span>
            <div className="image-cover"></div>
        </a>
    )
}

export default function TravelLinkList({ items }: { items: Item[] }): ReactNode {
    return (
        <div className={`${css.grid} ${css.largeDesktopGap} ${css.threeColumns} travel-link-list`}>
            {items.map((item) => (
                <TravelLinkItem item={item} key={item.imageSrc.src} />
            ))}
        </div>
    )
}
