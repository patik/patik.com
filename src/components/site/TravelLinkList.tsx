import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type Item = {
    imageSrc: StaticImageData
    imageAlt: string
    url: string
    className: string
    title: ReactNode
}

function TravelLinkItem({ item }: { item: Item }) {
    const { imageSrc, imageAlt, url, className, title } = item
    const LinkComponent = url.startsWith('/') ? Link : 'a'

    return (
        <LinkComponent className={className} href={url}>
            <Image alt={imageAlt} src={imageSrc} />
            <span>{title}</span>
            <div className="image-cover"></div>
        </LinkComponent>
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
