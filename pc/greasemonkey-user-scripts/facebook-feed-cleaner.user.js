// ==UserScript==
// @name          Facebook Feed Cleaner
// @namespace     http://www.patik.com/
// @description   Remove crap items from the main page
// @include       http://www.facebook.com/home.php*
// ==/UserScript==


function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
		}
	}
	else{
		arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}


var feedItems = getElementsByClassName(document,'div','feed_story_wrapper');

for (var i=0; i<feedItems.length; i++) {
    var f = feedItems[i];
    if (f.innerHTML.indexOf('left the group') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf('joined the group') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf('friend finder') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf(' added the ') > -1 && f.innerHTML.indexOf(' application') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf(' is attending ') > -1 || f.innerHTML.indexOf(' are attending ') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf('Popular events') > -1 && f.innerHTML.indexOf('network.') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf('became supporters of') > -1 || f.innerHTML.indexOf('became a supporter of') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf('>Roland Zhang</a> ') > -1 || f.innerHTML.indexOf('>Jed Zaretski</a> ') > -1 || f.innerHTML.indexOf('>Duce Malloy</a> ') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
    else if (f.innerHTML.indexOf('Donnie Hoyle') > -1 || f.innerHTML.indexOf('Sandy Mehglich') > -1) {
        f.parentNode.style.cssText = "display: none;";
    }
}
