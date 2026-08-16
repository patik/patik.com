---
title: 'SPA global store with Zustand'
prNumber: 2569
date: '2022-11-30'
kind: 'Architecture proposal'
standfirst: 'Introducing a global store to a large single-page app, argued from first principles.'
order: 1
author: 'patik'
state: 'merged'
baseBranch: 'deploy/2023-10-05'
headBranch: 'dev/INTETRIS-1727--zustand'
additions: 1389
deletions: 560
changedFiles: 64
reviewCount: 13
---

Uses [Zustand](https://github.com/pmndrs/zustand) for a lightweight global store

# Motivation & Goals

- Would allow us to read and update some global data and preloaded data
    - Not a replacement for react-query
- We could stop using `UNSAFE_*` functions and data
- We can make `currentUser` more accessible, e.g. outside of React contexts
- Use cases:
    - Impersonation status (can easily become stale)
        - Messenger needs it to avoid bugs around marking messages as read
        - Navigation menu items
        - Avoid overwriting push notification token or assigning the token to the wrong user in our backend
    - Things that live outside our API
        - Flash messages
        - Third party scripts (New Relic, Tag Manager, ads, etc)
    - Registration Community Explorer doesn't need to use unsafe current user from HTML
    - When data is needed outside the React scope; reading it from the HTML-extracted data means it could be stale
        - Container app
            - needs current user for some logging (e.g. when the app writes pending transactions to local storage it calls an SPA function directly)
        - Correlation ID
        - Browsing time zone
            - Use in API headers; also for calendar entry and group activities API calls

# General info on Zustand

- [Intro/docs](https://github.com/pmndrs/zustand/tree/main#readme)
- [Blog post: best practices](https://tkdodo.eu/blog/working-with-zustand)
- [Blog post: dos and don'ts](https://medium.com/@nfailla93/zustand-in-react-dos-and-donts-5a608c26c68)

# How it works in the SPA

In short, all data injected into the page by Symfony is parsed and fed into Zustand, which makes it available across the app. The Zustand store is used to populate some initial data for the query cache.

## Slices

Status quo: All of our stuff that is injected by Symfony is in one big blob called `InterNationsData`

After this PR: The one big blob is spit up into two [slices](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md). This keeps unrelated parts of the state in their own files/folders. It also allows us to initialize them and organize them separately.

The slices I'm proposing we use:

- `currentUser`
- `unsyncedData` (i.e. everything else)

None of these slices needs to know anything about the others. In the end, all of the slices are **merged into one big store** that is used by the outside world.

## How Symfony passes the data to the SPA

There used to be one `<script>` element that would receive all of the data from Symfony. Now there are three—one for each slice. This allows each slice to initialize itself independently which keeps the code more organized.

The injected data is used to _immediately populate the store **as it is being created**_, so anyone who calls the store (at anytime, from anywhere) will have access to the injected data. This is no more need to "wait for the data to mount" before using it, as we had in the past.

## How the store is initialized

All of the stuff in `frontend/data/global.ts` that was concerned with extracting data from the Symfony-injected `<script>` has moved to `frontend/store/slices/**/index.ts`. We use the slices to create the **store**, and the complete store is then exported.

## Accessing the store

Generally, one should not read _directly_ from the store. The best practice is to create a hook or function that will return just the part of state that you need. Then your component will only re-render when that specific part of the state changes.

For example, the hook that returns the currentUser from state looks like this:

```tsx
export function useStoredCurrentUserData(): TCurrentUser | undefined {
    //     ꜜꜜꜜꜜꜜꜜꜜꜜ global store hook
    return useStore((state) => state.data.currentUser)
    //              ꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛꜛ selector for just the piece that we need
}
```

## Current user

One of the main improvements that was expected from a global store was to make current user more available. Here's how it will work.

### Data lifecycle

![Flowchart showing the direction of data flow from Symfony to Zustand to the current user slice and onward to the components](/portfolio/pull-requests/spa-global-store-with-zustand/01.svg)

#### Prod/stage/dev (Symfony-backed environments)

On the initial page load, the Symfony injected data is extracted when the store is created. The current user data is immediately available to anyone who needs it, in any scope/context (i.e. regardless of whether it's a React component or if the `<QueryProvider>` is in place, etc).

Whenever `useCurrentUser` is called, react-query may decide to refresh this data (usually once every 5 minutes). More on this later.

#### `localhost` and `test` environments

Since there is no Symfony-injected data in these environments, getting the current user from the store will result in `undefined`. One must first call `useCurrentUser` so that react-query can fetch the data. (Since the hook is so widely used throughout our app, this is rarely something you need to worry about, but just keep it in mind.) After that, the store will be populated with the same data that comes from the query hook.

### Usage

There are three ways to get the current user data. This list is sorted by preference, and devs should aim to _use the highest item from the list_ that they can in their situation.

#### React component within the `<QueryClientProvider>`

The existing `useCurrentUser` hook can continue to be used in any React component that's inside the `QueryClientProvider` (i.e. any component in the SPA, including most of Registration). The API is the same as before:

```tsx
const { data: currentUser } = useCurrentUser()
```

##### Benefits

- react-query will automatically keep the data fresh (usually once every 5 minutes)
- access to other query hook return values (`isLoading`, etc)
- you component will automatically re-render when the data is updated

#### React component without `<QueryClientProvider>`

When your component is not wrapped in the `QueryClientProvider`, you can use this new hook:

```tsx
import { useStoredCurrentUserData } from '@data/store/slices/currentUser/getters'

const currentUser = useStoredCurrentUserData()
```

##### Benefits

- you component will automatically re-render when the data is updated

##### Drawbacks

- react-query will **not** automatically keep the data fresh. You'll have to rely on some other component in the app to occasionally call `useCurrentUser`.
- no access to other query hook return values (`isLoading`, etc)

#### Non-React code

When you need to get the current user outside a React scope (and without the `<QueryClientProvider>`), you can use this new function:

```tsx
import { getCurrentUser } from '@data/store/slices/currentUser/getters'

const currentUser = getCurrentUser()
```

##### Drawbacks

- you code will **not** automatically get fresh values when the data is updated
- react-query will **not** automatically keep the data fresh. You'll have to rely on some other component in the app to occasionally call `useCurrentUser`.
- no access to other query hook return values (`isLoading`, etc)

### Returned data

The `useCurrentUser` hook will return **the stored data** along with the other properties that come with query results (`isLoading`, etc). This means the hook will 'always' return the current user data, except in `localhost` and `test` environments, when it will return `data: undefined` until the query hook has fetched the data the first time.

`useCurrentUser` will internally call `useQuery` to check for fresh data from the backend. When the data changes, `useCurrentUser` will update the store. However, it will immediately return the (stale) store data, then it will re-render to get the new value from the store. This means that every time the backend gives us new data, all components that call `useCurrentUser` will re-render twice. I tried to work around this, but all the solutions I found either involved large refactors of our components or necessitated complicated behavior of the hook which would make it harder to debug.

#### Why not have `useCurrentUser` always return the query data (instead of the stored data)?

Keep in mind that non-React code cannot call `useCurrentUser`.

We want all of our code to receive the same current user data, whether they are accessing it from within a React scope or not. If `useCurrentUser` were to return the query data, then it's possible that it might return different data than `getCurrentUser` would, depending on the exact timing of when they're called. Remember that `useCurrentUser` will update the store as soon as it receives new query data.

#### Why shouldn't components just always call the store?

In general, when looking for data, one should reach as close as possible for the single source of truth. In our case, the query cache is our single source of truth.

If everyone calls the store, then no one will be calling the query hook to have it update the store with fresh data from the backend.

#### Can we periodically refresh the data in the background?

Sort of. In React there's no such thing as "keep this code running in the background", e.g. use a `setInterval` to poll for fresh data. But we can expect that route changes will happen with some regularity during normal usage of the app.

With that in mind, I added a hook `useAutoRefreshCurrentUserStoreFromBackend`. This hook will watch for route changes, and if the data has become stale, it will tell react-query to refetch. This should suffice for 99% of real-world usage. I'm hoping that the other 1% is handled indirectly by other mechanisms, e.g. the way that react-query refetches when the browser window regains focus, or by some other component re-rendering and calling `useCurrentUser` again.

## Unsynced data

Here is how the other data is made available

![Flowchart showing the direction of data flow from Symfony to Zustand to the unsynced data slice and onward to the components](/portfolio/pull-requests/spa-global-store-with-zustand/02.svg)

## Testing

The global store primarily deals with the data that is injected by Symfony. Most of our tests run in a similar way to `localhost`—without Symfony-injected data in the HTML, and with the presumption that data will be fetched via API calls. Therefore, the vast majority of tests are unaffected by Zustand.

For the tests that do read from the global store, Zustand needs to be mocked. This is already done in the PR. For basic usage, one may access the store as usual (example: `AppPaywallDialog.ios.test.tsx`. Of course, the store will only contain placeholder data (e.g. the timezone is always Europe/Berlin, `isImpersonated` is always `false`, etc).

### Testing the initialization of the store

When the store initializes, it expects that the HTML already contains some `<script>` tags to be filled in with data. This means the `<script>` tags must be in the underlying HTML upon which the tests run. This HTML is configured via JSDOM. However, as far as I can tell, the only way to prepare this HTML is via the Jest config, and there is no way to alter it once it's running (e.g. to have tests with different current users baked into the HTML). We don't want to modify the HTML for all SPA tests, otherwise the tests will 1. all consume the same data (e.g. the same current user), and 2. run in an environment that doesn't match `localhost`, which could lead to inconsistent behavior over time.

In order to test the store initialization, I created a separate Jest config, `frontend/jest.symfony-html.config.js`. This config extends the standard config but adds in the JSDOM configuration. Unfortunately the test values are static, so we cannot test it with, for example, several different current users. But at least it's something.

The test group `symfonyHTML` will use this config. This keeps it separated from the other tests. Locally, it can be run via `yarn --cwd frontend test:html`. On the CI, it will run with the standard test command.

## Other changes

The concept of `isMounted` is no longer relevant. The store is always "mounted" in the sense that it is defined and contains the "best" data that is available. For example, it's no longer possible to access the store after it's been created but before the Symfony-injected data has been added to it.

That said, in `localhost` and `dev` environments, there is no Symfony injection, so the "best" data we can put in the store is placeholder data. For this reason, there is a new boolean prop `wasPrepopulated: boolean` that indicates whether the Symfony injection happened or not. If your component sees that this is `false`, then it should be doing something to fetch the data it needs.

## Net changes in capability

| Store slice     | Capability                | Status quo | After this PR |
| --------------- | ------------------------- | ---------- | ------------- |
| 'Unsynced' data | Readable outside of React | ✅         | ✅            |
|                 | Writeable                 | 🚫         | ✅            |
|                 | Synced with API           | n/a        | n/a           |
|                 |                           |            |               |
| Current user    | Readable outside of React | 🚫         | ✅            |
|                 | Writeable                 | ✅         | ✅            |
|                 | Synced with API           | 🚫         | ✅            |
