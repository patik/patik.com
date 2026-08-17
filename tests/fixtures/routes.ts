/**
 * One representative URL per distinct page template.
 * Used by smoke, visual regression, and accessibility tests.
 */
export const routes = [
    { path: '/', label: 'home', includeVisual: true },
    { path: '/about/', label: 'about', includeVisual: true },
    { path: '/blog/', label: 'blog-index', includeVisual: true },
    // Representative because it exercises the post-body styles the shorter posts don't:
    // h2s, h3s, nested lists, and inline code.
    { path: '/blog/how-to-use-your-iphone-overseas/', label: 'blog-post', includeVisual: true },
    { path: '/code/user-scripts/', label: 'code-user-scripts', includeVisual: true },
    { path: '/concerts/', label: 'concerts', includeVisual: true },
    { path: '/football/', label: 'football', includeVisual: true },
    { path: '/portfolio/', label: 'portfolio', includeVisual: true },
    { path: '/portfolio/pull-requests/', label: 'pull-requests-index', includeVisual: true },
    {
        path: '/portfolio/pull-requests/spa-global-store-with-zustand/',
        label: 'pull-request',
        includeVisual: true,
    },
    { path: '/travel/', label: 'travel-index', includeVisual: true },
    { path: '/travel/france/', label: 'travel-country', includeVisual: true },
    { path: '/travel/italy/', label: 'travel-italy', includeVisual: true },
    { path: '/travel/uzbekistan/', label: 'travel-uzbekistan', includeVisual: true },
    { path: '/travel/uzbekistan/photos/', label: 'travel-photos-index', includeVisual: true },
    { path: '/travel/uzbekistan/photos/samarkand/', label: 'travel-photos-city', includeVisual: true },
] as const
