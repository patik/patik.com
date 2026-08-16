---
title: 'INGIANA-252 Remove Realms and Pages Router'
prNumber: 10001
date: '2025-05-19'
kind: 'Adoption guide'
standfirst: 'Deleting a home-grown abstraction, and documenting what replaces it.'
order: 10
---

**_ℹ️ This PR is huge. Too big, even. We can review it together on Tuesday 2 June in the Dojo._** Until then, you can check out the description.

---

## Description

Pour one out for realms 🪦

And no more Pages Router—all of our screens are now in App Router 🎉 

> **Tip**
>
> Deployed to an internal staging deployment

## 1. Router hooks

### 1.1 `useINRouter` deprecated

See next section about what to use instead.

### 1.2 When to use `useINAppRouter` vs Next's `usePathname` and `useSearchParams`

`useINAppRouter` combines the return values of `useRouter`, `usePathname`, and `useSearchParams` with our own `go()` function. It also served as  

However, if _any_ of the Next hooks have an internal change, `useINAppRouter` will trigger a re-render of the component. In many cases this is not be necessary or desirable.

**If your component only needs `pathname` and/or `searchParams`, it's now preferable to use `usePathname` and `useSearchParams` instead.** That way your component will only re-render if the pathname or searchParams change.

```tsx
// ⚠️ Avoid
const { pathname } = useINAppRouter()
// ✅ Better
const pathname = usePathname()

// ⚠️ Avoid
const { pathname, searchParams } = useINAppRouter()
// ✅ Better
const pathname = usePathname()
const searchParams = useSearchParams()
```

> **Note**
>
> What if we need `pathname` and `go` (or `push` or `replace`)?
>
>     const { go, pathname } = useINAppRouter()
> 
> In this case you might as well leave it like that. `useINAppRouter` will trigger a re-render for changes to `pathname` anyway, even if you are getting `pathname` from `usePathname`. So calling one hook is probably better than calling two.
> 
> I'm considering removing `pathname` and `searchParams` from `useINAppRouter`. **What do you think?**

### ~~1.3 Return type changes~~

~~In the past, Next's hooks could return `null`:~~

```tsx
pathname: string | null
searchParams: ReadonlyURLSearchParams | null
```

~~This led us to putting lots of little truthy checks and optional chains in our code:~~

```tsx
const thing1 = pathname && pathname.includes('...') ? foo : bar
const thing2 = searchParams?.get('foo')
```

~~The hooks no longer return `null`. I've updated `useINAppRouter` to reflect this. I also cleaned up a bunch of those truthy checks throughout our codebase.~~

Although this information is true, we sadly cannot make use of it yet. When you run `yarn build`, Next adds the CompatRouter types to its generated type file. This makes the IDE linter complain that the values may be `null`. Even though [the docs](https://nextjs.org/docs/app/api-reference/functions/use-pathname) say this shouldn't happen without Pages Router in the picture, better safe than sorry.

## 3. Tests 
    
### 3.1. Deprecated `appRouter: true`

Now, all tests are wrapped in the App Router root layout and providers.

> **Tip**
>
> Most changes in this PR are just removing this option.
>
> ![CleanShot 2025-05-26 at 07 19 02@2x](/portfolio/pull-requests/removing-realms-and-pages-router/01.webp)

### 3.2. `render()` no longer supports the `realm` option

`render(..., { realm: '...' })` is no longer possible

If you're testing a component that can be run anywhere, this option can be safely dropped. 

If the test only runs within one route group, either pass the route group's layout using the `wrapper` option, or use `usePathnameMock.mockReturnValue()` if you need to set the URL.

### 3.3. `render()` no longer supports the `router` option

i.e. for setting the URL. Instead, continue using `usePathnameMock.mockReturnValue()`.

### 3.4. Unskipped all skipped tests

I revisited all of the tests using `test.skip` and fixed them. Except for one, in `frontend/tracking/usePageViewsTracking.test.tsx`, which doesn't seem to work properly on the CI, but will now run locally.

## 4. Removed `*-Legacy` components and hooks

e.g. dialog and paywall providers, many others. We named them with `*Legacy` to denote which ones were meant for Pages Router. Replacement components were already in use (i.e. instead of `FooLegacy`, use `Foo`).

## 5. Realm checks

### 5.1 Removed checks for `Checkout` realm

e.g. `isCheckout()`. We shouldn't need this anymore for 99% of cases because our code should be structured in a way that we can avoid it.

<img alt="" width="420" src="/portfolio/pull-requests/removing-realms-and-pages-router/02.webp">

> **Note**
>
> Exception: `frontend/data/api/api.ts`

### 5.2 Removed many checks for `MandatoryRegistration` realm

e.g. `isMandatoryRegistration()`. We shouldn't need this anymore for 90% of cases because our code should be structured in a way that we can avoid it. Please only use it as a last resort.

## 6. No more `<NavTabs>`

Continue using `<RouteTabs>` instead

## 7. DS: removed `Tab` customizations

They were only used for `<NavTabs>`. Now, just use tabs the MUI way: https://mui.com/material-ui/react-tabs/#experimental-api

---

INGIANA-252

Blocks #10057
