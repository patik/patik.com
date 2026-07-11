type CloudinaryEnvKey = 'PUBLIC_CLOUDINARY_CLOUD_NAME' | 'CLOUDINARY_API_KEY' | 'CLOUDINARY_API_SECRET'

/**
 * Reads a Cloudinary setting from the environment. Astro exposes variables on
 * `import.meta.env` during builds, while plain Node contexts (Netlify, CI) only
 * provide `process.env`, so both are checked.
 */
export default function getCloudinaryEnv(key: CloudinaryEnvKey): string | undefined {
    return import.meta.env?.[key] ?? process.env[key]
}
