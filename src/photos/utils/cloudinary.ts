import cloudinary from 'cloudinary'

// Use import.meta.env for Astro, fallback to process.env for build
const getEnv = (key: string) => {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env[key]
    }
    return process.env[key]
}

cloudinary.v2.config({
    cloud_name: getEnv('PUBLIC_CLOUDINARY_CLOUD_NAME'),
    api_key: getEnv('CLOUDINARY_API_KEY'),
    api_secret: getEnv('CLOUDINARY_API_SECRET'),
    secure: true,
})

export default cloudinary
