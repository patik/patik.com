function forceDownload(blobUrl: string, filename: string) {
    const a = document.createElement('a')
    a.download = filename
    a.href = blobUrl
    document.body.appendChild(a)
    a.click()
    a.remove()
}

export default function downloadPhoto(url: string, filename: string) {
    if (!filename && url) {
        const segments = url.split('\\')
        const segment = segments.pop()

        if (segment) {
            filename = segment.split('/').pop() ?? ''
        }
    }

    fetch(url, {
        headers: new Headers({
            Origin: location.origin,
        }),
        mode: 'cors',
    })
        .then((response) => response.blob())
        .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob)
            forceDownload(blobUrl, filename)
        })
        .catch((e) => console.error(e))
}
