import packagejson from '../../../package.json'

const siteRoot = packagejson.author.url

export default function Meta({
    description,
    image,
    siteName,
    title,
    url,
}: {
    description: string
    image: string
    siteName: string
    title: string
    url: string
}) {
    return (
        <>
            <meta charSet="UTF-8" />
            <link rel="apple-touch-icon" sizes="180x180" href={`${siteRoot}/favicon/apple-touch-icon.png`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`${siteRoot}/favicon/favicon-32x32.png`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`${siteRoot}/favicon/favicon-16x16.png`} />
            <link rel="manifest" href={`${siteRoot}/favicon/site.webmanifest`} />
            <link rel="mask-icon" href={`${siteRoot}/favicon/safari-pinned-tab.svg`} color="#000000" />
            <link rel="shortcut icon" href={`${siteRoot}"/favicon/favicon.ico`} />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-config" content={`${siteRoot}/favicon/browserconfig.xml`} />
            <meta name="theme-color" content="#000" />
            <link rel="alternate" type="application/rss+xml" href={`${siteRoot}/feed.xml`} />

            <meta name="description" content={description} />
            <meta name="language" content="english" />
            <meta name="title" content={title} />

            {/* OpenGraph */}
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={url} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:title" content={title} />
        </>
    )
}