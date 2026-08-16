---
title: 'Enhanced router (1/8) New hook useINRouter()'
prNumber: 7070
date: '2024-04-12'
kind: 'Deprecation guidance'
standfirst: 'Introducing a routing hook across an eight-pull-request series.'
order: 11
author: 'patik'
state: 'merged'
baseBranch: 'deploy/2024-04-23'
headBranch: 'dev/enhanced-router--1--new-hook'
additions: 666
deletions: 747
changedFiles: 94
reviewCount: 4
---

This is the first PR in a series. All changes in this series go together conceptually, but the changes have been separated into smaller chunks to make them easier to review.

The tests may not pass in most PRs, but they will pass in the last one (because the tests will run against the cumulative changes).

<details>
<summary>Enhanced Router PRs</summary>
<p>This is part of a series of PRs on referential stability which are meant to be reviewed in the following order:</p>

1. Adding the new hook PR #7070
2. Applying the new hook in common app files PR #7071
3. Applying new hook to simple use cases PR #7072
4. Remove useRouteNavigation PR #7073
5. Remove useRouteNavigation PR #7074
6. Remove useRouteNavigation PR #7075
7. Remove useRouteNavigation PR #7076
8. Remove useRouteNavigation PR #7077
</details>

---

# Description

Next's `useRouter()` hook is not referentially stable. This means that many of our components which call `useRouter` will re-render when they don't need to (i.e. when there's no new data to receive from `useRouter`).

Also, we've been running into problems with circular dependencies related to the Route classes `go` method. And arguably, this method doesn't belong in the class because it's a function of navigation, rather than a particular 'quality' of the route instance.

Lastly, we have several different hooks related to routing—`useRouter`, `useRouteNavigation`, `useCurrentRoute`, etc—and it would be nice to bring all those together into one cohesive hook.

# What's changing

All the route related stuff is now rolled into one hook:

* All `NextRouter` values and functions 
* `currentRoute`
* `go()` for navigating to routes

```tsx
const { go, currentRoute, asPath, pathname, query, isReady, push, replace, ... } = useINRouter()
        ^^  ^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        |        |                    |  
        |        |                    ⌞ all values/functions from Next's `useRouter` are passed through
        |        |
        |        ⌞ the `TRoute` for the current page
        |
        ⌞ navigates to routes (replacement for `route.go()`)
```

## Usage

These changes are **mandatory** and must be used from now on:

* Instead of `route.go()`, use `go(route)`
* No more `routeNav` or `useRouteNavigation`

These changes are **optional**:

* Instead of `useRouter()`, call `useINRouter()`
    * `useINRouter()` is preferred, but there are some places where we cannot use it (e.g. outside of some providers)
* Instead of `useCurrentRoute()`, get the same value from `useINRouter()`
    * This depends on whether you need the other values returned by `useINRouter` in the same component. If you do need them, then you might as well get everything from one hook call: `const { currentRoute, asPath, query } = useINRouter()`. But if all you need is `currentRoute`, then it's fine to just call `useCurrentRoute`.

### Before

```tsx
import { myRoute } from '@routes/catalog'
import { useCurrentRoute } from '@data/store/slices/route/getters'
import { useRouteNavigation } from '@routes/utils/useRouteNavigation'
import { useRouter } from 'next/router'

function Component() {
    const currentRoute = useCurrentRoute()
    const { asPath, query } = useRouter()
    const routeNav = useRouteNavigation()
    const onClick = () => myRoute.go(routeNav)

    // ...
}
```

### After

```tsx
import { myRoute } from '@routes/catalog'
import { useINRouter } from '@routes/utils/useINRouter'

function Component() {
    // Now, `go` and `currentRoute` come from the same hook as the rest of the `useRouter` values
    const { currentRoute, go, asPath, query } = useINRouter()
    const onClick = () => go(myRoute)

    // ...
}
```

# Deprecating useRouteNavigation

_tl;dr: Times have changed, we no longer need it_

`useRouteNavigation` was created as a way to provide routes with some information that was only available in a React scope. For example, `route.go()` needs access to `NextRouter` and the `QueryClient` to make decisions about how it will navigate. 

Back when it was created, we didn't have a way to share this information with `TRoute` objects. Nowadays we have a global store that can do this. Also, at that time, importing `NextRouter` into the `Route.ts` class file seemed to break Jest, but now it seems to work fine. Perhaps something changed with either Next or Jest in the last couple of years.

Most importantly, there are drawbacks to `useRouteNavigation`:

* It can cause components to re-render even when the component itself has nothing new to display
* Sometimes we need to call `.go` outside of a React scope, which means we need to prop-drill or pass `routeNav` around a lot

After these PRs, you can navigate to a route just by calling `route.go()` with no arguments.
