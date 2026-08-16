---
title: 'Defining experiments in Route definitions, part 1/2'
prNumber: 6263
date: '2024-01-22'
kind: 'Problem and solution'
standfirst: 'Consolidating scattered experiment logic into a single source of truth.'
order: 9
---

For routes that are controlled by an experiment, the experiment can be configured within the route definition.

This change comes from our Campfire discussion on 2024-01-18.

# Highlights

* Each route definition now specifies if the route is guarded by an experiment (instead of spreading this logic across multiple files)
* Tests are now automated

# Problems we're trying to solve

How can we be sure that experiments/segmentation are respected while a user navigates around within the SPA?

Issues:

* Currently, linking to a route with `<INLink>`  **will** respect any experiment logic. But using `route.go()` will **not** respect experiment logic.
* There is no single source of truth. Route definitions are separate from their experiment logic (which is defined in `useIsSpaAllowedAccordingToExperiment`)
* Longterm, we cannot rely on the browser regularly "checking in" with the backend to ensure that experiment logic is respected (i.e. by doing a full page reload that touches Symfony). The SPA itself needs to be aware of how experiments affect navigation.

# Solution

Each route's definition can now contain information about experiments.

## How to define the experiment for a route

For example, we will only use SPA navigation when going to this route if the user is in `sa18=B`.

```tsx
// frontend/routes/catalog/index.ts
export const createEvent = new Route({
    path: '/event/review/suggest',
    experiments: {
        allowSpaNav: {
            name: 'sa18',
            segments: ['B'],
        },
    },
})
```

If the user is in `sa18=A` (or `C`, or not segmented at all), we will navigate using standard browser navigation (`<a href="...">`) so that Symfony will handle the request.

Multiple segments can be listed.

## Other experiment configuration and tests

Previously, when setting up a new experiment, devs also had to modify `useIsSpaAllowedAccordingToExperiment` and `isUrlAllowedByExperiment` to apply the logic for their experiment. This is no longer necessary. The experiment logic will take effect just by updating the route definition as shown above.

![CleanShot 2024-01-22 at 21 33 40](/portfolio/pull-requests/experiments-in-route-definitions/01.webp)

Additionally, tests are now automated. The old file `frontend/routes/utils/isUrlAllowedByExperiment.test.ts`, which required manual updates, is no longer necessary. Now, `frontend/routes/catalog/experiments.test.tsx` will run tests across all route definitions and segments. There is also no need to cleanup the tests when the experiment ends.

# Behavioral changes

## To push, or to replace?

There is an existing function `getRouterMethod()` that determines whether we should use `router.push()` or `router.replace()` to navigate to a route. Previously, this function was only used when calling `.go()`. I believe this was an oversight. We now also call `getRouterMethod()` within `<INLink>` (i.e. when the user clicks on a link).

## Possible 'gotcha' in some tests

We have some tests that follow this pattern:

ARRANGE: Create some component with a link in it
ACT: Render the component and click on the link
ASSERT: router.push or router.replace should have been called

In some cases, the SPA may need to look up experiment info for these links. If the test did not already mock the requests to `/api/experiment/participation` then the test now fails. This is because the route can't be sure the user is in the correct segment, so instead of using `NextRouter`, it uses regular browser navigation. The fix is to mock the API request.

To be clear, these issues are already fixed in this PR; this is just something to keep in the mind for writing tests in the future.

# What's included in this PR

`<INLink>` is updated to support the new pattern

# What will be in the next PR #6250

`Route.go()` will be updated to support the new pattern

---

Replacement PR for #6247 which I accidentally merged before it was ready or reviewed
