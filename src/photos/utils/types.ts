export interface ImageProps {
    id: number
    height: string
    width: string
    public_id: string
    format: string
    blurDataUrl?: string
    secure_url: string
    resource_type: CloundinaryResource['resource_type']
}

export interface SharedModalProps {
    index: number
    images?: ImageProps[]
    currentPhoto?: ImageProps
    changePhotoId: (newVal: number) => void
    closeModal: () => void
    navigation: boolean
    direction?: number
    gallery: CountryGallery | CityGallery
}

export type CloundinaryResource = {
    asset_id: string
    public_id: string
    folder: string
    filename: string
    format: string // e.g. 'jpg', 'mov'
    version: number
    resource_type: 'image' | 'video'
    type: string
    created_at: string
    uploaded_at: string
    bytes: 550564
    backup_bytes: 0
    width: 1536
    height: 2049
    aspect_ratio: 0.74963
    pixels: 3147264
    url: string
    secure_url: string
    status: string
    access_mode: string
    access_control: null
    etag: string
    created_by: { access_key: string }
    uploaded_by: { access_key: string }
    last_updated: {
        updated_at: string
        public_id_updated_at: string
    }
}

export type CloudinaryResult = {
    total_count: number
    time: number
    resources: Array<CloundinaryResource>
}

export type CountryGallery = {
    country: string
    cloudinaryFolder: string
    title: string
}

export type CityGallery = CountryGallery & {
    city: string
}

export type CityGalleryMap = Record<string, CityGallery>