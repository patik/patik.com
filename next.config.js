/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    basePath: '',
    async redirects() {
        // Create return objects, both with and without a trailing slash
        return [
            // [old path (without trailing slash), new path]
            ['/travel/paris', '/travel/france/'],
            ['/travel/britain-benelux', '/travel/'],
            ['/travel/peru-argentina', '/travel/'],
        ]
            .map(([oldPath, newPath]) => [
                {
                    source: oldPath,
                    destination: newPath,
                    permanent: true,
                },
                {
                    source: `${oldPath}/`,
                    destination: newPath,
                    permanent: true,
                },
            ])
            .flat()
    },
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    ...config.resolve.fallback,
                    fs: false,
                },
            }
        }

        return config
    },
}

module.exports = nextConfig
