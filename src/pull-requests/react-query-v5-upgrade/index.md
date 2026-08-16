---
title: 'Upgrade react-query to v5'
prNumber: 6663
date: '2024-02-27'
kind: 'Migration guide'
standfirst: 'A library major-version bump with every trap mapped in advance.'
order: 4
author: 'patik'
state: 'merged'
baseBranch: 'deploy/2024-03-21'
headBranch: 'dev/react-query-5'
additions: 3328
deletions: 2567
changedFiles: 386
reviewCount: 0
---

# React Query v5 Upgrade

Video walkthrough of these notes: (internal recording, not included here)

* Migration docs: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5
* Rationale behind the breaking changes: https://github.com/TanStack/query/discussions/4252
* Explanation of the `onSuccess`/`onError` deprecation: https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose

## How we use query hooks

`react-query` provides hooks like `useQuery`, `useInfiniteQuery`, and `useMutation`

We create our own "data hooks" that wrap around these library hooks. We normally don't call the library hooks directly.

Our goals:

* One data hook per API endpoint
* Ensure consistency around the **query function** and **query key**
	* re: query function—ensure that we use the correct endpoint URL and pass the right parameters
	* re: query key—ensure that the library can cache our data in an efficient way, and so that we know where to find the cached data if we need to retrieve it or mutate it

For example, we have a bunch of hooks that store member data. Imagine if they had query keys named "member", "members", "users", etc, instead of all rallying around a single, consistent key.

## Function signature

`useQuery` now only supports one function signature. No more overloads.

Why?

> The `useQuery.ts` file has 140 lines of code - only 3 of which are actual JavaScript.
https://github.com/TanStack/query/discussions/4252

### useQuery arguments are now just one object

```tsx
// Before
useQuery(queryKey, queryFn, options)

// After
useQuery({
    queryKey,
    queryFn,
    ...options
})
```

### Same with mutations

```tsx
// Before
useMutation(mutationFn, options)

// After
useQuery({
    mutationFn,
    ...options
})
```

### Beware spreading objects

What's the difference between these two calls?

```tsx
useQuery({
    queryKey,
    queryFn,
    ...options
})

useQuery({
    ...options,
    queryKey,
    queryFn,
})
```

Keep in mind that `options` now includes the query key and query function!

We've been using `options` as an object that contains all the *other* stuff, besides the query key & query function. But the whole point of our query hooks is to make sure the key and function are consistent. Therefore, let's continue using `options` *only* for the other stuff.

This means the type usually needs to be changed:

```tsx
// Before
function useMyHook(
    requestArgs: RequestArgs,
    options: UseQueryOptions
) {
    return useQuery(/* ... */)
}

// After
function useMyHook(
    requestArgs: RequestArgs,
    options: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
) {
    return useQuery(/* ... */)
}
```

### Be mindful of options we *do* want to override

Those should still go *above* `...options`:

```tsx
useQuery({
    staleTime: 5 * 60 * 1000,
    ...options,
    queryKey,
    queryFn,
})

useMutation({
    onMutate: () => { /* ... */ },
    ...options,
    mutationFn,
})
```

### BugWatch!

Moving `...options` to the top could uncover some subtle bugs that we've had all along where someone passed in a custom queryKey or queryFn. 

If problems occur, try debugging by moving `...options` to the bottom of the list and see if it "fixes" the issue.

```tsx
useQuery({
    ...options,
    queryKey,
    queryFn,
})

useMutation({
    ...options,
    mutationFn,
})
```

## useInfinityQuery pageParam

*Recall that we have our own `useInfiniteQuery` that wraps around the third-party library's hook.*

You've probably never thought about `pageParam` 😅 (I sure hadn't). It's what `useInfiniteQuery` uses to fetch the next page of data.

#### Recap

For offset-paginated data, `pageParam` is a number—the index of the first piece of data.

Assuming you're fetching 10 things at a time:
* First page: `pageParam = 0`
* Second page: `pageParam = 10`
* Third page: `pageParam = 20`

For cursor-paginated data, it's a number of string that the backend gives us.

But all of this is handled for you automatically by our custom `useInfiniteQuery`, so you don't need to pass it.

#### Why you might care about the pageParam

For TypeScript reasons.

The library now types the `pageParam` as `unknown`, which means we need to explicitly set the type when using generics in some cases.

![CleanShot 2024-03-10 at 17 54 13@2x](/portfolio/pull-requests/react-query-v5-upgrade/01.webp)

Hovering over `QueryFunctionContext`, we see it takes another generic, `TPageParam`:

![CleanShot 2024-03-10 at 17 54 59@2x](/portfolio/pull-requests/react-query-v5-upgrade/02.webp)

The solution is to assign `number` to that param:

![CleanShot 2024-03-10 at 17 56 36@2x](/portfolio/pull-requests/react-query-v5-upgrade/03.webp)

## Disabling queries until some param is defined

We have a common pattern in our code where we need some ID before we can fetch data, but the ID might be temporarily undefined. Of course, we don't want the query hook to actually fetch anything until the ID has been resolved.

![CleanShot 2024-03-10 at 18 07 40@2x](/portfolio/pull-requests/react-query-v5-upgrade/04.webp)

Our current solution:

1. Allow the request creator to receive `undefined`
2. Use the `enabled` flag to prevent the request from actually firing
3. Cross our fingers and hope that these two pieces of code remain in harmony forever and ever

![CleanShot 2024-03-10 at 18 11 55@2x](/portfolio/pull-requests/react-query-v5-upgrade/05.webp)

Even worse, what if our hook also accepts options? We need to make sure that our `enabled` doesn't clobber the `enabled` value that someone might pass in:

![CleanShot 2024-03-10 at 18 18 37@2x](/portfolio/pull-requests/react-query-v5-upgrade/06.webp)

This works, but it could be better.

1. Nearly every developer has had trouble when they first encountered the expression `options?.enabled !== false`
2. We mention `options` twice
3. Our request creator should not accept `undefined`

Solution: use RQ's `skipToken`, which tells RQ to disable the `queryFn` in that case:

![CleanShot 2024-03-10 at 18 20 20@2x](/portfolio/pull-requests/react-query-v5-upgrade/07.webp)

Keep in mind that `skipToken` does **not** work when we use `enabled: false` and manually fetch queries:

```tsx
const { refetch } = useQuery({
    queryKey,
    // Throws a runtime error!
    queryFn: id ? () => requester(doStuff(id)) : skipToken,
    enabled: false,
})
```

## 'Loading' is now 'Pending'. Or is it?

### useQuery & useInfiniteQuery

The variable `isLoading` has changed its name:

| Version 4          | Version 5   | What it means                                                  |
| ------------------ | ----------- | -------------------------------------------------------------- |
| `isLoading`        | `isPending` | "there's no cached data and no query attempt was finished yet" |
| `isInitialLoading` | `isLoading` | "is `true` whenever the first fetch for a query is in-flight"  |

Confusingly, there is still an `isLoading`, but its meaning has changed 😅 

[Docs](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)

#### Timeline

![CleanShot 2024-03-11 at 22 04 01@2x](/portfolio/pull-requests/react-query-v5-upgrade/08.webp)

1. `isPending` is true. `isLoading` is false. Nothing is happening on the network.
2. Network request begins. `isPending` remains true. `isLoading` now becomes true.
3. Network request finishes. `isPending` becomes false. `isLoading` becomes false.

#### What to change?

I think we should switch from `isLoading` to `isPending`. 

Reasons:

1. Our components are already organized around showing a skeleton until data is ready. We can use `isPending === true` to determine this. We cannot continue using `isLoading` in this way because it will be `false` at first.
2. Type safety. `data` becomes defined when `isPending` is no longer true. This means that when we do `if (isPending) { return }`, TypeScript will know that after the return `data` is defined so we don't need to do a `Boolean(data)` check before accessing it.


```tsx
/**
 * Does not work
*/
const { data, isLoading } = useQuery<string>(...)

if (isLoading) {
    return
}

data.toLowercase()
// Error: data might be undefined


/**
 * Works
*/
const { data, isPending } = useQuery<string>(...)

if (isPending) {
    return
}

data.toLowercase()
// No error, data is guaranteed to be defined
```


Since I think we may discuss the topic of `isLoading`/`isPending` a bit, these changes will go into a separate PR.

---

### useMutation

The change is more straightforward:

| Version 4 | Version 5 | What it means                                               |
| --------- | --------- | ----------------------------------------------------------- |
| isLoading | isPending | We're waiting for a POST/PUT/PATCH/DELETE request to finish |

This change is required, so I'm updating it in this PR.

---

# onSuccess & onError are deprecated

Only deprecated for useQuery & useInfiniteQuery. Still available for useMutation.

## Why? I need those!

We don't really need them, and they can cause/encourage bugs: https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose

## Error handling

Status quo:

* Create a default error handler that's defined when we setup the query provider
* Override this on a per-hook basis by defining an `onError` callback
	* Use cases:
		* Silencing the default error snackbar
		* Ignoring some types of errors (e.g. sometimes it's okay to receive a 404)

## New option: meta.silenceErrors

```tsx
// Simple use case: always silence the default snackbar
useQuery({
    meta: {
        silenceErrors: true
    }
})

// Nuanced logic
useQuery({
    meta: {
        silenceErrors(error) {
            if (error.status === 404) {
                // Silence it
                return true
            }
            
            // Don't silence it
            return false // or undefined
        }
    }
})
```

Note: This applies only to `useQuery` & `useInfiniteQuery`. It does **not** work for `useMutation`. Mutations should use the `onError` handler.

### Custom error message text

You can define custom text to appear in the default error snackbar:

```tsx
useQuery({
    meta: {
        errorMessage: 'My custom text'
    }
})
```

Again, does not work for `useMutation`.

### BugWatch!

We now log *all* errors, whereas before we sometimes completely ignored them. We might find some issues in our logs that were happening before, but were always silenced.

# Other changes

* `cacheTime` has been renamed to `gcTime` ("garbage collection"). No change in functionality.
* A bunch of `queryClient.xxxx` methods now require the object syntax
	* ![CleanShot 2024-03-10 at 19 12 59@2x](/portfolio/pull-requests/react-query-v5-upgrade/09.webp)
* Added an ESLint plugin `@tanstack/eslint-plugin-query`
* No more custom logger
	* We were using this in a couple tests to silence the errors—we can now do that by mocking `logError` or `console.error` directly

# New features

https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5#new-features-

None of these have been implemented yet

* Simplified optimistic updates
* `maxPages` for infinite queries
* and more
