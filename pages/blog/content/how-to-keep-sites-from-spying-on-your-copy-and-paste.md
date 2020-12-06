---
id: 180
title: How to Keep Sites from Spying on Your Copy and Paste
date: 2010-01-15T07:23:43+00:00
author: Craig Patik
layout: post
guid: how-to-keep-sites-from-spying-on-your-copy-and-paste
dsq_thread_id:
    - '438751217'
categories:
    - Uncategorized
---

[](http://patik.com/blog/wp-content/uploads/2010/01/copypasta-adblock2.png)Many news sites, from [Wired](http://www.wired.com/) to my [local newspaper](http://www.timesunion.com/), have taken to adding a &#8216;feature&#8217; to their articles &mdash; any text you copy and paste is [silently broadcast to another site](http://yro.slashdot.org/story/10/01/14/1818222/Tynt-Insight-Is-Watching-You-Cut-and-Paste). That other site, [Tynt](http://www1.tynt.com/see-whats-copied), keeps track of what you copy and paste to your friends in an effort to track demographics.

<p style="text-align: center;">
  <a href="http://patik.com/blog/wp-content/uploads/2010/01/copypasta.png"><img class="size-full wp-image-123 aligncenter" style="margin-top: 10px; margin-bottom: 10px; border: 1px solid black;" title="Copying and pasting, sort of" src="http://patik.com/blog/wp-content/uploads/2010/01/copypasta.png" alt="Text copied and pasted from a news article into an IM window" width="463" height="142" srcset="http://patik.com/blog/wp-content/uploads/2010/01/copypasta.png 772w, http://patik.com/blog/wp-content/uploads/2010/01/copypasta-300x92.png 300w" sizes="(max-width: 463px) 100vw, 463px" /></a>
</p>

While some find it useful that Tynt also appends the URL of the article you&#8217;re viewing, many find the behavior obtrusive and a violation of their privacy. Want to share a snippet of a story with a friend? Go ahead, Tynt (and presumably the news site) are watching.

**Here&#8217;s how to get rid of it**, depending on your browser of choice.

<!--more-->

### <img class="size-thumbnail wp-image-126 alignright" style="margin: 5px;" title="Firefox" src="http://patik.com/blog/wp-content/uploads/2010/01/ff-icon1-150x150.png" alt="Firefox icon" width="81" height="81" srcset="http://patik.com/blog/wp-content/uploads/2010/01/ff-icon1-150x150.png 150w, http://patik.com/blog/wp-content/uploads/2010/01/ff-icon1-300x300.png 300w, http://patik.com/blog/wp-content/uploads/2010/01/ff-icon1.png 512w" sizes="(max-width: 81px) 100vw, 81px" />Firefox

With AdBlock installed, open the AdBlock preferences &mdash; either through the Tools menu or with the shortcut Ctrl-Shift-E. Click Filters > Add new, then paste in this line:

<pre style="text-align: center;"><tt style="background-color: #f9ffb7; border: 1px solid orange; padding: 5px 10px;">http://tcr.tynt.com/javascripts/Tracer.js</tt></pre>

<p style="text-align: center;">
  <a href="http://patik.com/blog/wp-content/uploads/2010/01/copypasta-adblock2.png"><img class="aligncenter" style="margin-top: 10px; margin-bottom: 10px;" title="Click for full size" src="http://patik.com/blog/wp-content/uploads/2010/01/copypasta-adblock2.png" alt="AdBlock preferences window" width="480" height="360" /></a>
</p>

### <img class="size-thumbnail wp-image-125 alignright" style="margin: 12px;" title="Chrome" src="http://patik.com/blog/wp-content/uploads/2010/01/Big+500x500+Chrome+Icon1-150x150.jpg" alt="Google Chrome icon" width="72" height="72" srcset="http://patik.com/blog/wp-content/uploads/2010/01/Big+500x500+Chrome+Icon1-150x150.jpg 150w, http://patik.com/blog/wp-content/uploads/2010/01/Big+500x500+Chrome+Icon1-300x300.jpg 300w, http://patik.com/blog/wp-content/uploads/2010/01/Big+500x500+Chrome+Icon1.jpg 500w" sizes="(max-width: 72px) 100vw, 72px" />

### Chrome

Chrome as a few ad-blocking extensions, such as [AdBlock](https://chrome.google.com/extensions/detail/gighmmpiobklfepjocnamgkkbiglidom) and [AdThwart](https://chrome.google.com/extensions/detail/cfhdojbkjhnklbpkdaibdccddilifddb). Once one is installed, go to your extensions page by clicking the wrench icon in the upper right corner of Chrome, then choose Extensions. Open your extension&#8217;s options and add the same line shown above for Firefox.

### Internet Explorer, and everyone else

First, ask yourself why you&#8217;re not using a safer, [faster](http://www.google.com/chrome), [better](http://www.mozilla.com/firefox/) browser. Surprisingly, Internet Explorer version 8 does offer ad-blocking. Follow [these easy steps from ghacks.net](http://www.ghacks.net/2009/04/08/internet-explorer-8-ad-blocking/) to block this script.
