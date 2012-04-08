// ==UserScript==
// @name          DPReview.com Forums White on Black
// @namespace     http://userstyles.org
// @description	  Converts the Digital Photo Review forums to black-on-white for easier reading
// @author        patik
// @homepage      http://www.patik.com/
// @include       http://forums.dpreview.com/forums/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); * {	background-image: none !important;}a {	color: navy !important;}body, div#container_lc, div#container_rc {background-color: white !important;	color: black !important;} /* left side navigation menu */ div#content_menu {	background-image: none!important;}a.white, .menuhead_opensub,div#content h3.nomargin {	color: navy !important;}#menu_faux_search,input#menu_search_q {	background-image: none !important;} /* main comments area */ div#content table {	border: 1px solid black;}";
  
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
