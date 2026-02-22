# Coding standards and practices

Don't ask for permission before continuing. Just do it. Keep going until you solve the problem.

## Project overview

This is an Astro-based personal website with blog and photo galleries, deployed on Netlify. Key technologies:

- **Astro 5** with React integration for interactive components
- **Tailwind CSS** + CSS Modules for styling
- **Astro Content Collections** for blog posts (stored in `src/posts/`)
- **Cloudinary** for photo gallery image hosting
- **pnpm** as package manager

### Key commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm lint` — Run ESLint, TypeScript check, and unused Sass variable finder

### Path aliases

Use `@src/` for imports from the `src/` directory (configured in `astro.config.mjs` and `tsconfig.json`).

## Frontend conventions

- Functions and components should not require more information (arguments) than they need.
- If a function takes more than 2 arguments, consider refactoring it to take an object with named properties instead.

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants
- When a React component is wrapped in `memo()` or similar, the inner function should have the same name but with an underscore (\_) appended.

## Error Handling

- Prefer try/catch blocks for async operations

## Styling

- Prefer CSS Modules over other solutions
- If the selector applies the same value to both `padding-left` and `padding-right`, use `padding-inline`. The same goes for margin, and for `-block` in place of `-top` & `-bottom`. But this rule only applies if they're both defined with the same value (that is, don't use `margin-block-start`, etc).

### CSS Modules

- Make use of CSS variables.
- Make use of native CSS nesting.
- When a CSS module file is imported by a TSX file, import it as `css`.

## Tests

- Tests should be written in the same directory as the component being tested, in a file with the same name but with `.test.tsx` or `.test.ts` extension.

## React

- Use functional components with hooks instead of class components.
- Prefer composition and using `children` over props for passing content.
- Prefer `useReducer` or Zustand over multiple `useState`.
- Try to keep the number of hooks to a minimum.
- If an object is used as a prop but the recipient component only needs up to 3 properties that all have primitive values, only pass the needed properties instead of the whole object.

## Miscellaneous preferences

- Avoid using `as` in TypeScript when possible. If it's necessary, add a comment explaining why.
- Use `@ts-expect-error` instead of `@ts-ignore` and explain why it's needed. Only use this when absolutely necessary.
- When available, always use import paths that begins with an `@` path from tsconfig.json.
- Always use explicit return types for TypeScript functions
- Add detailed JSDoc comments for complex exported functions
- Include accessibility attributes when adding new UI components
- Use semantic HTML elements when possible
- Use descriptive variable names even if they're longer
- Prefer composition over inheritance in component design

## Tests

- Follow the "arrange, act, assert" pattern. Separate each step with a blank line.
- Use clear naming to make the test self-documenting.
- Write a separate test case for each code branch for the sake of cyclomatic complexity.
- Tests should cover edge, corner, and boundary cases.

## Travel photo galleries

Photos are hosted on **Cloudinary** and displayed via a dynamic Astro gallery system. There are two tiers of travel pages:

1. **Flat pages** (e.g. `src/pages/travel/turkey.astro`) — simple pages with no hosted photo gallery.
2. **Directory pages** (e.g. `src/pages/travel/uzbekistan/`) — countries with a full Cloudinary-backed photo gallery.

### Cloudinary setup

Required environment variables:

- `PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Organize photos in Cloudinary under folders named `Country Year/City` (e.g. `Uzbekistan 2023/Samarkand`). The folder string used in gallery config files must escape spaces with a backslash: `'Uzbekistan\\ 2023/Samarkand'`.

### Adding photos for a new trip

To add a Cloudinary-backed photo gallery for a country, create the following files:

#### 1. Gallery definition files — `src/galleries/<country>/`

**`src/galleries/<country>/index.ts`** — country-level gallery (type `CountryGallery`):

```ts
import type { CountryGallery } from '../../photos/utils/types'

const countryGallery: CountryGallery = {
    countryId: 'uzbekistan',         // matches URL slug and directory name
    countryName: 'Uzbekistan',
    cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand', // escaped space
    title: 'Uzbekistan',
    keywords: ['Uzbekistan', 'travel', ...],
}

export default countryGallery
```

**`src/galleries/<country>/<city>.ts`** — per-city gallery (type `CityGallery`, which extends `CountryGallery`):

```ts
import type { CityGallery } from '../../photos/utils/types'

const cityGallery: CityGallery = {
    countryId: 'uzbekistan',
    countryName: 'Uzbekistan',
    cityId: 'samarkand',             // matches URL segment
    cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
    title: 'Samarkand',
    keywords: ['Uzbekistan', 'Samarkand', 'travel', ...],
}

export default cityGallery
```

#### 2. Hero images — `src/images/`

Add a representative JPEG for each city/destination, named `<country>-<city>-<description>.jpg` (e.g. `uzbekistan-samarkand-dome.jpg`).

#### 3. Country page — `src/pages/travel/<country>/index.astro`

Import the country gallery config and hero images, then use `TravelLinkList` to render links to each city. Each item can link to either an internal gallery URL (`/travel/<country>/photos/<city>/`) or an external iCloud album URL.

#### 4. Dynamic gallery page — `src/pages/travel/<country>/photos/[...photos].astro`

Copy the pattern from `src/pages/travel/uzbekistan/photos/[...photos].astro`. This single file generates all routes:

- `/travel/<country>/photos/` — grid of all photos
- `/travel/<country>/photos/<n>` — lightbox for photo `n` (country level)
- `/travel/<country>/photos/<city>/` — grid for a city
- `/travel/<country>/photos/<city>/<n>` — lightbox for photo `n` in a city

In `getStaticPaths()`, import each city gallery file and add it to the `cityGalleries` array. `fetchFolderFromAssetProvider` handles Cloudinary API calls and caches results to `tmp/cloudinary-cache` during the build.

#### 5. Countries list — `src/countries.json`

Add the country to `visited` with its `name` and `yearsVisited` array. This powers the visited-countries display.

# Testing

Uses Playwright and snapshots.

## Process

### First push — bootstrapping Linux baselines

1. Commit and push everything (including your \*-darwin.png snapshots)
2. The CI run will fail — visual tests exit with "snapshot doesn't exist at \*-chromium-linux.png", but Playwright writes the files before dying
3. On the failed run's page in GitHub Actions, scroll to the bottom → Artifacts section → download new-snapshots
4. Unzip it — you'll find visual.spec.ts-snapshots/home-chromium-linux.png etc.
5. Copy those files into your local tests-snapshots/visual.spec.ts-snapshots/
6. Commit and push → second CI run passes ✓

### Future intentional UI changes (e.g. you upgrade Tailwind and the nav spacing shifts)

1. Make your change, rebuild, run pnpm test:update-snapshots locally to update the darwin PNGs
2. Commit your code change + the updated darwin snapshots
3. Go to Actions → "Update visual snapshots" → Run workflow (pick your branch)
4. The workflow builds on Linux, runs --update-snapshots, and commits the updated linux PNGs back to your branch automatically
5. Pull locally to get the commit → done

### Unintentional regressions (what the tests are actually guarding against)

When pnpm test runs in CI and finds a difference (not a missing file), it:

- Fails the run
- Uploads the HTML report as the playwright-report artifact
- The report has a side-by-side diff viewer showing exactly what pixel changed — open index.html from the downloaded zip
