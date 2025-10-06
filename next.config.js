// const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
        // For photo gallery
        formats: ['image/avif', 'image/webp'],
        // For photo gallery
        domains: ['res.cloudinary.com'],
    },
    trailingSlash: true,
    compiler: {
        removeConsole: false,
    },
    basePath: '',
    output: 'export',
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
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
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
    // // Fix sass-loader for Node versions older than 16
    // // See https://github.com/vercel/next.js/issues/45052#issuecomment-1468754780
    // sassOptions: {
    //     // fiber: false,
    //     includePaths: [path.join(__dirname, 'styles')],
    // },
}

module.exports = nextConfig
