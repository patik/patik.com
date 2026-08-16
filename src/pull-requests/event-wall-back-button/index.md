---
title: 'INZELDA-4968 Fix Event Wall back button edge case'
prNumber: 12341
date: '2026-06-10'
kind: 'Architectural argument'
standfirst: 'A bug fix that turns into the case for structural change.'
order: 13
---

## Description

Fixes issues where our synthetic navigation doesn't work properly when the user doesn't navigate perfectly

_The original pull request embedded a screen recording of the bug here._
The root of the problem is that we have two different ways to go "back":


## Changes

- If the user started clicking on the stepper's steps (the blue circled numbers), the stepper's back chevron was never actually navigating. Fixed.
	- When the user goes to a prior step, we now use `router.replace()` to avoid adding an entry to the history
- Corrupt or unexpected data in `sessionStorage` could cause a silent error that leaked the stale entry and logged to the error boundary. The read-then-remove sequence is now safe regardless of what's stored.
- Replaced scattered manual validation checks on `sessionStorage` and history state values with Yup schemas.


---

# Cost of the Event Wall scroll-box architecture

At some point we need to decide if this design is worth the technical cost.

TL;DR:

The Event Wall renders its scrollable content inside an inner overflow container instead of letting the page scroll. Browsers only restore scroll position for the _window_, so this one layout decision forces us to hand-build everything the browser would otherwise do for free: saving scroll position, detecting where the user came from, and carrying state across navigations. That machinery is now ~270 lines of custom navigation code, has required four rounds of fixes across three tickets, still has known gaps, and adds a hidden contract that every future navigation change in two separate funnels must honor. Moving the scrolling content into the page would let us delete most of it.


## What we've built to compensate

All of this exists _only_ because the scroll container isn't the window (`frontend/components/EventWall/useEventWallScrollRestoration.ts`, ~270 lines):

1. **Scroll capture on exit** — click handlers on every link/button that leaves the list must remember to save the container's `scrollTop` into `history.state`.
2. **A sessionStorage handoff** — Next Router has no way to attach state to a navigation, so we leave a note in sessionStorage and the destination page consumes it on mount to mark "this entry was opened from the Event Wall."
3. **A second sessionStorage mechanism** ("arming") — for returning to the list via `replace()` instead of `back()`, because the fresh history entry doesn't carry the saved position.
4. **A retry-until-it-sticks restoration effect** — the container can't accept the saved `scrollTop` until enough paginated list data has loaded, so restoration re-runs on every render until the value holds.

With window scrolling, items 1–4 are replaced by browser-native behavior — including cases we don't even handle today, like page reload and bfcache.

## The maintenance record

- **Three fixes in the past two weeks** on this mechanism alone: INZELDA-4955 (extend restoration to the checkout page, merged June 1), the checkout paywall back-navigation fix (PR #12324, merged June 10), and INZELDA-4968 (back button lands on the wrong page, in progress).
- Each fix has expanded the contract: the original "save scrollTop, restore on back" has grown sessionStorage handoffs, history-entry marking, and deterministic-replace logic.
- **Four test suites** now encode this behavior, and they require mocking `window.history.replaceState` and sessionStorage — among our most brittle integration tests.

## Why it keeps breaking (structural fragility, not bugs)

- **The contract is invisible and opt-in.** Every navigation path into or out of the Event Wall must remember to call the save/handoff helpers. The detail page's "Attend" button already forgot — that path silently has no scroll restoration today. Nothing fails loudly; users just lose their place.
- **It couples two distant features.** The registration funnel (`/registration/events/preview`) and subscription checkout (`/subscription/checkout/*`) now share navigation state, though neither was designed for it. The Event Wall back button relied on `back()`, while the checkout stepper has always added its own history entries (unchanged since the App Router port); layering the first on top of the second is what produced INZELDA-4968 — no code change in either feature required.
- **It depends on internals we don't control.** Custom keys in `history.state` are wiped whenever Next replaces an entry. We've already accepted one known defect from this: navigate product → address → back to product, and scroll restoration is lost.
- **Known accepted gaps remain** even after the latest fix: the wander case above, duplicate history entries after the back chevron, and no restoration on reload.

## What staying on this path costs

Every future feature touching these flows — new entry points to checkout, new Event Wall surfaces, navigation changes in either funnel — pays a tax: understand the contract, wire up the helpers, extend the tests, and QA the back-button matrix by hand. Review cost is similar: reviewers must know this system exists to catch omissions, and (per the Attend button) we already miss them.

## Cost of switching

This isn't free: the full-height registration shell's CSS needs rework (sticky toolbar and bottom action bar re-anchored to the viewport instead of the container), and mobile browsers need QA for URL-bar collapse behavior. But that's a one-time, well-understood CSS/layout task — versus a permanent, growing navigation-state machine. The checkout-origin detection (which Event Wall page to return to) survives either way, but it's small and derived from checkout session data, not history tracking.

---

[INZELDA-4968](https://issues.internations.org/browse/INZELDA-4968)
