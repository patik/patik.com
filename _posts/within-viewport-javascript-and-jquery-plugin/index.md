---
id: 192
title: 'Within Viewport: JavaScript and jQuery Plugin'
date: '2011-11-07T07:29:07+00:00'
excerpt: 'Within Viewport indicates whether an element is _entirely_ within the viewport. It also allows you to specify your site’s effective viewport, and includes an optional jQuery plugin.'
dsq_thread_id: '464099192'
categories:
    - JavaScript
    - jQuery
    - web
    - user interface
    - viewport
ogImage: 'cover.jpg'
coverImage: 'cover.jpg'
syntaxHighlightSSRHack: true
---

Within Viewport indicates whether an element is _entirely_ within the viewport. It also allows you to specify your site’s effective viewport (eg, to account for fixed header and navigation bars) and provides a few handy shortcut notations.

It’s quite simply to use:

```js
var elem = document.getElementById("myElem");

// Returns true if it's completely visible
withinviewport(elem);

// Same as above, but using the jQuery plugin
$(elem).is(":within-viewport");

// Run some function on all visible divs
$("div").withinviewport().myFunction();
```

**[Live Demo](https://patik.github.io/within-viewport/)**&nbsp;&bull;&nbsp;[Source Code at Github](https://github.com/patik/within-viewport)

There are a few “in view” scripts out there&mdash;namely, Mika Tuupola’s [Viewport Selectors for jQuery](http://www.appelsiini.net/projects/viewport) provides some convenient selectors that can be tested against elements, and Remy Sharp’s [Element ‘in view’ Event Plugin](http://remysharp.com/2009/01/26/element-in-view-event-plugin/) fires events when elements pass in and out of the viewport.

While useful, these utilities only detect whether elements are partially in view. The aim of Within Viewport is to determine **what content the user can see and interact with**.

## Use Cases

A lot can be learned from monitoring the viewport, especially on a site with content that spans well outside of the user’s view. I will discuss how I use Within Viewport in much more detail in my [next post](matching-ui-behavior-with-user-behavior). But here’s a quick overview of what you can do.

- ### Dynamic content loading

    A site’s performance can be increased effectively by loading data on demand, for example when the user scrolls near the bottom of the page. But perhaps _the content_ on screen is more pertinent than the scroll position. For example, you may want to load the entire structure of your site during the initial page load, but then populate that structure with heavier media as it nears the user’s field of view.

- ### Responding to user behavior

    You may also want to tailor when that content is loaded based on how rapidly the user moves about the page. If you are relying on a third party API for content, you may want to start the process sooner than you would begin requested content from your own server.

    For example, the script below would find and load items with local content that is merely just beyond the viewport, but also load third-party content that appears much further down the page.

    ```js
    // Image placeholders at most 100px below the fold
    $('img:not([data-src^="http://"]')
        .withinViewport({bottom:-100})
        .loadTheseImages();

    // Image placeholders as far as 500px below the fold
    $('img[data-src^="http://"]')
        .withinViewport({bottom:-500})
        .loadTheseImages();
    ```

- ### Making appropriate measurements

    If you want to know what your user has seen, for example to remember their reading position in a feed, you can only consider ones that are fully in view. You also need to take into account the actual viewport, avoiding things like fixed header bars that cover parts of the page.

    ![Diagram showing elements of a Twitter feed being in and out of view](example_diagram_sm.png)

- ### Live updates

    If you implement keyboard navigation between items, similar to [Google Reader](http://www.google.com/support/reader/bin/answer.py?answer=69973), you need to make sure a newly-selected item is actually visible.

- ### Tracking how your app is used

    You can tap into Google Analytics’ [Event Tracking](http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html) to find out how often items enter your visitor’s field of view.

I built Within Viewport to accomodate those needs, but I made it generic enough that any site or web app could benefit from it. There are configurable defaults and several shorthand notations described with examples in the [documentation](https://github.com/patik/within-viewport/blob/master/README.md).

## No jQuery? No problem

I wanted to write a tool that was independent of jQuery so it could be dropped into any project. Of course jQuery does offer some useful mechanisms such as filtering and custom selectors, so I added an optional plugin to provide that functionality.

[Live Demo](https://patik.github.io/within-viewport/)&nbsp;&bull;&nbsp;[Source Code at Github](https://github.com/patik/within-viewport)
