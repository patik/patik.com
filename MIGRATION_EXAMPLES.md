# Migration Code Examples

This document provides concrete code examples for migrating from Next.js to Astro or Vite.

## Table of Contents
- [Astro Migration Examples](#astro-migration-examples)
- [Vite Migration Examples](#vite-migration-examples)
- [Common Patterns](#common-patterns)

---

## Astro Migration Examples

### 1. Basic Page Migration

#### Before (Next.js)
```tsx
// pages/about.tsx
import Layout from '@src/components/common/Layout'

export default function About() {
  return (
    <Layout title="About">
      <h1>About Me</h1>
      <p>Content here...</p>
    </Layout>
  )
}
```

#### After (Astro - Option 1: Pure Astro)
```astro
---
// src/pages/about.astro
import Layout from '@src/components/common/Layout.astro'
---

<Layout title="About">
  <h1>About Me</h1>
  <p>Content here...</p>
</Layout>
```

#### After (Astro - Option 2: Keep React Component)
```astro
---
// src/pages/about.astro
import Layout from '@src/components/common/Layout.astro'
import AboutContent from '@src/components/AboutContent'
---

<Layout title="About">
  <AboutContent client:load />
</Layout>
```

### 2. Blog Post Listing

#### Before (Next.js)
```tsx
// pages/blog/index.tsx
import { getAllPosts } from '@src/lib/getPosts'

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.slug}>
          <h2>{post.title}</h2>
          <time>{post.date}</time>
        </article>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts(['title', 'date', 'slug'])
  return { props: { posts } }
}
```

#### After (Astro with Content Collections)
```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content'

const posts = await getCollection('blog')
const sortedPosts = posts.sort((a, b) => 
  b.data.date.valueOf() - a.data.date.valueOf()
)
---

<div>
  {sortedPosts.map(post => (
    <article>
      <h2>{post.data.title}</h2>
      <time>{post.data.date}</time>
    </article>
  ))}
</div>
```

### 3. Blog Post Detail Page

#### Before (Next.js)
```tsx
// pages/blog/[slug]/index.tsx
import { getPostBySlug, getAllPosts } from '@src/lib/getPosts'

export default function BlogPost({ post }: { post: BlogPost }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug, ['title', 'content'])
  return { props: { post } }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false
  }
}
```

#### After (Astro)
```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content'
import Layout from '@src/components/Layout.astro'

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }))
}

const { post } = Astro.props
const { Content } = await post.render()
---

<Layout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</Layout>
```

### 4. Content Collections Setup

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    categories: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    unpublished: z.boolean().optional(),
  }),
})

export const collections = { blog }
```

### 5. Photo Gallery - Main Page

#### Before (Next.js)
```tsx
// pages/travel/uzbekistan/photos/[[...photos]].tsx
import { getGalleryStaticPaths } from '@src/photos/pageHelpers/getGalleryStaticPaths'
import { getGalleryStaticProps } from '@src/photos/pageHelpers/getGalleryStaticProps'
import { getPage } from '@src/photos/pageHelpers/getPage'
import countryGallery from '@src/galleries/uzbekistan'
import samarkand from '@src/galleries/uzbekistan/samarkand'

export default getPage(countryGallery, [samarkand])

export const getStaticProps = async (context) => {
  return getGalleryStaticProps([samarkand], context)
}

export const getStaticPaths = async () => {
  return getGalleryStaticPaths([samarkand])
}
```

#### After (Astro)
```astro
---
// src/pages/travel/uzbekistan/photos/[...photos].astro
import Layout from '@src/components/Layout.astro'
import GalleryGrid from '@src/photos/components/GalleryGrid'
import { SinglePhotoPage } from '@src/photos/components/SinglePhotoPage'
import countryGallery from '@src/galleries/uzbekistan'
import samarkand from '@src/galleries/uzbekistan/samarkand'
import { getGalleryStaticPaths } from '@src/photos/pageHelpers/getGalleryStaticPaths'
import { getGalleryStaticProps } from '@src/photos/pageHelpers/getGalleryStaticProps'

export async function getStaticPaths() {
  // Reuse existing Next.js logic
  const result = await getGalleryStaticPaths([samarkand])
  
  // Transform to Astro format
  const paths = await Promise.all(
    result.paths.map(async (path) => {
      const props = await getGalleryStaticProps([samarkand], {
        params: path.params
      })
      return {
        params: path.params,
        props: props.props
      }
    })
  )
  
  return paths
}

const { photos } = Astro.params
const { images, currentPhoto } = Astro.props

// Determine which component to render
const isPhotoPage = photos && photos.length === 2
const isCityPage = photos && photos.length === 1
---

<Layout title={countryGallery.title}>
  {isPhotoPage ? (
    <SinglePhotoPage 
      client:load
      cityGallery={samarkand}
      currentPhoto={currentPhoto}
      images={images}
    />
  ) : (
    <GalleryGrid 
      client:load
      gallery={isCityPage ? samarkand : countryGallery}
      cityGalleries={[samarkand]}
      images={images}
    />
  )}
</Layout>
```

### 6. Image Optimization

#### Before (Next.js)
```tsx
import Image from 'next/image'

<Image
  src={photo.secure_url}
  width={photo.width}
  height={photo.height}
  alt=""
  placeholder="blur"
  blurDataURL={photo.blurDataUrl}
/>
```

#### After (Astro - Option 1: Keep Next.js Image in React Component)
```tsx
// React component with client:load
import Image from 'next/image'

<Image
  src={photo.secure_url}
  width={photo.width}
  height={photo.height}
  alt=""
  // Astro handles optimization
/>
```

#### After (Astro - Option 2: Use Astro Image)
```astro
---
import { Image } from 'astro:assets'
---

<Image
  src={photo.secure_url}
  width={photo.width}
  height={photo.height}
  alt=""
/>
```

### 7. Cloudinary Integration

The Cloudinary integration remains mostly the same:

```typescript
// src/photos/utils/cloudinary.ts (unchanged)
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  // In Astro, use import.meta.env instead of process.env for public vars
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary
```

Update to use Astro's environment variables:

```typescript
// src/photos/utils/cloudinary.ts (Astro version)
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary
```

### 8. Environment Variables

#### Before (.env)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

#### After (.env)
```
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

Note: In Astro, prefix public variables with `PUBLIC_` instead of `NEXT_PUBLIC_`

### 9. Redirects

#### Before (next.config.js)
```javascript
async redirects() {
  return [
    {
      source: '/travel/paris',
      destination: '/travel/france/',
      permanent: true,
    }
  ]
}
```

#### After (astro.config.mjs)
```javascript
export default defineConfig({
  redirects: {
    '/travel/paris': '/travel/france/',
    '/travel/britain-benelux': '/travel/',
  }
})
```

Or use Netlify's `_redirects` file (recommended):
```
/travel/paris  /travel/france/  301
/travel/britain-benelux  /travel/  301
```

### 10. Layout Component

#### Before (Next.js - TSX)
```tsx
// src/components/common/Layout.tsx
import Head from 'next/head'

export default function Layout({ 
  children, 
  title, 
  keywords 
}: { 
  children: React.ReactNode
  title: string
  keywords?: string[]
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      </Head>
      <main>{children}</main>
    </>
  )
}
```

#### After (Astro)
```astro
---
// src/components/common/Layout.astro
interface Props {
  title: string
  keywords?: string[]
}

const { title, keywords } = Astro.props
---

<html>
  <head>
    <title>{title}</title>
    {keywords && <meta name="keywords" content={keywords.join(', ')} />}
  </head>
  <body>
    <main>
      <slot />
    </main>
  </body>
</html>
```

---

## Vite Migration Examples

### 1. Project Setup

```bash
npm create vite@latest patik-site -- --template react-ts
cd patik-site
npm install
```

### 2. Vite Configuration for SSG

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'

export default defineConfig({
  plugins: [
    react(),
    Pages({
      extensions: ['tsx', 'md'],
      dirs: 'src/pages',
    }),
    Markdown({
      headEnabled: true,
    })
  ],
  resolve: {
    alias: {
      '@src': '/src',
    }
  },
  build: {
    outDir: 'dist',
  }
})
```

### 3. SSG Plugin Setup

```bash
npm install -D vite-ssg vite-plugin-pages
```

```typescript
// src/main.tsx
import { ViteSSG } from 'vite-ssg'
import App from './App'
import routes from '~pages'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient }) => {
    // Setup
  }
)
```

### 4. Blog Posts with Vite

```tsx
// src/pages/blog/index.tsx
import { useEffect, useState } from 'react'

export default function BlogIndex() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    // Load posts from markdown files
    const postModules = import.meta.glob('../../content/posts/*.md')
    
    Promise.all(
      Object.entries(postModules).map(async ([path, resolver]) => {
        const post = await resolver()
        return {
          path: path.replace('../../content/posts/', '').replace('.md', ''),
          ...post.attributes
        }
      })
    ).then(setPosts)
  }, [])
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.path}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  )
}
```

### 5. Photo Gallery with Vite

Since Vite doesn't have built-in SSG, you'd need to create a build script:

```typescript
// scripts/generate-gallery-routes.ts
import cloudinary from '../src/photos/utils/cloudinary'
import fs from 'fs'

async function generateRoutes() {
  const results = await cloudinary.v2.search
    .expression('folder:Uzbekistan\\ 2023/Samarkand/*')
    .max_results(400)
    .execute()
  
  const routes = results.resources.map((img, index) => ({
    path: `/travel/uzbekistan/photos/samarkand/${index}`,
    data: img
  }))
  
  // Write routes to JSON file
  fs.writeFileSync(
    './src/generated/gallery-routes.json',
    JSON.stringify(routes, null, 2)
  )
}

generateRoutes()
```

Then use this data in your components:

```tsx
// src/pages/travel/uzbekistan/photos/[...photos].tsx
import { useParams } from 'react-router-dom'
import galleryRoutes from '@src/generated/gallery-routes.json'

export default function GalleryPage() {
  const { photos } = useParams()
  const route = galleryRoutes.find(r => 
    r.path === `/travel/uzbekistan/photos/${photos}`
  )
  
  return <div>{/* Render gallery */}</div>
}
```

### 6. React Router Setup for Vite

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/travel/:country/photos/*" element={<Gallery />} />
    </Routes>
  )
}
```

---

## Common Patterns

### TypeScript Configuration

Both Astro and Vite support TypeScript. Here's a comparison:

#### Astro tsconfig.json
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@src/*": ["src/*"]
    }
  }
}
```

#### Vite tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@src/*": ["src/*"]
    }
  }
}
```

### Tailwind Setup

#### Astro
```bash
npx astro add tailwind
```

Automatic setup - works out of the box.

#### Vite
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Build Commands

#### Astro
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

#### Vite
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Migration Checklist

### Astro Migration

- [ ] Install Astro and integrations
- [ ] Set up directory structure
- [ ] Configure path aliases
- [ ] Set up Content Collections for blog
- [ ] Migrate blog posts to src/content/blog
- [ ] Convert static pages to .astro
- [ ] Migrate dynamic routes (galleries)
- [ ] Update environment variables (NEXT_PUBLIC_ → PUBLIC_)
- [ ] Set up Netlify adapter
- [ ] Configure redirects
- [ ] Test all routes
- [ ] Deploy to preview

### Vite Migration

- [ ] Install Vite and dependencies
- [ ] Set up React Router
- [ ] Install SSG plugin (vite-ssg)
- [ ] Configure vite-plugin-pages
- [ ] Set up markdown processing
- [ ] Create build scripts for dynamic routes
- [ ] Migrate blog posts
- [ ] Migrate gallery logic
- [ ] Set up route generation
- [ ] Configure Netlify
- [ ] Test all routes
- [ ] Deploy to preview

---

## Performance Optimization Tips

### Astro

1. **Use partial hydration:**
   ```astro
   <InteractiveComponent client:load />  <!-- Loads immediately -->
   <InteractiveComponent client:idle />  <!-- Loads when idle -->
   <InteractiveComponent client:visible /> <!-- Loads when visible -->
   ```

2. **Optimize images:**
   ```astro
   <Image src={photo} alt="" loading="lazy" />
   ```

3. **Prefetch important pages:**
   ```astro
   <a href="/blog" data-astro-prefetch>Blog</a>
   ```

### Vite

1. **Code splitting:**
   ```tsx
   const LazyComponent = lazy(() => import('./Component'))
   ```

2. **Dynamic imports:**
   ```tsx
   const data = await import(`./data/${id}.json`)
   ```

3. **Build optimization:**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             gallery: ['./src/photos'],
           }
         }
       }
     }
   })
   ```

---

## Troubleshooting

### Common Issues with Astro

**Issue:** React components not hydrating
**Solution:** Add client directive
```astro
<Component client:load />
```

**Issue:** Environment variables not working
**Solution:** Use `PUBLIC_` prefix and access via `import.meta.env`
```typescript
const apiKey = import.meta.env.PUBLIC_API_KEY
```

**Issue:** CSS not loading
**Solution:** Import in component frontmatter or use global styles
```astro
---
import '../styles/component.css'
---
```

### Common Issues with Vite

**Issue:** File system imports not working
**Solution:** Use import.meta.glob
```typescript
const modules = import.meta.glob('./dir/*.tsx')
```

**Issue:** SSR not working
**Solution:** Ensure using vite-ssg correctly
```typescript
export const createApp = ViteSSG(App, { routes })
```

**Issue:** Build failing on dynamic imports
**Solution:** Use explicit chunk names
```typescript
const Component = () => import(/* @vite-ignore */ `./components/${name}`)
```

---

## Conclusion

This document provides practical examples for both Astro and Vite migrations. Based on the analysis in `FRAMEWORK_INVESTIGATION.md`, **Astro is recommended** for this project due to:

1. Better alignment with static site generation needs
2. Built-in support for dynamic routes and SSG
3. Easier migration path from Next.js
4. Better performance with partial hydration
5. Excellent Netlify support

However, these examples show that both migrations are technically feasible. Choose based on your specific requirements and preferences.
