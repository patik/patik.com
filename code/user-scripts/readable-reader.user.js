// ==UserScript==
// @name        Readable Reader
// @description Readable Reader compact style for Google Reader
// @include     https://*.google.com/reader/view*
// @include     http://*.google.com/reader/view*
// @include     htt*://*.google.*/reader/view*
// @author      Craig Patik
// @namespace   http://patik.com/code/user-scripts/
// @homepageURL http://patik.com/code/user-scripts/
// @updateURL   http://patik.com/code/user-scripts/readable-reader.user.js
// @version     v20120302.2
// ==/UserScript==

// Insert CSS file to apply most of the styles
var el = document.createElement('link'),
    hd = document.getElementsByTagName("head")[0];
el.type = 'text/css';
el.rel = 'stylesheet';
el.href = 'http://patik.com/code/user-scripts/readable-reader.css';
el.media = 'screen';
hd.appendChild(el);

// Insert JS file to handle other adjustments
el = document.createElement('script');
el.type = 'text/javascript';
el.src = 'http://patik.com/code/user-scripts/readable-reader.js';
hd.appendChild(el);
