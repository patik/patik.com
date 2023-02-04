---
id: 154
title: 'My wish: that Google would preload its CDN libraries'
date: '2011-04-09T12:46:24+00:00'
excerpt: 'What if your site’s CSS and JS libraries were already cached for anyone who had previously been to Google’s homepage or Facebook? Almost no one would need to download those files from scratch when they reached your site, improving load time dramatically.'
dsq_thread_id: '426232901'
categories:
    - JavaScript
    - jQuery
    - performance
    - web
ogImage: 'cover.jpg'
coverImage: 'cover.jpg'
---

The idea behind using a common CDN such as [Google’s](http://code.google.com/apis/libraries/), as opposed to your own CDN (or none at all), is that by the time a person reaches your site there’s a chance they already have your JavaScript libraries cached. While it’s likely that an übergeek with fifty opened tabs will have jQuery cached before hitting one of your pages, the same isn’t so true for every Joe Facebook.

But what if a very popular site, one that nearly everyone would hit before reaching your site, loaded those libraries? I imagine the number of users running cached libraries would increase dramatically.

So which site? How about the most popular default home page — Google Search. (Sure, Facebook is popular, but we all know that even [Facebook user’s hit up Google first](http://www.readwriteweb.com/archives/how_google_failed_internet_meme.php).)

Think about it: a typical user begins their browsing session by loading Google’s search page, searches for something or other, and moves on with their task. But in the mean time, Google has silently loaded — not used, just loaded — jQuery, some popular web fonts, etc in the background. Perhaps the libraries are even chosen as the most likely ones the user will encounter based on his or her search terms. Those libraries are now cached in the user’s browser and your page will load that much faster with zero effort.

Of course there are some glaring drawbacks that would need to be addressed, but the solutions are pretty straightforward:

- **Page load speed.** Among other things, one could use a `setTimeout()` to lazy-load the library after, say, 8 seconds. (If you’ve been on the page for 8 seconds, chances are you’re hanging around for another 0.5 seconds to allow the download to finish.)
- **Bandwidth.** Obviously mobile devices are out, at least until there’s some way to detect whether the user is on wifi and running a buff enough browser not to blink at the `<script>` parsing. Even so, there are ISP bandwidth caps to consider, but is a one-time 20KB download going to push anyone over their limit?
- **Privacy.** People will kick and scream at the thought of something loading without their explicit request. Surely there should be an option to turn this off; but really, if you’re paranoid enough not to want MooTools in your cache than you’ve surely installed NoScript anyway.

Naturally this is all just a wish. It’s something I think Google could certainly pull off smartly, but I’d love to see it in practice even in a limited test (Chrome beta channel users, perhaps?) to see what effect it has on a typical person’s web experience.
