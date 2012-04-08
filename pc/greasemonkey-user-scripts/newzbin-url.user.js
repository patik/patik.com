// ==UserScript==
// @name          Newzbin V3 URL Rewriter
// @namespace     http://www.patik.com/
// @description	  Changes URLS from www.newzbin.com to v3.newzbin.com
// @include       http://www.newzbin.com/*
// @exclude       http://v3.newzbin.com/*
// ==/UserScript==


var theURL = window.location.href;
var URLregex = /www\.newzbin\.com/;

if (URLregex.test(theURL)) {
	theURL = theURL.replace(/www\.newzbin\.com/g,'v3.newzbin.com');
	window.location.href = theURL;
}
