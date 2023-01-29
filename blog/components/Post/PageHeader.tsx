import Link from 'next/link'
import packagejson from '../../../package.json'

const { homepage } = packagejson

const PageHeader = () => {
    return (
        <h2 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href={`${homepage}/`} className="hover:underline">
                Craig Patik’s Blog
            </Link>
        </h2>
    )
}

export default PageHeader
