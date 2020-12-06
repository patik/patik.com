---
id: 166
title: Mobile Twitter bookmarklet displays the new, updated Twitter on your smartphone
date: 2009-12-09T12:44:26+00:00
author: Craig Patik
layout: post
guid: mobile-twitter-bookmarklet-displays-the-new-updated-twitter-on-your-smartphone
dsq_thread_id:
    - '482163089'
categories:
    - Javascript
    - Web
published: true
---

Twitter recently unveiled a [new interface for their mobile site](http://mashable.com/2009/12/03/twitter-mobile-3/) located at [mobile.twitter.com](http://mobile.twitter.com) loaded with the features you&#8217;re accustomed to having on the desktop version of the site. However, when you browse to Twitter or follow a link from an email on your mobile phone you&#8217;re still shown the older, far less useful interface by default.

To automatically view any page in the new interface, just use the [bookmarklet](http://en.wikipedia.org/wiki/Bookmarklet) below. If you&#8217;re currently on a Twitter page you&#8217;ll be redirected to the same page on mobile.twitter.com; or, if you&#8217;re anywhere else at all, you&#8217;ll simply go to the mobile home page.

The bookmarklet: [**Mobile Twitter**](javascript:if(window.location.href.indexOf('twitter.com')<0){window.location.href='http://mobile.twitter.com/'} else if(window.location.href.indexOf('mobile.twitter.com')<0){window.location.href=window.location.href.replace(/(\w+\.)?twitter\.com/,'mobile.twitter.com');}){.btn.btn-primary}

Or, to install it on an iPhone, follow these steps.

1. [Click here](http://patik.com/blog/mobile-twitter-bookmarklet-displays-the-new-updated-twitter-on-your-smartphone/#___javascript:if(window.location.href.indexOf('twitter.com')<0){window.location.href='http://mobile.twitter.com/'} else if(window.location.href.indexOf('mobile.twitter.com')<0){window.location.href=window.location.href.replace(/(\w+\.)?twitter\.com/,'mobile.twitter.com');}), and bookmark the resulting page once it loads by clicking the + icon at the bottom of Mobile Safari. (It will look just like the page you&#8217;re on.) Call it something like &#8220;Mobile Safari&#8221;.
2. Tap the bookmarks icon to open your bookmarks, then click Edit
3. Tap on the bookmark you just made. Then tap on the second line, containing the URL, to edit it.
4. Hold your finger down on the URL until the magnifying glass appears. Slide your finger to the left until you see &#8220;#\_\_javascript&#8221;. Put the cursor just before &#8220;javascript&#8221;, then hit Backspace to clear out everything that comes before it.
5. Click Done. The URL should now be a bunch of code beginning with &#8220;javascript&#8221;<img class="aligncenter size-full wp-image-109" title="Edit bookmark dialog, complete" src="http://patik.com/blog/wp-content/uploads/2009/12/image_2.png" alt="Edit bookmark dialog, complete" width="160" height="240" />

And that&#8217;s it. To use it, just open your bookmarks and tap on your new Mobile Twitter bookmarklet while you&#8217;re viewing any page.
