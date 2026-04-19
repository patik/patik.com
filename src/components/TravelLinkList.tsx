import type { ReactNode } from 'react'

type Item = {
    imageSrc: { src: string }
    imageAlt: string
    url: string
    className: string
    title: ReactNode
}

function TravelLinkItem({ item }: { item: Item }) {
    const { imageSrc, imageAlt, url, className, title } = item

    return (
        <a className={className} href={url}>
            <img alt={imageAlt} src={imageSrc.src} />
            <span>{title}</span>
            <div className="image-cover"></div>
        </a>
    )
}

export default function TravelLinkList({ items }: { items: Item[] }) {
    return (
        <div className="cp-row travel-link-list">
            {items.map((item) => (
                <div className="cp-item-third" key={item.imageSrc.src}>
                    <TravelLinkItem item={item} />
                </div>
            ))}
        </div>
    )
}
