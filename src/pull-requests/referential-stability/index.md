---
title: 'Referential stability 1/5: useExperiment'
prNumber: 6927
date: '2024-03-24'
kind: 'Concept primer'
standfirst: 'Teaching a subtle React concept before asking anyone to apply it.'
order: 7
---

<details>
<summary>Referential stability PRs</summary>
<p>This is part of a series of PRs on referential stability which are meant to be reviewed in the following order:</p>

1. useExperiment PR #6927
2. useDialog PR #6928
3. Navigation PR #6930
4. Global files PR #6929
5. PXT-specific
    * Tetris: PR #6935
    * Pokemon: PR #6936
    * Rings: PR #6937
</details>

---

## Overview of changes

* Improves memoization within `useExperiment` and makes its return value referentially stable
* `useDiff`: new debugging tool for testing changes between renders
* `useStableReference`: new convenience wrapper for `useRef`

## Crash course in "referential stability"

_See also this [more in-depth guide](https://dev.to/vicnovais/understanding-referential-equality-in-reacts-useeffect-2m7o)_

Consider this example:

```tsx
const foo = getSomeString()

useEffect(() => {
    // do something with foo
}, [foo])
```

The `useEffect` will only run when `foo` gets a different value. So if it's "hello" in the first render and "hello" in the second render, `useEffect` will not re-run. This is because strings are **primitive values**.

But this changes when we use an object or array as a dependency:

```tsx
const foo = {}

useEffect(() => {
    // do something with foo
}, [foo])
```

In this case `useEffect` will re-run every single time, even though `foo` is always assigned the "same" value. This is because the expression `const foo` creates a new variable in memory. The `foo` from the first render is located in a different part of memory than the `foo` from the second render. When React evaluates the dependencies of `useEffect`, it considers `foo` to have changed if it's pointed to a **different place in memory**.

[<img src="/portfolio/pull-requests/referential-stability/01.webp" alt="" width="400"/>](https://dev.to/vicnovais/understanding-referential-equality-in-reacts-useeffect-2m7o)

To get around this, we can take care to ensure that our objects and arrays are always stored in the same part of memory.

```tsx
const foo = {}

function Component() {
    const bar = useMemo(() => ({}), [])

    useEffect(() => {
        // do something with foo and bar
    }, [foo, bar])
}
```

The `useEffect` above will only run once. `foo` is **referentially stable** because it's outside of a component and will be defined only once when the file is first imported. `bar` is **referentially stable** because `useMemo` will always give us back a value that points to the same place in memory. We can also do this with `useCallback`.

Why bother with this? If `foo` is _not_ referentially stable, and our component is rendered 1,000,000 times, we would have 1,000,000 copies of `foo` in memory. If it _is_ referentially stable, then we only have 1 `foo` in memory. So we get lower memory usage and fewer re-renders—and those are both critical problems with the SPA at the moment.

## `useExperiment`

This hook is used a _lot_ in our app. And most of the time, the actual values—the user's segment for each experiment—doesn't actually change after the initial load. It also has a lot more internal logic than most query hooks, e.g. to create convenience booleans for the segments. This makes it a good candidate for optimization.

I had these goals in mind while working on it:

* Ensure that dependency arrays for `useMemo`, `useEffect`, etc only contain primitive values and referentially stable objects/arrays
* Ensure the final return value is referentially stable
* Consolidate the logic around the `options` object into one place

## `useDiff`

`useDiff` is a hook that can be used during development to check if a value is referentially stable. You can pass it a value and it will log to the console on each render to tell you if the value is stable. If it's not, the hook will tell you what changed.

```tsx
useDiff("display name", myValue)
```

![CleanShot 2024-03-24 at 17 53 13](/portfolio/pull-requests/referential-stability/02.webp)

## `useStableReference`

This is a convenience wrapper around `useRef` that creates a fixed reference for an arbitrary value. It's useful in places where we want to have a stable reference but cannot create one, e.g. if a library always returns a new object.

```tsx
const unstableQueryResult = useQuery(...)
const stableResult = useStableReference(unstableQueryResult)
```

### Proof of concept

I made a demo page to test this out. Specifically, it shows that the return value from `useExperiment` is stable, however the visual components continue to update with new data.

Click on a video to zoom in, pause, etc

| Before | After |
|--------|--------|
| [![output](/portfolio/pull-requests/referential-stability/03.webp)](an internal link | [![output](/portfolio/pull-requests/referential-stability/04.webp)](an internal link |

# What's next

This is the first in a series of PRs that aims to add memoization and stable references in places where we need it. There is only one changed hook in this PR so that we can all focus on it and ensure we understand what's going on. Subsequent PRs will add memo/ref-stab to more and more places.
