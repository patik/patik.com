---
id: 251
title: Keeping styles in the style sheet
date: 2013-09-09T13:56:32+00:00
author: Craig Patik
layout: post
guid: keeping-styles-in-the-style-sheet
dsq_thread_id:
    - '1741403952'
categories:
    - Javascript
    - Web
---

Even as browsers progress and add more support for CSS-based animation, we still find ourselves relying on JavaScript to get the job done. But that doesn&#8217;t mean we need to define our styles in our scripts.

<!--more-->

[Nikita Vasilyev](http://n12v.com) has described a simple yet useful [JavaScript technique for transitioning to and from &#8216;auto&#8217;](http://n12v.com/css-transition-to-from-auto/) for CSS `height` and `width` values. While this is arguably something CSS should handle natively, [it&#8217;s not in the spec](http://www.w3.org/TR/css3-transitions/#animatable-css) and it&#8217;s unclear if any browser vendors will implement it independently.

As nicely as this solution works, I still prefer to keep the presentation defined by CSS as much as possible. In particular, I wasn&#8217;t happy leaving this particular line from Nikita&#8217;s script as-is:

<pre class="brush:js">element.style.transition = 'width .5s ease-in-out';
</pre>

We regularly get caught in this scenario &mdash; wanting to style with CSS, but needing JavaScript to make it happen. All too often, we end up with styles that are hardcoded into JavaScript.

If we&#8217;re smart we make these styles configurable, but then we&#8217;re adding complexity to our code and making it harder for other developers to use our code (do I pass my custom CSS as the third argument or fourth?). We can do better.

### Referencing Style Sheets {#referencing-style-sheets}

In this particular case, the three `transition` values &mdash; property, duration, and timing function &mdash; are all hardcoded. It may make sense to leave the `height` or `width` property declared in the JavaScript if the script will be called upon for a specific property (e.g. an `expandWidth()` function customized for a particular module). But there&#8217;s no reason the duration and timing function can&#8217;t be defined in CSS.

Let&#8217;s make that line a little more adaptive:

<pre class="brush:js">element.style.transitionProperty = 'width';
element.style.transitionDuration = getComputedStyle(element).transitionDuration;
element.style.transitionTimingFunction = getComputedStyle(element).transitionTimingFunction;
</pre>

And in the CSS:

<pre class="brush:css">.expandable {
    transition-property: none; /* More on this in a moment */
    transition-duration: .5s;
    transition-timing-function: ease-in-out;
}
</pre>

_[View a Gist of the entire code](https://gist.github.com/patik/6467961)_

### Separation of Concerns {#separation-of-concerns}

Now the transition can be changed by another JavaScript module or style sheet without disrupting the `expandWidth()` function:

<pre class="brush:css">.expandable.molasses {
    transition-duration: 3s;
}

.expandable.robotic {
    transition-timing-function: linear;
}
</pre>

### Extendability {#extendability}

This pattern is handy if you&#8217;re working on a customizable framework:

**`app.scss`**

<pre class="brush:scss">$expand-transition-duration: 1s;

@import "_framework"
</pre>

**`_framework.scss`**

<pre class="brush:scss">$expand-transition-duration: 500ms !default;
$expand-transition-timing-function: ease-in !default;

.expandable {
    transition: none $expand-transition-duration $expand-transition-timing-function;
}
</pre>

Which compiles to:

**`app.css`**

<pre class="brush:css">.expandable {
    transition: none 1s ease-in;
}
</pre>

### Note {#note-keeping-styles-in-the-style-sheet}

You&#8217;ll notice that the CSS includes `transition-property: none`. This prevents the CSS from having an effect on the element &mdash; that is, if you were to set `transition-property: width` you would see a wonky &#8216;double&#8217; animation as both the JavaScript and CSS adjust the element&#8217;s width simultaneously. If you try to leave the property out, the browser will default to `transition-property: all` which isn&#8217;t what we want either.

And of course you will need to [add vendor prefixes](http://caniuse.com/css-transitions) to keep things working across most browsers.
