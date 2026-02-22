/**
 * One representative URL per distinct page template.
 * Used by smoke, visual regression, and accessibility tests.
 */
export const routes = [
    { path: '/', label: 'home' },
    { path: '/about/', label: 'about' },
    { path: '/blog/', label: 'blog-index' },
    { path: '/blog/clogging-twitter-with-spam/', label: 'blog-post' },
    { path: '/code/', label: 'code' },
    { path: '/code/user-scripts/', label: 'code-user-scripts' },
    { path: '/portfolio/', label: 'portfolio' },
    { path: '/travel/', label: 'travel-index' },
    { path: '/travel/france/', label: 'travel-country' },
    { path: '/travel/uzbekistan/', label: 'travel-uzbekistan' },
    { path: '/travel/uzbekistan/photos/', label: 'travel-photos-index' },
    { path: '/travel/uzbekistan/photos/samarkand/', label: 'travel-photos-city' },
] as const
