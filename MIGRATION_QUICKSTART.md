# Quick Start: Astro Migration

This is a step-by-step guide to actually perform the migration from Next.js to Astro.

> **Prerequisites:** Read [INVESTIGATION_SUMMARY.md](./INVESTIGATION_SUMMARY.md) first to understand why Astro is recommended.

## ⚡ Quick Start Checklist

- [ ] **Phase 0:** Preparation (30 minutes)
- [ ] **Phase 1:** Setup & Simple Pages (2-3 hours)
- [ ] **Phase 2:** Blog System (3-4 hours)
- [ ] **Phase 3:** Photo Galleries (8-10 hours)
- [ ] **Phase 4:** Testing & Polish (2-3 hours)
- [ ] **Phase 5:** Deployment (1-2 hours)

**Total Time:** 2-4 days (16-22 hours)

---

## Phase 0: Preparation (30 minutes)

### Backup & Branch

```bash
# Make sure you're on main with latest changes
cd /path/to/patik.com
git checkout main
git pull

# Create migration branch
git checkout -b migrate-to-astro

# Tag current state as backup
git tag backup-before-astro-migration
git push origin backup-before-astro-migration
```

### Document Current State

```bash
# Test current build
yarn build

# Note build output size
ls -lh out/

# Test current site
yarn start:prod

# Take screenshots of key pages:
# - Homepage
# - Blog listing
# - A blog post
# - Gallery page
# - Individual photo
```

### Set Up Parallel Testing

```bash
# Create Astro project in parallel directory
cd ..
npm create astro@latest patik-astro -- --template minimal --typescript strict

cd patik-astro
```

---

## Phase 1: Setup & Simple Pages (2-3 hours)

### Install Dependencies

```bash
cd patik-astro

# Core integrations
npm install @astrojs/react @astrojs/tailwind @astrojs/netlify @astrojs/mdx

# Existing dependencies
npm install cloudinary sharp date-fns gray-matter lodash motion
npm install react react-dom
npm install -D sass @types/react @types/react-dom @types/lodash

# Additional dev dependencies
npm install -D @types/node
```

### Configure Astro

Copy from [ASTRO_CONFIGURATION.md](./ASTRO_CONFIGURATION.md):

```bash
# Create astro.config.mjs
cat > astro.config.mjs << 'EOF'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import netlify from '@astrojs/netlify'

export default defineConfig({
  site: 'https://patik.com',
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  output: 'static',
  adapter: netlify(),
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: {
        '@src': '/src',
      },
    },
  },
})
EOF
```

### Copy Assets & Styles

```bash
# Copy from Next.js project
cp -r ../patik.com/src/styles src/
cp -r ../patik.com/public/* public/
cp ../patik.com/tailwind.config.js ./tailwind.config.mjs

# Update tailwind config for Astro
# Edit tailwind.config.mjs:
# content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}']
```

### Copy Utility Functions

```bash
# Copy libraries (most can stay as-is)
cp -r ../patik.com/src/lib src/
cp -r ../patik.com/src/config.json src/
cp -r ../patik.com/src/countries.json src/
```

### Migrate Simple Pages

Create `src/components/Layout.astro`:

```astro
---
interface Props {
  title?: string
  keywords?: string[]
}

const { title = 'Craig Patik', keywords = [] } = Astro.props
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    {keywords.length > 0 && (
      <meta name="keywords" content={keywords.join(', ')} />
    )}
  </head>
  <body>
    <slot />
  </body>
</html>
```

Convert pages:

```bash
# pages/index.tsx → src/pages/index.astro
# pages/about.tsx → src/pages/about.astro
# pages/portfolio.tsx → src/pages/portfolio.astro
```

### Test Phase 1

```bash
npm run dev
# Visit http://localhost:4321
# Check that simple pages load
```

---

## Phase 2: Blog System (3-4 hours)

### Set Up Content Collections

```bash
mkdir -p src/content/blog
```

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    unpublished: z.boolean().optional(),
  }),
})

export const collections = { blog }
```

### Migrate Blog Posts

```bash
# Copy blog posts
cp -r ../patik.com/_posts/* src/content/blog/

# Each post should be in a folder with index.md
# Example: src/content/blog/my-post/index.md
```

### Create Blog Pages

`src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content'
import Layout from '@src/components/Layout.astro'

let posts = await getCollection('blog')

if (import.meta.env.PROD) {
  posts = posts.filter(p => !p.data.unpublished)
}

const sortedPosts = posts.sort((a, b) => 
  b.data.date.valueOf() - a.data.date.valueOf()
)
---

<Layout title="Blog">
  <h1>Blog</h1>
  {sortedPosts.map(post => (
    <article>
      <h2><a href={`/blog/${post.slug}/`}>{post.data.title}</a></h2>
      <time>{post.data.date.toLocaleDateString()}</time>
    </article>
  ))}
</Layout>
```

`src/pages/blog/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content'
import Layout from '@src/components/Layout.astro'

export async function getStaticPaths() {
  let posts = await getCollection('blog')
  
  if (import.meta.env.PROD) {
    posts = posts.filter(p => !p.data.unpublished)
  }
  
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
    <time>{post.data.date.toLocaleDateString()}</time>
    <Content />
  </article>
</Layout>
```

### Test Phase 2

```bash
npm run dev
# Visit http://localhost:4321/blog/
# Check blog listing loads
# Check individual posts load
# Verify markdown rendering
```

---

## Phase 3: Photo Galleries (8-10 hours)

### Copy Gallery Code

```bash
# Copy galleries, components, and helpers
cp -r ../patik.com/src/galleries src/
cp -r ../patik.com/src/photos src/
```

### Update Environment Variables

Create `.env`:

```bash
# Change NEXT_PUBLIC_ to PUBLIC_
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

Update `src/photos/utils/cloudinary.ts`:

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

### Create Gallery Page

`src/pages/travel/uzbekistan/photos/[...photos].astro`:

```astro
---
import Layout from '@src/components/Layout.astro'
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

const segments = Array.isArray(photos) ? photos : photos ? [photos] : []
const isPhotoDetailPage = segments.length === 2
---

<Layout title={countryGallery.title}>
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
      gallery={countryGallery}
      cityGalleries={[samarkand]}
      images={images}
    />
  )}
</Layout>
```

### Update React Components

For any React components that use Next.js features:

```typescript
// Replace: import { useRouter } from 'next/router'
// With: Use props passed from Astro page

// Replace: import Image from 'next/image'
// With: Keep using it in client components, or use Astro's Image

// Replace: import Link from 'next/link'
// With: Regular <a> tags or create a Link component
```

### Test Phase 3

```bash
npm run dev
# Visit http://localhost:4321/travel/uzbekistan/photos/
# Check gallery index loads
# Check city galleries load
# Check individual photos load
# Verify images from Cloudinary work
```

---

## Phase 4: Testing & Polish (2-3 hours)

### Build Test

```bash
npm run build

# Check for errors
# Review build output size
ls -lh dist/
```

### Manual Testing Checklist

- [ ] Homepage loads and looks correct
- [ ] About page loads
- [ ] Portfolio page loads
- [ ] Code page loads
- [ ] Blog listing page works
- [ ] Individual blog posts render correctly
- [ ] Blog post images display
- [ ] Code syntax highlighting works
- [ ] Gallery index page works
- [ ] City gallery pages work
- [ ] Individual photo pages work
- [ ] Photo navigation works (prev/next)
- [ ] Images load from Cloudinary
- [ ] All links work
- [ ] Mobile responsive
- [ ] No console errors

### Performance Testing

```bash
# Build for production
npm run build

# Serve locally
npm run preview

# Test with Lighthouse
# Target: 95+ score
```

### Fix Any Issues

Common issues and fixes:

1. **Images not loading:**
   - Check environment variables
   - Verify Cloudinary config

2. **React components not interactive:**
   - Add `client:load` directive

3. **Styles not applying:**
   - Check CSS imports in Layout
   - Verify Tailwind config

4. **Routes not generating:**
   - Check getStaticPaths
   - Verify params structure

---

## Phase 5: Deployment (1-2 hours)

### Configure Netlify

Update `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/travel/paris/"
  to = "/travel/france/"
  status = 301

[build.environment]
  NODE_VERSION = "22"
```

### Set Environment Variables in Netlify

1. Go to Netlify dashboard
2. Site settings → Environment variables
3. Add:
   - `PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### Deploy to Preview

```bash
# Push to GitHub
git add .
git commit -m "Migrate to Astro"
git push origin migrate-to-astro

# Create PR
gh pr create --title "Migrate from Next.js to Astro" \
  --body "See FRAMEWORK_INVESTIGATION.md for details"

# Netlify will auto-deploy preview
```

### Test Preview Deployment

- [ ] Visit Netlify preview URL
- [ ] Test all functionality again
- [ ] Check performance metrics
- [ ] Verify Cloudinary images load
- [ ] Test on mobile devices

### Deploy to Production

```bash
# Merge PR
gh pr merge

# Or manually
git checkout main
git merge migrate-to-astro
git push origin main

# Netlify auto-deploys to production
```

---

## Post-Migration Checklist

### Immediate (Day 1)

- [ ] Monitor Netlify deploy logs
- [ ] Check production site loads
- [ ] Test critical paths (blog, galleries)
- [ ] Monitor for errors in Netlify dashboard
- [ ] Check analytics for issues

### Short-term (Week 1)

- [ ] Compare performance metrics
- [ ] Check Lighthouse scores
- [ ] Review bundle sizes
- [ ] Monitor for any user-reported issues
- [ ] Update documentation

### Long-term (Month 1)

- [ ] Review analytics trends
- [ ] Confirm performance improvements
- [ ] Clean up any old Next.js artifacts
- [ ] Update README with new stack
- [ ] Document lessons learned

---

## Rollback Plan

If critical issues arise:

### Quick Rollback (5 minutes)

```bash
# In Netlify dashboard:
# Deploys → Find last Next.js deploy → Publish deploy
```

### Full Rollback

```bash
git checkout main
git revert HEAD
git push origin main
# Netlify auto-deploys previous version
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
npm install
npm run build
```

### Images Not Loading

Check:
1. Environment variables set in Netlify
2. Cloudinary config using `import.meta.env`
3. Image URLs in Cloudinary response

### React Components Not Working

Add client directive:
```astro
<Component client:load />  <!-- Loads immediately -->
<Component client:idle />  <!-- Loads when browser idle -->
<Component client:visible /> <!-- Loads when visible -->
```

### Styles Not Applying

1. Check CSS imports in Layout.astro
2. Verify Tailwind config paths
3. Check for CSS import order issues

---

## Success Metrics

### Performance

- [ ] Lighthouse score: 95+ (up from 85-90)
- [ ] Bundle size: ~15KB (down from ~85KB)
- [ ] Load time: <0.5s (down from ~1.2s)

### Functionality

- [ ] All pages accessible
- [ ] All images loading
- [ ] All links working
- [ ] No console errors

### SEO

- [ ] Meta tags present
- [ ] Sitemap generated
- [ ] Structured data intact

---

## Next Steps After Migration

1. **Optimize Further:**
   - Add view transitions
   - Implement prefetching
   - Optimize images further

2. **Add Features:**
   - Search functionality
   - RSS feed for blog
   - More photo galleries

3. **Documentation:**
   - Update README
   - Document Astro patterns
   - Share lessons learned

---

## Resources

- [Astro Docs](https://docs.astro.build)
- [Migration Guide](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/)
- [Astro Discord](https://astro.build/chat)

## Questions?

Refer to:
- [INVESTIGATION_SUMMARY.md](./INVESTIGATION_SUMMARY.md) - Why Astro
- [FRAMEWORK_INVESTIGATION.md](./FRAMEWORK_INVESTIGATION.md) - Detailed analysis
- [MIGRATION_EXAMPLES.md](./MIGRATION_EXAMPLES.md) - Code examples
- [ASTRO_CONFIGURATION.md](./ASTRO_CONFIGURATION.md) - Full config

Good luck with the migration! 🚀
