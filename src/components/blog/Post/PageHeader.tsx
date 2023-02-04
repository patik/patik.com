import Link from 'next/link'

export default function PageHeader() {
    return (
        <p className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href={`.`} className="hover:underline">
                Back to blog index
            </Link>
        </p>
    )
}
