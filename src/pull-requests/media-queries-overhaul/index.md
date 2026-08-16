---
title: 'Overhaul the useMediaQueries hook'
prNumber: 3949
date: '2023-04-27'
kind: 'Findings and solution'
standfirst: 'Why detecting screen size in JavaScript stopped being reliable.'
order: 8
author: 'patik'
state: 'merged'
baseBranch: 'deploy/2023-05-09'
headBranch: 'dev/INTETRIS-1881--defeat-the-media-query-hydra'
additions: 165
deletions: 81
changedFiles: 3
reviewCount: 6
---

Our handling of media queries to render content (things like "show this for mobile" and "hide this one desktop") needs a big overhaul.

_Keep in mind that MUI's hook is `useMediaQuery` (singular) and our enhanced version is `useMediaQueries` (plural)._

# Findings

## The MUI hook is back

We had stopped using [MUI's `useMediaQuery` hook](https://mui.com/material-ui/react-use-media-query/) a while back because of a bug, but it has now been fixed by MUI.

## Using JS for media queries is no longer reliable

In the world of React 18 and [SSR/SSG](https://prismic.io/blog/nextjs-ssr-vs-ssg#refresh), it's **not** possible to determine the screen size of the client with JavaScript for two reasons:

1. With *server*-side rendering, _there is no client_ and no viewport
2. Within a browser, we cannot read from `window` except with a `useEffect` hook, and those don't run until after the first render

Additionally, React 18's strict mode renders every functional component twice to ensure it outputs the same thing both times.

This means that **using booleans** like `isMobile` and `isDesktop` _**will always be inaccurate**_ on the first render. Using these booleans must be restricted to use cases that only occur in situations outside of the 'basic' or 'foundational' HTML for a page, such as within dialogs, or after the user has interacted with the page.

This also means that we **cannot** use this pattern to avoid rendering content:

```tsx
return (
    <>
        {isMobile ? <TinyThumbnails /> : <LargeThumbnails />}
    </>
)
```

In this case, `<LargeThumbnails>` _will always be rendered_ the first time, even in a mobile browser. This can result in visual glitches as well as wasted CPU cycles and possibly unwanted side effects (e.g. mutations).

### How do I **show/hide** content based on screen size?

Use CSS. There is no good JS solution.

MUI recommends using the `sx` prop's responsive values:

```tsx
// Mobile only
<Paper sx={{ display: { xs: 'block', sm: 'none' } }} />

// Desktop only
<Paper sx={{ display: { xs: 'none', sm: 'block' } }} />
```

With the next PR in this series, you can also use new utility classes:

```tsx
<Paper className="mobile-only" />
<Paper className="desktop-only" />
```

or even our new DS component, `<Visible>`:

```tsx
<Visible mobile>
    <Paper />
</Visible>
```

**But** remember that your component's code will still execute. It will be hidden with `display: none`, but any effects inside of it (e.g. fetching data, tracking events, mutations) will still occur.

### How to **avoid rendering content**, and executing code, based on screen size?

There are two ways: the new `whenMobile()`/`whenDesktop()` functions, or the new `isReady` boolean.

#### `whenMobile` and `whenDesktop`

These functions take a callback that is only executed when the media query has been matched. (This means they won't render anything the first time, so be sure that makes sense for your component in an SSR situation.)

This example will render a `<Box>` on mobile or a `<Row>` on desktop:

```tsx
const { whenDesktop, whenMobile } = useMediaQueries()

const cards = calendarEntries.map((calendarEntry) => <PopularWithFriendsEventCard calendarEntry={calendarEntry} />)

return (
    <Box>
        {whenMobile(() => (
            <Box sx={{ mb: 3 }}>{cards}</Box>
        ))}
        {whenDesktop(() => (
            <Row>{cards}</Row>
        ))}
    </Box>
)
```

#### `isReady`

To wait for `useMediaQueries` to give you accurate values before proceeding, you can use the new boolean `isReady`. For example:

```tsx
const { isReady, isMobile } = useMediaQueries()

// This means that the hook hasn't given us 'real' values yet, so use an early return
if (!isReady) {
    return <Skeleton />
}

return (
    <div>
        {isMobile ? <TinyThumbnails /> : <LargeThumbnails />}
    </div>
)
```

A slightly more semantic alternative is to move the contents to another component and only render when the relevant boolean is `true`:

```tsx
const { isMobile, isDesktop } = useMediaQueries()

if (isMobile) {
    return <TinyThumbnails />
}

if (isDesktop) {
    return <LargeThumbnails />
}

return <Skeleton /> // or null
```

But keep in mind that in the future when we move to SSR this will produce HTML containing only the skeleton. If this code represents a page, then the user would need to wait for a second round of network requests before seeing any data, and it would be bad for SEO.

# Solution

* Reinstated [MUI's `useMediaQuery` hook](https://mui.com/material-ui/react-use-media-query/)
* Added additional return values to our `useMediaQueries` hook: `isReady`, `whenDesktop`, `whenMobile`
* Created a new component to replace [the deprecated `<Hidden>`](https://mui.com/material-ui/migration/v5-component-changes/#hidden) but make its shortcomings clear. (Coming with #3961.)

## What will change with this PR

Up until now, `useMediaQueries` would return `isMobile = true` from the very first render on a mobile device. With this PR, the first render will always produce `isMobile = false`, but later re-renders will get `isMobile = true`.

This means that components that follow the pattern "if mobile, display `foo`, otherwise display `bar`" will now show `bar` briefly before switching to `foo`. This is not desirable, so a subsequent PR in this series will implement `whenMobile()` and `whenDesktop()` throughout the repo to ensure this doesn't happen. 

One side effect of this is that some components will now show nothing for the first render. This is likely imperceptible to the user, and only affects the very first page visited by the user.

Consider this example:

```tsx
return (
    <>
        <Alpha />
        {isMobile ? <Bravo /> : <Charlie />}
    </>
)
```

Under the old system, this would always render `Alpha` and `Bravo` on a mobile device. With the new system, the first render will be only `Alpha`, and then subsequent re-renders will be `Alpha` and `Bravo`. Again, there will only be a couple hundred milliseconds where `Bravo` is not rendered, so the effect is minimal.

---

Requirements for this PR series, from INTETRIS-1881 and INTETRIS-1882:

- [x] ~~The values never change. If it says `isMobile` is `false`, then it will continue to be `false` on every single render (assuming you don't resize the browser).~~
    * Turns out this is simply impossible in the modern React world because client rendering and server rendering will always be different
- [x] Always boolean values, no more `undefined`
- [x] Values are defined from the very first render
    * ...**BUT** they are still `false` at first, which is unavoidable
- [x] ~~`isMobile` and `isDesktop` always have opposite values (e.g. they can never be `false` at the same time)~~
    * Not possible, see above
- [x] No more React hydration errors
    * This is resolved in #3965 because the errors are coming from the navigation. (You'll still see the errors on this branch.)
- [x] ~~Tests~~ 
    * It does not appear to be possible to test components against different media queries with Jest because of shortcomings with jsdom. Instead, we'll have to rely on Percy visual regression tests, snapshots, and acceptance tests.
    * Existing tests are fixed in #3965
- [x] Navigation should not jump around (i.e. number of items should be consistent between every render)
    * Resolved in #3965
- [x] Messenger should not have problems (e.g. should not auto-select a conversation on mobile)

---

This PR is 1 of 4 in a series: **3949** • #3961 • #3965 • #3996
