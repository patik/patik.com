import fs from 'fs'

export function generateSiteMap({ links }: { links: { url: string; date: string }[] }) {
    const [today] = new Date().toISOString().split('T')

    // console.log(links)
    // Push articles to sitemap
    const sitemap = links.map((metaObj) => {
        return `<url><loc>${metaObj.url || ''}</loc><lastmod>${metaObj.date || today}</lastmod></url>`
    })

    // console.log(sitemap)
    // Write sitemap.xml to file
    fs.writeFile(
        `public/sitemap.xml`,
        [
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84 https://www.google.com/schemas/sitemap/0.84/sitemap.xsd">',
            ...sitemap,
            '</urlset>',
        ].join(''),
        (err) => {
            if (err) {
                throw err
            }

            console.log('sitemap.xml has been saved')
        }
    )
}
