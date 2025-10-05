# Astro Configuration for patik.com

This document provides a ready-to-use Astro configuration specifically tailored for migrating patik.com from Next.js.

## Installation

```bash
# Create a new Astro project in a separate directory for testing
npm create astro@latest patik-astro

# Or install in existing project
npm install astro @astrojs/react @astrojs/tailwind @astrojs/netlify

# Additional dependencies
npm install -D @astrojs/mdx sass
npm install cloudinary sharp date-fns gray-matter lodash
```

## Project Structure

```
patik-astro/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Layout.astro
│   │   ├── blog/
│   │   │   └── (React components from current site)
│   │   └── photos/
│   │       └── (React components from current site)
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/
│   │       └── (markdown files from _posts/)
│   ├── galleries/
│   │   └── uzbekistan/
│   │       ├── index.ts
│   │       └── samarkand.ts
│   ├── lib/
│   │   └── (utility functions)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── travel/
│   │       └── uzbekistan/
│   │           └── photos/
│   │               └── [...photos].astro
│   ├── photos/
│   │   ├── components/
│   │   ├── pageHelpers/
│   │   └── utils/
│   └── styles/
│       ├── globals.css
│       └── photos.css
├── public/
│   └── (static assets)
├── astro.config.mjs
├── tsconfig.json
├── tailwind.config.mjs
└── package.json
```

## Configuration Files

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import netlify from '@astrojs/netlify'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://patik.com',
  
  integrations: [
    react(),
    tailwind({
      // Apply Tailwind's base styles
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  
  output: 'static',
  adapter: netlify(),
  
  trailingSlash: 'always',
  
  vite: {
    resolve: {
      alias: {
        '@src': '/src',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Additional SASS options if needed
        },
      },
    },
  },
  
  // Redirects (alternatively use Netlify _redirects file)
  redirects: {
    '/travel/paris': '/travel/france/',
    '/travel/britain-benelux': '/travel/',
    '/travel/peru-argentina': '/travel/',
  },
  
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },
  
  experimental: {
    // Enable future features if needed
  },
})
```

### package.json (relevant scripts)

```json
{
  "name": "patik.com",
  "version": "2.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro",
    "copyimages": "node ./bin/copy-images.mjs",
    "prebuild": "yarn copyimages",
    "lint": "astro check && tsc --noEmit"
  },
  "dependencies": {
    "@astrojs/mdx": "^2.0.0",
    "@astrojs/netlify": "^5.0.0",
    "@astrojs/react": "^3.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "astro": "^4.0.0",
    "cloudinary": "^1.41.3",
    "date-fns": "^3.2.0",
    "gray-matter": "^4.0.3",
    "lodash": "^4.17.21",
    "motion": "^12.10.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "sharp": "^0.33.1"
  },
  "devDependencies": {
    "@types/lodash": "^4.14.202",
    "@types/node": "^22.15.3",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.3",
    "sass": "^1.70.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.8.3"
  }
}
```

### tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@src/*": ["./src/*"]
    },
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### tailwind.config.mjs

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      // Match existing design tokens from Next.js site
    },
  },
  plugins: [],
}
```

## Content Collections Setup

### src/content/config.ts

```typescript
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    ogImage: z.string().optional(),
    unpublished: z.boolean().optional(),
    syntaxHighlightSSRHack: z.boolean().optional(),
    imagesMetadata: z.string().optional(),
  }),
})

export const collections = { blog }
```

## Environment Variables

### .env (development)

```bash
# Public variables (accessible in client-side code)
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# Private variables (only accessible server-side)
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Node environment
NODE_ENV=development
```

### Accessing Environment Variables

```typescript
// In .astro files or server-side code
const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
const apiKey = import.meta.env.CLOUDINARY_API_KEY

// In client-side React components
// Only PUBLIC_ variables are available
const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
```

## Netlify Configuration

### netlify.toml

```toml
[build]
  command = "yarn build"
  publish = "dist"

[[redirects]]
  from = "/blog/*"
  to = "https://patik-blog.netlify.app/:splat"
  status = 200
  force = false

[[redirects]]
  from = "/dof/*"
  to = "https://depth-of-field.netlify.app/:splat"
  status = 200
  force = false

[[redirects]]
  from = "/travel/paris/"
  to = "/travel/france/"
  status = 301
  force = false

[[redirects]]
  from = "/travel/peru-argentina/"
  to = "/travel/"
  status = 301
  force = false

[[redirects]]
  from = "/travel/britain-benelux/"
  to = "/travel/"
  status = 301
  force = false

[build.environment]
  NODE_VERSION = "22"

# Cache settings for faster builds
[[plugins]]
  package = "@netlify/plugin-nextjs"
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

## Key Components

### src/components/common/Layout.astro

```astro
---
interface Props {
  title?: string
  keywords?: string[]
  description?: string
}

const { 
  title = 'Craig Patik',
  keywords = [],
  description = "Craig Patik's personal web site" 
} = Astro.props

import '../styles/blog/index.css'
import '../styles/photos.css'
import '../styles/site/globals.css'
import '../styles/site/scss/style.scss'
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords.length > 0 && (
      <meta name="keywords" content={keywords.join(', ')} />
    )}
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### src/pages/blog/index.astro

```astro
---
import { getCollection } from 'astro:content'
import Layout from '@src/components/common/Layout.astro'
import BlogList from '@src/components/blog/BlogList'

// Get all blog posts
let posts = await getCollection('blog')

// Filter unpublished in production
if (import.meta.env.PROD) {
  posts = posts.filter(post => !post.data.unpublished)
}

// Sort by date descending
const sortedPosts = posts.sort((a, b) => 
  b.data.date.valueOf() - a.data.date.valueOf()
)

// Convert to format expected by React component
const postsForComponent = sortedPosts.map(post => ({
  slug: post.slug,
  title: post.data.title,
  date: post.data.date.toISOString(),
  categories: post.data.categories || [],
  coverImage: post.data.coverImage || '',
}))
---

<Layout title="Blog - Craig Patik">
  <h1>Blog</h1>
  <BlogList client:load posts={postsForComponent} />
</Layout>
```

### src/pages/blog/[slug].astro

```astro
---
import { getCollection } from 'astro:content'
import Layout from '@src/components/common/Layout.astro'
import Post from '@src/components/blog/Post/Post'

export async function getStaticPaths() {
  let posts = await getCollection('blog')
  
  // Filter unpublished in production
  if (import.meta.env.PROD) {
    posts = posts.filter(post => !post.data.unpublished)
  }
  
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }))
}

const { post } = Astro.props
const { Content } = await post.render()

// Convert to format expected by React component
const postData = {
  slug: post.slug,
  title: post.data.title,
  date: post.data.date.toISOString(),
  content: '', // Will be rendered by Content component
  categories: post.data.categories || [],
  coverImage: post.data.coverImage || '',
  ogImage: post.data.ogImage || '',
  unpublished: post.data.unpublished || false,
}
---

<Layout title={post.data.title}>
  <Post client:load post={postData}>
    <Content slot="content" />
  </Post>
</Layout>
```

### src/pages/travel/uzbekistan/photos/[...photos].astro

```astro
---
import Layout from '@src/components/common/Layout.astro'
import { GalleryPage } from '@src/photos/components/GalleryPage'
import { SinglePhotoPage } from '@src/photos/components/SinglePhotoPage'
import countryGallery from '@src/galleries/uzbekistan'
import samarkand from '@src/galleries/uzbekistan/samarkand'
import getGalleryStaticPaths from '@src/photos/pageHelpers/getGalleryStaticPaths'
import getGalleryStaticProps from '@src/photos/pageHelpers/getGalleryStaticProps'

export async function getStaticPaths() {
  const result = await getGalleryStaticPaths([samarkand])
  
  const paths = await Promise.all(
    result.paths.map(async (path) => {
      const propsResult = await getGalleryStaticProps([samarkand], {
        params: path.params
      })
      
      return {
        params: path.params,
        props: propsResult.props
      }
    })
  )
  
  return paths
}

const { photos } = Astro.params
const { images = [], currentPhoto = null } = Astro.props

// Determine page type
const segments = Array.isArray(photos) ? photos : photos ? [photos] : []
const isPhotoDetailPage = segments.length === 2
const isCityIndexPage = segments.length === 1
const isCountryIndexPage = segments.length === 0
---

<Layout title={countryGallery.title} keywords={countryGallery.keywords}>
  <h1>{countryGallery.title}</h1>
  
  {isPhotoDetailPage ? (
    <SinglePhotoPage
      client:load
      cityGallery={samarkand}
      currentPhoto={currentPhoto}
      images={images}
    />
  ) : (
    <GalleryPage
      client:load
      gallery={isCityIndexPage ? samarkand : countryGallery}
      cityGalleries={[samarkand]}
      images={images}
    />
  )}
</Layout>
```

## Cloudinary Integration Updates

### src/photos/utils/cloudinary.ts

```typescript
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary
```

## Build & Development Scripts

### bin/copy-images.mjs

Keep as-is, just ensure it works with the new structure:

```javascript
// This script can remain unchanged
// Just ensure paths are correct for the new structure
```

## Migration Steps

### 1. Setup Phase

```bash
# Create new Astro project
npm create astro@latest patik-astro -- --template minimal --typescript strict

cd patik-astro

# Install dependencies
npm install @astrojs/react @astrojs/tailwind @astrojs/netlify @astrojs/mdx
npm install cloudinary sharp date-fns gray-matter lodash motion
npm install react react-dom
npm install -D sass @types/react @types/react-dom @types/lodash

# Copy configuration files
cp ../patik.com/tailwind.config.js ./tailwind.config.mjs
cp ../patik.com/.env ./.env

# Update environment variables
# Change NEXT_PUBLIC_ to PUBLIC_ prefix
```

### 2. Content Migration

```bash
# Create content directory
mkdir -p src/content/blog

# Copy blog posts
cp -r ../patik.com/_posts/* src/content/blog/

# Each post directory should have an index.md file
# Astro Content Collections expects this structure
```

### 3. Component Migration

```bash
# Copy existing components
cp -r ../patik.com/src/components src/
cp -r ../patik.com/src/galleries src/
cp -r ../patik.com/src/photos src/
cp -r ../patik.com/src/lib src/

# Copy styles
cp -r ../patik.com/src/styles src/
```

### 4. Update Imports

Search and replace across all files:
- `next/link` → Update to use Astro's `<a>` tags or create a Link component
- `next/image` → Can keep for React components or use `astro:assets`
- `next/router` → Use `Astro.url` or client-side router
- `process.env.NEXT_PUBLIC_` → `import.meta.env.PUBLIC_`
- `process.env.` → `import.meta.env.`

### 5. Create Astro Pages

Convert key pages from TSX to .astro:
- `/pages/index.tsx` → `/src/pages/index.astro`
- `/pages/about.tsx` → `/src/pages/about.astro`
- `/pages/blog/index.tsx` → `/src/pages/blog/index.astro`

### 6. Test Build

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

### 7. Deploy to Netlify

```bash
# Connect to Netlify
netlify init

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Testing Checklist

- [ ] Homepage loads correctly
- [ ] All static pages accessible
- [ ] Blog listing page works
- [ ] Individual blog posts render
- [ ] Syntax highlighting works in blog posts
- [ ] Photo galleries load
- [ ] Individual photos accessible
- [ ] Navigation works
- [ ] Images load from Cloudinary
- [ ] Blur placeholders work
- [ ] Responsive design intact
- [ ] Environment variables working
- [ ] Redirects functioning
- [ ] Build completes successfully
- [ ] No console errors
- [ ] Lighthouse score improved

## Performance Expectations

After migration to Astro, expect:

- **JavaScript Bundle:** ~85KB → ~15KB (82% reduction)
- **First Load:** ~1.2s → ~0.4s (67% faster)
- **Lighthouse Score:** 85-90 → 95-100
- **Build Time:** Similar or slightly faster

## Rollback Plan

If issues arise:

1. Keep Next.js site running during migration
2. Test Astro site on preview URL
3. DNS can be switched back quickly
4. Keep Next.js code in separate branch

## Support Resources

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [Astro GitHub](https://github.com/withastro/astro)
- [Migration Guide](https://docs.astro.build/en/guides/migrate-to-astro/)
- [Next.js to Astro Guide](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/)

## Conclusion

This configuration provides a complete setup for migrating patik.com to Astro. The migration preserves all existing functionality while providing:

- Better performance
- Smaller bundle sizes
- Easier content management
- Improved developer experience
- First-class Netlify support

Start with a proof-of-concept migration of a single page or section, then gradually migrate the full site.
