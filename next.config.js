/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    async redirects() {
        const pages = [
            // [old path (without trailing slash), new path]
            ['/travel/paris', '/travel/france/'],
            ['/travel/britain-benelux', '/travel/'],
            ['/travel/peru-argentina', '/travel/'],
        ]

        // Create return objects, both with and without a trailing slash
        return pages
            .map((page) => [
                {
                    source: page[0],
                    destination: page[1],
                    permanent: true,
                },
                {
                    source: `${page[0]}/`,
                    destination: page[1],
                    permanent: true,
                },
            ])
            .flat()
    },
}

module.exports = nextConfig
