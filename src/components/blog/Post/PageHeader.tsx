import Link from 'next/link'

export default function PageHeader() {
    return (
        <p className="text-xl tracking-tight leading-tight mb-20 mt-8">
            <Link href={`.`} className="hover:underline">
                &lt; Blog index
            </Link>
        </p>
    )
}
