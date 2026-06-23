# Patik.com

## Site

These are the files for my personal web site [patik.com](https://patik.com/)

This is an [Astro](https://astro.build/) project deployed on [Netlify](https://www.netlify.com/).

## 🧞 Commands

| Command                   | Action                                                  |
| :------------------------ | :------------------------------------------------------ |
| `pnpm install`            | Installs dependencies                                   |
| `pnpm dev`                | Starts local dev server at `localhost:4321`             |
| `pnpm build`              | Build your production site to `./dist/`                 |
| `pnpm start`              | Preview your build locally, before deploying            |
| `pnpm start:prod`         | Preview your production build locally, before deploying |
| `pnpm lint`               | Run ESLint, TypeScript check, and find unused Sass vars |
| `pnpm astro ...`          | Run CLI commands like `astro add`, `astro check`        |
| `pnpm astro -- --help`    | Get help using the Astro CLI                            |
| `pnpm clear-fetch-cache`  | Clear the `tmp/` fetch cache directory                  |

[Astro documentation](https://docs.astro.build)

## Project Structure

```
src/
├── components/     # Reusable Astro and React components
├── content.config.ts # Astro Content Collections configuration
├── galleries/      # Photo gallery data (e.g., Uzbekistan)
├── layouts/        # Page layouts
├── lib/            # Utility functions and helpers
├── pages/          # Astro pages (file-based routing)
├── photos/         # Photo-related components/utilities
├── posts/          # Blog posts (Markdown with frontmatter)
├── styles/         # Global styles and CSS modules
└── types/          # TypeScript type definitions
```

## Blog

<http://patik.com/blog/>

Blog posts are stored in `src/posts/` as Markdown files using [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/). Each post is a folder containing an `index.md` file with frontmatter support.

### Frontmatter Schema

```yaml
title: string       # Required
date: date          # Required
excerpt: string     # Optional
categories: array   # Optional
ogImage: string     # Optional
coverImage: string  # Optional
draft: boolean      # Optional
```

## Photo Galleries

Photo galleries (e.g., travel photos from Uzbekistan) are managed in `src/galleries/`. Images are served via [Cloudinary](https://cloudinary.com/) for optimization and delivery.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) with React integration
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + CSS Modules
- **Content:** Astro Content Collections with Markdown posts
- **Code Blocks:** [Expressive Code](https://expressive-code.com/) with syntax highlighting
- **Images:** Cloudinary for photo galleries
- **Deployment:** Static site on Netlify
- **Package Manager:** pnpm
