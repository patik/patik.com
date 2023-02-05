---
id: 251
title: 'Keeping styles in the style sheet'
excerpt: 'Even as browsers progress and add more support for CSS-based animation, we still find ourselves relying on JavaScript to get the job done. But that doesn’t mean we need to define our styles in our scripts.'
date: '2013-09-09T13:56:32+00:00'
dsq_thread_id: '1741403952'
categories:
    - JavaScript
    - web
ogImage: 'cover.jpg'
coverImage: 'cover.jpg'
syntaxHighlightSSRHack: true
---

Even as browsers progress and add more support for CSS-based animation, we still find ourselves relying on JavaScript to get the job done. But that doesn’t mean we need to define our styles in our scripts.

[Nikita Vasilyev](http://n12v.com) has described a simple yet useful [JavaScript technique for transitioning to and from ‘auto’](http://n12v.com/css-transition-to-from-auto/) for CSS `height` and `width` values. While this is arguably something CSS should handle natively, [it’s not in the spec](http://www.w3.org/TR/css3-transitions/#animatable-css) and it’s unclear if any browser vendors will implement it independently.

As nicely as this solution works, I still prefer to keep the presentation defined by CSS as much as possible. In particular, I wasn’t happy leaving this particular line from Nikita’s script as-is:

```js
element.style.transition = 'width .5s ease-in-out';
```

We regularly get caught in this scenario&mdash;wanting to style with CSS, but needing JavaScript to make it happen. All too often, we end up with styles that are hardcoded into JavaScript.

If we’re smart we make these styles configurable, but then we’re adding complexity to our code and making it harder for other developers to use our code (do I pass my custom CSS as the third argument or fourth?). We can do better.

## Referencing Style Sheets

In this particular case, the three `transition` values&mdash;property, duration, and timing function&mdash;are all hardcoded. It may make sense to leave the `height` or `width` property declared in the JavaScript if the script will be called upon for a specific property (e.g. an `expandWidth()` function customized for a particular module). But there’s no reason the duration and timing function can’t be defined in CSS.

Let’s make that line a little more adaptive:

```js
element.style.transitionProperty = 'width';
element.style.transitionDuration = getComputedStyle(element).transitionDuration;
element.style.transitionTimingFunction = getComputedStyle(element).transitionTimingFunction;
```

And in the CSS:

```css
.expandable {
    transition-property: none; /* More on this in a moment */
    transition-duration: .5s;
    transition-timing-function: ease-in-out;
}
```

_[View a Gist of the entire code](https://gist.github.com/patik/6467961)_

## Separation of Concerns

Now the transition can be changed by another JavaScript module or style sheet without disrupting the `expandWidth()` function:

```css
.expandable.molasses {
    transition-duration: 3s;
}

.expandable.robotic {
    transition-timing-function: linear;
}
```

## Extendability

This pattern is handy if you’re working on a customizable framework:

**`app.scss`**

```scss
$expand-transition-duration: 1s;

@import "_framework"
```

**`_framework.scss`**

```scss
$expand-transition-duration: 500ms !default;
$expand-transition-timing-function: ease-in !default;

.expandable {
    transition: none $expand-transition-duration $expand-transition-timing-function;
}
```

Which compiles to:

**`app.css`**

```css
.expandable {
    transition: none 1s ease-in;
}
```

## Note

You’ll notice that the CSS includes `transition-property: none`. This prevents the CSS from having an effect on the element&mdash;that is, if you were to set `transition-property: width` you would see a wonky ‘double’ animation as both the JavaScript and CSS adjust the element’s width simultaneously. If you try to leave the property out, the browser will default to `transition-property: all` which isn’t what we want either.

And of course you will need to [add vendor prefixes](http://caniuse.com/css-transitions) to keep things working across most browsers.
