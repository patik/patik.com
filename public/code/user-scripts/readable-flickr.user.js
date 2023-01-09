// ==UserScript==
// @name        Readable Flickr
// @description Readable Flickr legible styles for Flickr.com
// @include     http://*.flickr.com/*
// @include     https://*.flickr.com/*
// @author      Craig Patik
// @namespace   http://patik.com/code/user-scripts/
// @homepageURL http://patik.com/code/user-scripts/
// @updateURL   http://patik.com/code/user-scripts/readable-flickr.user.js
// ==/UserScript==

// Insert CSS file to apply most of the styles
var el = document.createElement('link'),
    hd = document.getElementsByTagName("head")[0];
el.type = 'text/css';
el.rel = 'stylesheet';
el.href = 'http://patik.com/code/user-scripts/readable-flickr.css';
el.media = 'screen';
hd.appendChild(el);

// Insert JS file to handle other adjustments
el = document.createElement('script');
el.type = 'text/javascript';
el.src = 'http://patik.com/code/user-scripts/readable-flickr.js';
hd.appendChild(el);
