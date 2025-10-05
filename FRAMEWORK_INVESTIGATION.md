# Framework Migration Investigation: Vite vs Astro

## Executive Summary

This document investigates migrating from Next.js to either Vite or Astro for patik.com. After analyzing the current architecture and requirements, **Astro is the recommended choice** for this migration.

### Quick Recommendation: Astro ✅

**Why Astro wins:**
- Purpose-built for content-focused sites (blog + travel pages)
- Native support for static site generation with getStaticPaths equivalent
- Excellent image optimization built-in
- Seamless Netlify deployment
- Better performance with zero JavaScript by default
- Easy migration path from Next.js
- Strong Markdown/MDX support for blog posts

**Why not Vite alone:**
- Vite is primarily a build tool/dev server, not a framework
- Would require React Router or similar for routing
- No built-in SSG support without additional tools
- More manual setup required for image galleries

---

## Current Architecture Analysis

### Technology Stack
- **Framework:** Next.js 15.3.1 (Static Site Generation mode)
- **React:** 19.1.0
- **Build Output:** Static HTML export (`output: 'export'`)
- **Image Provider:** Cloudinary for photo galleries
- **Styling:** Tailwind CSS + SASS
- **Content:** Markdown files in `_posts/` directory (18 blog posts)
- **Deployment:** Netlify
- **Node Version:** 22

### Key Features to Migrate

#### 1. **Photo Galleries** (Critical Requirement)
- Located in `src/photos/` and `src/galleries/`
- Complex implementation using:
  - `getStaticPaths` for dynamic routes (`[[...photos]].tsx`)
  - `getStaticProps` to fetch images from Cloudinary at build time
  - Blur placeholders generated during build
  - File-system based caching in `tmp/` directory
  - Multi-level routing: country → city → photo
  - Example: `/travel/uzbekistan/photos/samarkand/0`

**Gallery Architecture:**
```typescript
// pages/travel/uzbekistan/photos/[[...photos]].tsx
export const getStaticPaths = async () => {
  // Generates paths for:
  // /travel/country/photos/
  // /travel/country/photos/city1/
  // /travel/country/photos/city1/1234
}

export const getStaticProps = async (context) => {
  // Fetches images from Cloudinary
  // Generates blur placeholders
  // Returns image metadata
}
```

**Dependencies:**
- Cloudinary SDK for image fetching
- Image optimization at build time
- Blur placeholder generation with Sharp
- ~26 TypeScript files in photo gallery system

#### 2. **Blog System**
- 18 Markdown posts in `_posts/` directory
- Front matter metadata (title, date, categories, etc.)
- Dynamic routes: `/blog/[slug]/`
- Uses `gray-matter` for parsing
- Syntax highlighting for code blocks
- Image dimension calculation for blog images

#### 3. **Static Pages**
- ~22 TSX page files
- Travel pages for different countries
- Portfolio, About, Code pages
- User scripts documentation

#### 4. **Build Features**
- Image copying script (`bin/copy-images.mjs`)
- TypeScript compilation
- SASS compilation
- Tailwind processing
- Redirects configuration (handled in `netlify.toml` and `next.config.js`)

---

## Option 1: Vite

### Overview
Vite is a modern build tool and development server, not a full framework. To use Vite, you'd need to combine it with React Router or a similar solution.

### Pros
✅ Lightning-fast HMR (Hot Module Replacement)
✅ Modern ESM-based architecture
✅ Excellent TypeScript support
✅ Plugin ecosystem (vite-plugin-react, etc.)
✅ Can use existing React components as-is
✅ Great developer experience

### Cons
❌ **Not a framework** - requires additional tools for routing, SSG
❌ **No built-in SSG** - would need vite-ssg or vite-plugin-ssr
❌ **Manual route generation** - no equivalent to getStaticPaths
❌ **More boilerplate** for static site generation
❌ **Image optimization** would need manual setup
❌ **Markdown handling** requires additional plugins

### Photo Gallery Considerations

**Challenges:**
1. No native getStaticPaths equivalent - would need to:
   - Use vite-ssg plugin
   - Manually configure all routes
   - Write custom build-time scripts to fetch Cloudinary images
2. Image optimization would require:
   - Manual Sharp integration
   - Custom blur placeholder generation
   - Possibly vite-imagetools plugin
3. Dynamic routing would need:
   - React Router with route generation
   - Custom solution for [...photos] catch-all routes

**Possible Solutions:**
- Use `vite-ssg` (Static Site Generation for Vite)
- Use `vite-plugin-pages` for file-based routing
- Manual Cloudinary integration during build
- Custom pre-build scripts to generate routes and fetch images

**Complexity Level:** 🔴 High - Requires significant custom tooling

### Blog Considerations

**Challenges:**
1. No built-in Markdown processing
2. Need to set up:
   - vite-plugin-markdown or similar
   - Custom front matter parsing
   - Route generation for blog posts

**Solutions:**
- Use `vite-plugin-md` or `@vitejs/plugin-react-refresh`
- Keep existing gray-matter setup
- Custom build scripts for post generation

**Complexity Level:** 🟡 Medium - Doable but requires setup

### Netlify Deployment
✅ **Easy:** Netlify has good Vite support
- Build command: `vite build`
- Publish directory: `dist`
- Redirects would work with `_redirects` file

### Migration Effort
- **Estimated Time:** 3-5 days
- **Risk Level:** Medium-High
- **Code Changes:** Moderate to High (routing, SSG setup)

### Example Vite Setup for This Site

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
      // Would need custom route generation
    }),
    Markdown()
  ],
  // Would need custom SSG solution
})
```

---

## Option 2: Astro

### Overview
Astro is a modern static site generator designed for content-focused websites. It supports multiple frameworks including React and has excellent performance characteristics.

### Pros
✅ **Purpose-built for static sites** - Perfect for blog + gallery site
✅ **Content-first architecture** - Excellent for Markdown content
✅ **Island Architecture** - Ship minimal JavaScript
✅ **Framework-agnostic** - Can use React components alongside Astro components
✅ **Built-in image optimization** - `<Image>` component with Sharp
✅ **Native SSG support** - getStaticPaths equivalent
✅ **Excellent Markdown/MDX support** - Built-in front matter parsing
✅ **File-based routing** - Similar to Next.js
✅ **Better performance** - Zero JS by default, hydrate only what's needed
✅ **View Transitions API** - Smooth page transitions
✅ **Great documentation** - Comprehensive guides for migration

### Cons
❌ Learning curve for `.astro` component syntax (but can use React)
❌ Some React patterns need adjustment (but React components work)
❌ Smaller ecosystem than Next.js (but growing rapidly)

### Photo Gallery Considerations

**Astro Solutions:**
1. **Dynamic Routes:** Astro supports `[...slug].astro` (catch-all routes)
2. **Static Path Generation:**
```typescript
// src/pages/travel/[country]/photos/[...photos].astro
export async function getStaticPaths() {
  // Fetch from Cloudinary
  const galleries = await fetchGalleries();
  
  return galleries.map(gallery => ({
    params: { country: 'uzbekistan', photos: ['samarkand', '0'] },
    props: { images: gallery.images }
  }));
}
```

3. **Image Optimization:**
```astro
---
import { Image } from 'astro:assets';
---
<Image src={cloudinaryUrl} alt="" width={800} height={600} />
```

4. **React Components:** Keep existing gallery React components
```astro
---
import GalleryGrid from '@src/photos/components/GalleryGrid';
---
<GalleryGrid client:load images={images} />
```

**Advantages:**
- Built-in image optimization with Sharp (already using Sharp)
- Native support for dynamic routes and SSG
- Can reuse most existing React gallery components
- Better performance with partial hydration

**Complexity Level:** 🟢 Low-Medium - Natural fit for this use case

### Blog Considerations

**Astro Solutions:**
1. **Content Collections API** (Recommended):
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    categories: z.array(z.string()),
  }),
});

export const collections = { blog };
```

2. **Query Posts:**
```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) => 
  b.data.date.valueOf() - a.data.date.valueOf()
);
```

3. **Dynamic Routes:**
```astro
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
```

**Advantages:**
- Built-in Markdown/MDX support
- Type-safe content collections
- Better performance (no React runtime for content)
- Easier syntax highlighting setup
- Can still use React components where needed

**Complexity Level:** 🟢 Low - Actually simpler than Next.js

### Netlify Deployment
✅ **Excellent:** Netlify has first-class Astro support
- Official Netlify adapter: `@astrojs/netlify`
- Build command: `astro build`
- Publish directory: `dist`
- Automatic adapter configuration
- Environment variables work identically
- Redirects via `_redirects` or `netlify.toml`

```javascript
// astro.config.mjs
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static', // or 'server' for SSR
  adapter: netlify(),
});
```

### Migration Effort
- **Estimated Time:** 2-4 days
- **Risk Level:** Low-Medium
- **Code Changes:** Moderate (convert pages, keep components)

### Migration Path

1. **Phase 1: Setup** (2-4 hours)
   - Install Astro
   - Configure Tailwind, TypeScript
   - Set up content collections

2. **Phase 2: Static Pages** (4-6 hours)
   - Convert TSX pages to `.astro`
   - Or keep as React components in Astro pages
   - Configure routing

3. **Phase 3: Blog** (3-4 hours)
   - Move `_posts` to `src/content/blog`
   - Set up content collections
   - Create blog listing and detail pages

4. **Phase 4: Photo Galleries** (8-12 hours)
   - Convert gallery pages to Astro
   - Implement getStaticPaths for dynamic routes
   - Keep React components for interactive features
   - Test Cloudinary integration

5. **Phase 5: Testing & Deployment** (2-4 hours)
   - Test all routes
   - Configure Netlify
   - Deploy to preview

### Example Astro Setup

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
  ],
  adapter: netlify(),
  output: 'static',
});
```

```astro
---
// src/pages/travel/uzbekistan/photos/[...photos].astro
import Layout from '@src/components/Layout.astro';
import GalleryGrid from '@src/photos/components/GalleryGrid';
import { fetchGallery } from '@src/photos/utils/fetchFolderFromAssetProvider';

export async function getStaticPaths() {
  const images = await fetchGallery('uzbekistan/samarkand');
  
  const paths = [];
  // Main gallery page
  paths.push({ params: { photos: undefined } });
  
  // Individual photo pages
  images.forEach((img, i) => {
    paths.push({
      params: { photos: `samarkand/${i}` },
      props: { currentPhoto: img, images }
    });
  });
  
  return paths;
}

const { photos } = Astro.params;
const { currentPhoto, images } = Astro.props;
---

<Layout title="Uzbekistan Photos">
  <GalleryGrid 
    client:load 
    images={images} 
    currentPhoto={currentPhoto}
  />
</Layout>
```

---

## Comparison Matrix

| Feature | Next.js (Current) | Vite | Astro |
|---------|------------------|------|--------|
| **SSG Support** | ✅ Native | ⚠️ Needs plugins | ✅ Native |
| **Dynamic Routes** | ✅ getStaticPaths | ⚠️ Manual setup | ✅ getStaticPaths |
| **Image Optimization** | ✅ Built-in | ❌ Manual | ✅ Built-in |
| **Markdown/MDX** | ⚠️ Needs setup | ❌ Needs plugins | ✅ Native |
| **React Support** | ✅ Full | ✅ Full | ✅ Via integration |
| **Performance** | 🟢 Good | 🟢 Good | 🟢 Excellent |
| **Bundle Size** | 🟡 Medium | 🟡 Medium | 🟢 Minimal |
| **Dev Experience** | 🟢 Excellent | 🟢 Excellent | 🟢 Excellent |
| **Learning Curve** | Low | Low-Medium | Low-Medium |
| **Netlify Support** | ✅ Excellent | ✅ Good | ✅ Excellent |
| **Migration Effort** | N/A | 🔴 High | 🟡 Medium |
| **Photo Gallery** | ✅ Works well | ⚠️ Custom needed | ✅ Natural fit |
| **Blog System** | ✅ Works well | ⚠️ Custom needed | ✅ Better |
| **Cloudinary** | ✅ Compatible | ✅ Compatible | ✅ Compatible |

---

## Specific Considerations

### Image Galleries & Viewer

#### Current Implementation Analysis
- 26 TypeScript files for photo gallery logic
- Dynamic routing with catch-all routes: `[[...photos]].tsx`
- Build-time image fetching from Cloudinary
- Blur placeholder generation
- Multi-level routing (country/city/photo)
- React components for gallery UI

#### Astro Implementation ✅
**Works excellently because:**
1. Astro has native support for catch-all routes: `[...photos].astro`
2. Built-in `getStaticPaths` function identical to Next.js
3. Can keep all React gallery components and use `client:load` directive
4. Built-in image optimization with Sharp (already using Sharp)
5. Better performance - only interactive parts need JavaScript

**Example:**
```astro
---
// Can keep the exact same TypeScript logic
import { fetchGallery } from '@src/photos/utils/fetchFolderFromAssetProvider';

export async function getStaticPaths() {
  // Reuse existing getGalleryStaticPaths logic
  return await getGalleryStaticPaths([samarkand]);
}
---

<!-- Keep existing React components -->
<GalleryGrid client:load {...props} />
```

#### Vite Implementation ⚠️
**More challenging:**
1. No native getStaticPaths - need vite-ssg plugin
2. Catch-all routes require manual React Router setup
3. Would need custom build script to:
   - Fetch all Cloudinary images
   - Generate all possible routes
   - Create static HTML files
4. More boilerplate code required

### Netlify Deployment

#### Astro ✅ Excellent
- Official `@astrojs/netlify` adapter
- Automatic configuration
- Same environment variables (CLOUDINARY_API_KEY, etc.)
- Supports both static and SSR
- Edge functions support if needed
- Redirects via `_redirects` or `netlify.toml`

#### Vite ✅ Good
- Well supported on Netlify
- Simple build configuration
- Would need `_redirects` file for client-side routing
- Environment variables work the same

### Other Considerations

#### TypeScript Support
- **Astro:** ✅ Excellent - Native TypeScript support
- **Vite:** ✅ Excellent - Native TypeScript support

#### Styling (Tailwind + SASS)
- **Astro:** ✅ Official Tailwind integration, SASS support via `astro-sass`
- **Vite:** ✅ Built-in SASS support, Tailwind via PostCSS

#### Build Speed
- **Astro:** 🟢 Fast - Optimized for static builds
- **Vite:** 🟢 Very Fast - Lightning-fast HMR

#### Community & Ecosystem
- **Astro:** 🟢 Growing rapidly - Strong content-focused community
- **Vite:** 🟢 Large - Vue/React ecosystem

#### Future-Proofing
- **Astro:** 🟢 Strong momentum - Content collections, View Transitions
- **Vite:** 🟢 Industry standard - Used by major frameworks

---

## Recommendations

### Primary Recommendation: Astro 🌟

**Choose Astro if:**
- ✅ You want better performance with less JavaScript
- ✅ You want a content-first architecture
- ✅ You want simpler blog post management
- ✅ You want built-in image optimization
- ✅ You want easier migration path
- ✅ You value excellent documentation

**Astro is the best fit for patik.com because:**
1. **Content-focused:** Site is primarily blog posts + travel photos
2. **Static generation:** Astro excels at SSG with getStaticPaths
3. **Image optimization:** Built-in support matches current needs
4. **React compatibility:** Can keep existing gallery components
5. **Performance:** Zero JS by default, faster page loads
6. **Netlify:** First-class deployment support
7. **Migration path:** Natural progression from Next.js SSG

### Alternative: Vite (if specific needs)

**Choose Vite if:**
- ✅ You need maximum build tool flexibility
- ✅ You want to keep pure React SPA architecture
- ✅ You plan to add more interactive features
- ✅ You're comfortable with more manual setup

**However, for this site:**
- ❌ Would require more custom tooling
- ❌ No clear advantage over Astro
- ❌ More work to achieve same functionality
- ❌ SSG would need additional plugins

### Stay with Next.js if:
- ✅ Current setup is working well
- ✅ You might need SSR in the future
- ✅ You want to avoid migration effort
- ✅ You're comfortable with the bundle size

---

## Migration Roadmap (Astro)

### Prerequisites
1. Ensure all environment variables are documented
2. Create full backup of site
3. Set up staging environment on Netlify

### Phase 1: Project Setup (Day 1)
- [ ] Initialize Astro project
- [ ] Install dependencies (@astrojs/react, @astrojs/tailwind, @astrojs/netlify)
- [ ] Configure TypeScript
- [ ] Set up Tailwind CSS
- [ ] Configure path aliases (@src)
- [ ] Test basic build

### Phase 2: Static Pages Migration (Day 1-2)
- [ ] Convert simple pages (about, portfolio, code)
- [ ] Create base Layout component
- [ ] Test routing and navigation
- [ ] Verify styling

### Phase 3: Blog System (Day 2)
- [ ] Set up Content Collections
- [ ] Move blog posts to src/content/blog
- [ ] Create blog listing page
- [ ] Create blog detail page ([slug])
- [ ] Test Markdown rendering
- [ ] Verify syntax highlighting

### Phase 4: Photo Galleries (Day 2-3)
- [ ] Set up Cloudinary integration
- [ ] Convert gallery pages to Astro
- [ ] Implement getStaticPaths for galleries
- [ ] Convert React gallery components (or keep with client:load)
- [ ] Test multi-level routing
- [ ] Verify blur placeholders
- [ ] Test image loading and optimization

### Phase 5: Testing & Refinement (Day 3-4)
- [ ] Test all routes
- [ ] Verify all images load correctly
- [ ] Test Cloudinary integration
- [ ] Check performance metrics
- [ ] Verify mobile responsiveness
- [ ] Test all redirects

### Phase 6: Deployment (Day 4)
- [ ] Configure Netlify adapter
- [ ] Set up environment variables
- [ ] Deploy to Netlify preview
- [ ] Test production build
- [ ] Verify all functionality
- [ ] Update DNS if needed

---

## Performance Comparison

### Expected Performance Improvements with Astro

| Metric | Next.js | Astro (Expected) | Improvement |
|--------|---------|------------------|-------------|
| **Initial JS Bundle** | ~85KB | ~15KB | ~82% smaller |
| **Time to Interactive** | ~1.2s | ~0.4s | ~67% faster |
| **First Contentful Paint** | ~0.8s | ~0.5s | ~38% faster |
| **Lighthouse Score** | 85-90 | 95-100 | +10-15 points |

*These are estimates based on typical Astro vs Next.js static sites*

---

## Decision Matrix

| Criteria | Weight | Vite Score | Astro Score |
|----------|--------|-----------|-------------|
| Photo Gallery Support | 30% | 6/10 | 9/10 |
| Blog System | 20% | 6/10 | 10/10 |
| Migration Effort | 20% | 5/10 | 8/10 |
| Performance | 15% | 8/10 | 10/10 |
| Netlify Deployment | 10% | 8/10 | 10/10 |
| Future Maintenance | 5% | 7/10 | 9/10 |
| **Total Score** | **100%** | **6.4/10** | **9.2/10** |

---

## Conclusion

**Recommendation: Migrate to Astro**

Astro is the clear winner for patik.com because:

1. **Natural Fit:** Designed for content-heavy static sites
2. **Better Gallery Support:** Native SSG with dynamic routes
3. **Easier Migration:** More similar to Next.js patterns
4. **Better Performance:** Minimal JavaScript, faster loads
5. **Excellent Netlify Support:** Official adapter and first-class support
6. **Future-Proof:** Growing ecosystem, modern features

**Timeline:** 2-4 days for full migration
**Risk:** Low - Well-documented, proven technology
**ROI:** High - Better performance, easier maintenance, lower bundle size

The combination of built-in image optimization, native SSG support, and content collections makes Astro the ideal choice for this site's specific needs.

---

## Next Steps

If proceeding with Astro migration:

1. **Review this document** with stakeholders
2. **Set up test environment** for proof of concept
3. **Migrate a single page** (e.g., About page) as POC
4. **Migrate blog system** as second POC
5. **Tackle photo gallery** migration
6. **Full migration** following the roadmap above
7. **Deploy to production** after thorough testing

For questions or clarification on any point in this investigation, please open a discussion on the repository.
