// eslint-disable-next-line @typescript-eslint/no-var-requires
const packagejson = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    basePath: packagejson.basePath,
    trailingSlash: true,
}

module.exports = nextConfig
