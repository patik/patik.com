---
title: 'App Router migration prep: Create structure for main route group in @app folder'
prNumber: 8923
date: '2024-12-09'
kind: 'How to review it'
standfirst: 'Splitting a framework migration into pieces a person can actually review.'
order: 6
author: 'patik'
state: 'merged'
baseBranch: 'deploy/2025-01-09'
headBranch: 'dev/app-router-prep--095--copy-layout-files'
additions: 27262
deletions: 0
changedFiles: 20
reviewCount: 3
---

<em>This PR series prepares us for adopting <a href="https://nextjs.org/docs/app">Next's App Router</a> (NAR). For those who prefer videos, <a href="https://www.youtube.com/watch?v=YQMSietiFm0">this one's</a> quite a good explanation of the migration.</em>

<details>
<summary>Pull requests in this series</summary>

- PR #8761
- PR #8762
- PR #8786
- PR #8763
- PR #8764
- PR #8765
- PR #8767
- PR #8775
- PR #8778
- PR #8800
- PR #8922
- PR #8923
- PR #8929
- PR #8934
- PR #8893
- PR #8930
- PR #8639

JIRA-194

</details>

---

# Description

While we are in a transitional state between the Pages Router (NPR) and App Router (NAR), there will be some files that are needed by both of them. This includes mostly files in the `@realms/` folder, namely the layouts and navigation. In order to avoid regressions in existing NPR pages, I will not be changing any files in the `@realms` folder. Instead, I will copy the applicable file(s) to the `@app` folder, then make changes there.

## Purposes of this PR

- to allow subsequent PRs to show what is being changed as we migrate to App Router
    - If I copy a 100-line file and change just one line of it, you'll never notice that. By putting the 'copy' and the 'edit' into separate PRs, you can see the change to that line.
- to open a discussion the new folder structure

There are no actual code changes; the files are just copied in place.

## Realms -> Route Groups

Thankfully, our current realms are pretty cleanly split across URL segments

- `MandatoryRegistration` -> `/registration/*`
- `Checkout` -> `/subscription/checkout/*`
- `GuestlistManager` -> `/glm/*`
- `LoggedInUser` -> everything else (including all other `/subscription/*` routes)

I've highlighted the top level URL segments by color:

🟩 `LoggedInUser`
🟦 `Checkout`
🟨 `GuestlistManager`
🟥 `MandatoryRegistration`

<a href="/portfolio/pull-requests/app-router-route-groups/01.webp"><img src="/portfolio/pull-requests/app-router-route-groups/01.webp" alt="Pages Router file tree grouped by the LoggedInUser, Checkout, GuestlistManager, and MandatoryRegistration realms" width="50"></a>

Click to expand. I accidentally cut off some more pages at the bottom (`/downgrade`, `/start`, etc), but they're all in 🟩 `LoggedInUser`.

# How it works

NAR route groups are replacing realms. We are taking advantage of two Next features:

1. [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
    - folders whose names are wrapped in parentheses
2. [private folders](https://nextjs.org/docs/app/getting-started/project-structure#private-folders)
    - folders whose names begin with `_`

Within `@app,` Next allows us to create organizational folders using (rounded parentheses), called route groups. These folders do not become part of the URL. They are meant to be used the same way we've been using realms.

> **Tip**
>
> We will eventually create a route group for each of our realms. The folder structure will look like this:
>
>      frontend/
>      └── app/
>          ├── (main)/
>          │   ├── activity-group/
>          │   ├── events/
>          │   ├── profile/
>          │   └── start/
>          ├── (reg)/
>          │   └── registration/
>          ├── (checkout)/
>          │   └── subscription/
>          └── (glm)/
>              └── glm/

This PR establishes some of the core files for pages that were part of the `LoggedInUser` realm, which will now be called `main` for brevity (I think the shorter name will be less cumbersome.)

The folder `@app/(main)` will house all of the pages that used to be in the `LoggedInUser` realm. When we create a `layout.tsx` file in this folder, it will be used for all pages in the folder (in addition to the root `@app/layout.tsx`).

<img src="/portfolio/pull-requests/app-router-route-groups/02.webp" alt="App Router file tree showing nested main and root layouts around a Say Hi page" width="420">

This file `@app/(main)/layout.tsx` is analogous to the `<RealmWrapper>` (_not_ the `<Layout>`). It will render things like the navigation, footer, and global hooks/components that don't need to re-mount on every route change.

Next will ignore any folder with an underscore prefix. We can use this to organize our files however we'd like, without risk of having Next turn them into visible pages. For now, we have `_layout` and `_nav` subfolders, but we can add/remove/rename in the future as we please.

# Notes about some specific files

Many of the files continue to use the same name. These have changed:

## `Top.tsx` is a copy of `NavByRoute.tsx`

In NAR we will split the screen into three areas:

```
.-----------------.
|                 |
|    Top (nav)    |
|                 |
|-----------------|
|                 |
|  Middle (page)  |
|                 |
|-----------------|
|                 |
| Bottom (footer) |
|                 |
'-----------------'
```

We will use most of `<NavByRoute>` to return the contents of the "top" of the page.

## `Middle.tsx` is a copy of `Layout.tsx`

See above. We will use parts of `<Layout>` to wrap the contents of the page.

## `Bottom.tsx` is a copy of `Layout.tsx`

(Yes, this is a second copy of `Layout.tsx`.)

See above. We will use parts of `<Layout>` to return the bottom portion of the page.

# Git history

These files were copied using a [special method](https://devblogs.microsoft.com/oldnewthing/20190919-00/?p=102904) that preserves their history in git. Even when we delete the original files in `@realms`, these "new" files will retain their change history 🎉

See for yourself:

```sh
git checkout dev/app-router-prep--095--copy-layout-files
git blame "frontend/app/(main)/_layout/Middle.tsx"
```
