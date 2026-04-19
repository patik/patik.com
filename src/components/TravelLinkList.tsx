import type { CSSProperties, ReactNode } from 'react'

type Item = {
    imageSrc: { src: string }
    imageAlt: string
    url: string
    className: string
    title: ReactNode
    titleStyle?: CSSProperties
}

function TravelLinkItem({ item }: { item: Item }) {
    const { imageSrc, imageAlt, url, className, title, titleStyle } = item

    return (
        <a className={className} href={url}>
            <img alt={imageAlt} src={imageSrc.src} />
            <span style={titleStyle}>{title}</span>
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
