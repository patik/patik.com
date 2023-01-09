import Link from 'next/link'

const PageHeader = () => {
    return (
        <h2 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href="/" className="hover:underline">
                Craig Patik’s Blog
            </Link>
        </h2>
    )
}

export default PageHeader
