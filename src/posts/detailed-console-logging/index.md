---
id: 216
title: 'Detailed console logging'
excerpt: 'While logging the console can be useful during development, some browser consoles do not display logged data in a readable, useful format. These primitive consoles do not expand arrays, do not link DOM elements to the source code, print objects as `[object Object]` rather than listing their properties, etc.'
date: '2012-12-17T11:22:24+00:00'
dsq_thread_id: '979228403'
categories:
    - JavaScript
    - web
ogImage: 'cover.jpg'
coverImage: 'cover.jpg'
syntaxHighlightSSRHack: true
---

_This is an update to the console.log wrapper; see [this blog post](complete-cross-browser-console-log) for background and a more detailed discussion of the problems with console logging._

While logging the console can be useful during development, some browser consoles do not display logged data in a readable, useful format. These primitive consoles do not expand arrays, do not link DOM elements to the source code, print objects as `[object Object]` rather than listing their properties, etc.

For example, try logging the following in Internet Explorer 8 through 10:

```js
console.log(
    "Here's a string",
    3.14,
    {"alpha": 5, "bravo": false},
    document.getElementById('charlie'),
    new Date()
);
```

It will result in:

![IE8 without detailed print](ie8-without-detail-print.png)

On the other hand, [Firebug](http://getfirebug.com/), WebKit’s [Developer Tools](https://developers.google.com/chrome-developer-tools/docs/overview), and Opera’s [Dragonfly](http://www.opera.com/dragonfly/) print useful, interactive items to the console. Here’s the same code as above, but this time in Firebug:

![Firebug running in Firefox](consolelog.firebug.png)

## Expanded details

But it is possible to eke a bit more information out of the data in primitive consoles. I’ve added a [detailed print plugin](https://github.com/patik/console.log-wrapper) to my [console.log](complete-cross-browser-console-log) wrapper.

By including the plugin and sending the data to `log()`, the same call as above now looks like this:

![IE8 with detailed print](ie8-with-detail-print.png)

It’s still not pretty, nor is it linkable like modern consoles. But now instead of `[object Object]` you can see that it was an array (along with its length), or a DOM element (along with its selector), and so on. This can be useful in IE 7/8/9/10, iOS 5 and older, and Opera 11 and older, among others.

## Alternatives

For iOS 5 and older, if you are so inclined you may instead try [installing Firebug](http://www.hongkiat.com/blog/installing-firebug-browsers-ios/) or using a remote debugging tool like [Adobe Edge Inspect](http://html.adobe.com/edge/inspect/) or [Weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/).

If you’re sticking to modern browsers, you can simply ignore the new `consolelog.detailprint.js` plugin and continue to use `log()` as usual.

Thanks to [Jörn Berkefeld](http://www.bittubes.com/) for pointing out that this was [needed on iOS 5](https://github.com/patik/console.log-wrapper/issues/7) and for testing.

[Live Demo](https://patik.github.io/console.log-wrapper/)&nbsp;&bull;&nbsp;[Github Repo](https://github.com/patik/console.log-wrapper)
