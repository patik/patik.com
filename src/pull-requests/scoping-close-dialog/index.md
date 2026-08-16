---
title: 'closeDialog() only closes one specific dialog'
prNumber: 8058
date: '2024-08-16'
kind: 'Convention change'
standfirst: 'Fixing a too-permissive API, then making the case for a new house style.'
order: 5
---

<details>
<summary><code>closeDialog()</code> PR series</summary>

1. PR #8075
1. PR #8082
1. PR #8058
1. Removing prop-drilling and improving prop-passing in components that use dialogs:
    * PR #8084
    * PR #8108
    * PR #8107
    * PR #8085
    * PR #8087
    * PR #8088
    * PR #8089
    * PR #8090
    * PR #8091
    * PR #8092
    * PR #8093
    * PR #8094
    * PR #8095
    * PR #8096
    * PR #8097
    * PR #8098
    * PR #8099
    * PR #8100
    * PR #8101
    * PR #8102
    * PR #8103
    * PR #8104
    * PR #8105
    * PR #8106
    * PR #8129
    * PR #8130

</details>

---

## TL;DR

1. if you have `const { closeDialog } = useDialog('foo')` and you call `closeDialog()`, it will only close the dialog `foo` (instead of closing any dialog that happens to be open at the moment)
3. let's stop passing `closeDialog` as a prop and instead pass the dialog tracking label (`'foo' in the previous example)

---

## Background

When you call `closeDialog()` it will close whichever dialog happens to be open at the moment. It doesn't matter which instance of `useDialog` you get the function from, or which tracking label you use.

For example:

```tsx
const { openDialog } = useDialog('foo')

openDialog() // opens foo

const { closeDialog } = useDialog('bar')

closeDialog() // ❗closes foo, not bar
```

But often we want to close only _one specific dialog_, without affecting any other dialogs. Normally we accomplish this by prop-drilling the `closeDialog` function.

## Problems to be resolved

There are two issues I want to address with this PR series:

1. Avoid prop-drilling with `closeDialog`
      * If you're not familiar, the general problems with prop-drilling are outlined here: https://dev.to/codeofrelevancy/what-is-prop-drilling-in-react-3kol#the-problems-with-prop-drilling
      * additionally, since this is a function (and not a primitive value), using it as a prop causes additional re-renders. We can use memoization to avoid this, but that adds some other overhead that we may not want in many cases.
1. Make it possible to close a dialog when it's not practical to pass `closeDialog`
    * In the container app, after the user purchases a new subscription, we want to close the paywall dialog. However, this process takes several seconds, and user may have already closed the paywall on their own. So we want to call `closeDialog()` and have it close _only_ the paywall. Because this process involves multiple asynchronous steps, passing the original `closeDialog()` as parameter would be a huge mess.

## Coding changes

1. Internally, the `DIALOG_CLOSE` action will always include the dialog ID in the payload. The reducer will check that this ID matches the currently opened dialog before closing the dialog. 
4. I added a type alias `DialogId` for the string that we pass to `useDialog`, which matches the type `DialogTrackingEventLabel`. In addition to being shorter and easier to remember, I think this reinforces the idea that we need to treat each dialog as a unique instance. This type will be used later in this PR series.

To be clear, devs don't _need_ to do anything different when using `useDialog` or `closeDialog`. That said, I think there are some changes we _should_ make across our codebase, as described below.

### Potential side effects of this change

Because of the very "loose" nature of `closeDialog()` up until now, we may have places in our code base where we have taken advantage of this. We might not even have realized we were doing it, or we may have introduced 'mistakes' without noticing.

Therefore, we need to go through each place where we call `closeDialog()`, trace it back to the `useDialog()` where it came from, and make sure the behavior won't be affected by this PR.

I've already done this research, and fortunately, we didn't make any mistakes, so we can all pat ourselves on the back for being such fastidious developers 🤓 👏 

Even so, since I'm going through all of these use cases anyway, I think it's worthwhile to replace our `closeDialog` props with dialog IDs (strings) because of the issue described next.

### Avoiding re-renders

Consider this common pattern—a parent component that calls `useDialog` and also displays some data, and then passes `closeDialog` to a child component:

```tsx
function Parent() {
    const { closeDialog } = useDialog('foo')
    const data = useQuery(/* ... */)

    return (
        <>
            <div>{data}</div>
            <Child closeDialog={closeDialog} />
        </>
    )
}

function Child({ closeDialog }) {
    return <Button onClick={closeDialog}>Close</Button>
}
```

Because `closeDialog` is a function, `<Child>` will need to re-render every time `<Parent>` re-renders, even if there is no change related to the dialog.

But if we instead pass the dialog ID string, we can avoid this:

```tsx
function Parent() {
    const { closeDialog } = useDialog('foo')
    const data = useQuery(/* ... */)

    return (
        <>
            <div>{data}</div>
            <Child dialogId="foo" />
        </>
    )
}

function Child({ dialogId }) {
    const { closeDialog } = useDialog(dialogId)

    return <Button onClick={closeDialog}>Close</Button>
}
```

When the hooks `useDialog` and `useQuery` are re-rendered, this table shows whether `<Parent>` and `<Child>` would also need to re-render:

<table><thead>
  <tr>
    <th></th>
    <th colspan="4">Does the component need to re-render?</th>
  </tr></thead>
<tbody>
  <tr>
    <td></td>
    <td colspan="2">Using the <code>closeDialog()</code> prop</td>
    <td colspan="2">Using the <code>dialogId</code> prop</td>
  </tr>
  <tr>
    <td></td>
    <td>Parent</td>
    <td>Child</td>
    <td>Parent</td>
    <td>Child</td>
  </tr>
  <tr>
    <td>When useDialog re-renders</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td>When useQuery re-renders</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>⛔</td>
  </tr>
</tbody>
</table>

It's a small difference, admittedly. But when `closeDialog` is passed through multiple children, the number of avoided re-renders begins to grow. 

In most cases we can take this a step further and move the dialog ID to a shared (or exported) `const`. Then we don't need to pass any props at all. The number of re-renders stays the same, but the code becomes a bit cleaner:

```tsx
const dialogId = 'foo'

function Parent() {
    const { closeDialog } = useDialog(dialogId)
    const data = useQuery(/* ... */)

    return (
        <>
            <div>{data}</div>
            <Child />
        </>
    )
}

function Child() {
    const { closeDialog } = useDialog(dialogId)

    return <Button onClick={closeDialog}>Close</Button>
}
```
