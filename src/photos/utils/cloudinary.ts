import cloudinary from 'cloudinary'
import getCloudinaryEnv from '@src/photos/utils/getCloudinaryEnv'

cloudinary.v2.config({
    cloud_name: getCloudinaryEnv('PUBLIC_CLOUDINARY_CLOUD_NAME'),
    api_key: getCloudinaryEnv('CLOUDINARY_API_KEY'),
    api_secret: getCloudinaryEnv('CLOUDINARY_API_SECRET'),
    secure: true,
})

export default cloudinary
