---
title: 'Add Yup schemas for group requests'
prNumber: 12576
date: '2026-07-14'
kind: 'Forensic analysis'
standfirst: 'Tracing a silent failure through the type system to its origin.'
order: 14
---

## Summary

- Add Yup schemas for group-request and group-request-reply payloads.
- Use the shared entity ID schema for `activityGroupId`.
- `TGroupRequestReply` now matches the comment DTO the endpoint actually returns
- Null or missing `subtitle`/`motivation` are normalized to `''`, so the UI can rely on plain strings

## The types are now matching

**`TGroupRequest` ↔ `ActivityGroupData`** (returned by all three endpoints that use `toGroupRequest`: `GET /activity-groups/request/{id}/{action}`, `POST /activity-groups/request`, and `PATCH /activity-groups/request/edit/{id}/{version}`):

- `activityGroupId: int` (required), `name: string`, `description: string` — match the required schema fields.
- `subtitle` and `motivation` are `?string` in the DTO (`ActivityGroupData.php:103-106`), but the UI never needs the null/empty distinction, so the schema normalizes null or missing values to `''` and the type drops `| null`. Two mechanisms are needed: Yup's `.default('')` only covers *missing* keys, while an explicit `null` needs a `.transform()` — and explicit `null` is what actually arrives, since `serialize_null: true` applies in every environment (`config_dev.yml` imports `config_stage.yml` → `config_prod.yml` → `config_prod_api.yml`). The helper uses `mixed().transform().test()` (mirroring `nullableSchema` in `entityId.ts`) instead of a non-strict `string()`, which would re-enable Yup's number→string coercion.
- `requestVersion` is `?int` — so `.nullable().defined()` is right, and unlike the strings there's no sensible default: `0` is a real version value (the entity default), so fabricating one would turn a visible failure into a silently wrong workflow lookup.
- re: nullability: the GET builds the DTO via `ActivityGroupDataFactory::createForRequest`, which sets `requestVersion` from the entity's optimistic-lock version (a non-null `int`, default 0). Meanwhile, the POST and PATCH responses go through `createFromEntity`, which **hardcodes `requestVersion` to `null`**. Since one mapper serves all three endpoints, `number | null` is the correct union. That also explains the 69 `"requestVersion": null` fixtures.
- Dropping `hasAcceptedGuidelines` is correct — `ActivityGroupData` has no such property; it's request-body-only.
- `.noUnknown()` with non-strict `validateSync` strips the ~15 extra DTO fields (`memberCount`, `galleryId`, `consulIds`, `isMember`, HATEOAS `_links`, etc.), which the PR's tests cover.

**`TGroupRequestReply` ↔ `RequestCommentData`**: exact 1:1. The comment endpoint returns `RequestCommentData::createFromComment($comment)` with exactly `requestCommentId`, `userId`, `activityGroupId`, `commentText`, `createdOn` (`RequestCommentData.php`). The old type (`activityGroupId`, `requestVersion`, `reply`) was the *request* shape — `requestVersion` is a URL path segment and `reply` is a body key; neither ever appeared in a response.

## How it "worked" before

> **Tip**
>
> 
> TL;DR: the lodash mapper plus `any`-typed `get()` hid everything, and every wrongly-mapped field was either genuinely present in the response or never read by anyone — with one exception: the edit form's submit has been genuinely broken, and this PR quietly fixes it. 

Three layers of luck, stacked:

1. **`lodash.get` returns `any`.** The mapper could assign `undefined` to fields declared `string` or `number` and TypeScript never objected. The mapper guaranteed the *keys* existed, not the values — that's the papering-over. Every `get(data, 'requestVersion')` and `get(data, 'reply')` in `toGroupRequestReply` returned `undefined` on **every single production call**, forever.

2. **Nobody reads the mutation responses.** All three mutation consumers (`ReplyForm`, the new-request form, the edit form) have `onSuccess: () => {...}` — they show a snackbar/dialog and navigate. So the completely wrong reply shape, and the always-null `requestVersion` in POST/PATCH responses, were unobservable.

3. **The one response that IS consumed happened to be fine.** The GET feeds the confirmation/edit/reply forms, and the five fields they use genuinely exist in `ActivityGroupData` — and on that endpoint `requestVersion` is a real int, so the confirm/reply URLs were always built correctly. The `string`-vs-null lie on `subtitle`/`motivation` rarely materialized there because the revision setters coerce `?? ''` and the `Revision` entity has `NotBlank` on all four text fields at creation time.

## The crack that wasn't papered over

The old mapper **never mapped `activityGroupId`**. The confirmation and reply forms take the ID from the URL path, but the **edit form** gets it solely from spreading the mapped object into Formik values (`edit/[groupId]/_src/form.tsx:79-82`) and builds the PATCH URL from it. So pre-PR, submitting the edit form sent `PATCH /api/activity-groups/request/edit/undefined/2` — guaranteed failure, since at least the App Router migration (#9112). TS stayed silent because `GroupRequestEditValues.activityGroupId` is optional, and it plausibly went unnoticed because it's a rare email-link flow with zero test coverage. This PR fixes it incidentally: both the schema and the legacy fallback now map `activityGroupId`. A test for the edit-submit URL would keep it from regressing.

Minor, not a blocker: `string().required()` also rejects empty strings, so a legacy row with `description: ''` would fail validation — but `NotBlank` constraints at creation make that essentially unreachable, and the fallback degrades gracefully.

## Why validate responses nobody reads?

It's not moot; the two schemas earn their keep differently.

**`groupRequest` schema: load-bearing.** `toGroupRequest` also maps `GET /activity-groups/request/{id}/{action}`, whose response is genuinely consumed: the confirmation, edit, and reply forms spread it into Formik `initialValues` and build their URLs from `requestVersion` and (now) `activityGroupId`. That's real validation work on every load of those flows — and the path where the missing `activityGroupId` was silently breaking the edit submit.

**`groupRequestReply` schema: nobody reads what it validates today.** Its value is (1) a drift alarm — the mapper runs on every reply, so `logSchemaValidationError` fires if `RequestCommentData` ever changes shape; (2) honest types — `UseMutationResult.data` is public API, and the old type would have blessed `data.reply` while returning `undefined` at runtime; (3) documentation of what the endpoint actually returns. Typing the response as `unknown` and skipping the mapper is a defensible alternative, but it breaks the convention that every `requester` response is validated, and forfeits the drift detection.
