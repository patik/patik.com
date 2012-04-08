// ==UserScript==
// @name           Tripadvisor Forum Cleaner
// @namespace      http://www.patik.com
// @description    Cleans up useless crap on Trip Advisor forums
// @include        http://www.tripadvisor.com/ShowForum*
// @include        http://www.tripadvisor.com/ShowTopic*
// ==/UserScript==

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .padded-b-7, .b-lrb, div#BODYCON div table tbody tr td { display: none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();