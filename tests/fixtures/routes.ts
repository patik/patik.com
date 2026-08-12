/**
 * One representative URL per distinct page template.
 * Used by smoke, visual regression, and accessibility tests.
 */
export const routes = [
    { path: '/', label: 'home', includeVisual: true },
    { path: '/about/', label: 'about', includeVisual: true },
    { path: '/blog/', label: 'blog-index', includeVisual: true },
    { path: '/blog/clogging-twitter-with-spam/', label: 'blog-post', includeVisual: true },
    { path: '/code/user-scripts/', label: 'code-user-scripts', includeVisual: true },
    { path: '/concerts/', label: 'concerts', includeVisual: false },
    { path: '/football/', label: 'football', includeVisual: false },
    { path: '/portfolio/', label: 'portfolio', includeVisual: true },
    { path: '/travel/', label: 'travel-index', includeVisual: true },
    { path: '/travel/france/', label: 'travel-country', includeVisual: true },
    { path: '/travel/italy/', label: 'travel-italy', includeVisual: true },
    { path: '/travel/uzbekistan/', label: 'travel-uzbekistan', includeVisual: true },
    { path: '/travel/uzbekistan/photos/', label: 'travel-photos-index', includeVisual: true },
    { path: '/travel/uzbekistan/photos/samarkand/', label: 'travel-photos-city', includeVisual: true },
] as const
