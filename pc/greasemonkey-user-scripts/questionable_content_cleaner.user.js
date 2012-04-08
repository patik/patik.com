// ==UserScript==
// @name           Questionable Content cleaner
// @namespace      http://questionablecontent.net/view.php?*
// @include        http://questionablecontent.net/view.php?*
// ==/UserScript==


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////// //
// Remove space from the top
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////// //
document.body.removeChild(document.getElementById("topline"));



// ///////////////////////////////////////////////////////////////////////////////////////////////////////////// //
// Move the news, which should be read after the comic even though it's up at the top, to the bottom of the page //
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////// //

var newsContent = document.getElementById('news').innerHTML;
document.getElementById('news').innerHTML = "";
var x = document.createElement("div");
x.innerHTML = newsContent;
x.style.cssText = "width: 600px; font-size: larger;margin:10px;margin-left:250px;text-align:left;";
document.body.appendChild(x);


// ////////////////////////// //
// Get URL for the next comic //
// ////////////////////////// //
var navs = getElementsByClassName(document,"ul","navcomic");
//alert("navs: " + navs.length);
for (var i=0; i<navs.length; i++) {
    var lnks = navs[i].getElementsByTagName("a");
    //alert("lnks: " + lnks.length);
    for (var j=0; j<lnks.length; j++) {
        //alert(lnks[j].innerHTML);
        if (lnks[j].innerHTML.indexOf("Next") > -1) {
            var nextURL = lnks[j].href;
            //alert("nextURL: " + nextURL);
            break;
        }
    }
}


// ///////////////////////////////////////// //
// Make comic clickable (goes to next comic) //
// ///////////////////////////////////////// //

var comic = document.getElementById("comic").getElementsByTagName("img")[0];
comic = comic.parentNode;
comic.setAttribute('onclick', 'javascript:window.location.href="' + nextURL + '";');
comic.setAttribute('onmouseover', 'javascript:window.status="' + nextURL + '";');
comic.setAttribute('onmouseout', 'javascript:window.status="";');
comic.style.cssText = "cursor:pointer;";


// ///////////////// //
// Utility functions //
// ///////////////// //
function getElementsByClassName(node, tag)
{
  var args = getElementsByClassName.arguments;
  if (args.length < 3) { return false; }
 
  // an array to hold every object we're going to return
  var elems = new Array();
  var classes = new Array();
  var allElements = new Array();
  var returnElements = new Array();
 
  // validate arguments, then get all elements of that tag
  if (typeof node == "object" && node != null
      && typeof tag == "string" && tag != '' && tag != 'null') {
    allElements = node.getElementsByTagName(tag);
  }
  else { allElements = document.getElementsByTagName("*"); }
 
  // get the class names from the function call
  for (var i=2; i<args.length; i++) {
    // need to make sure the class name is matched exactly and not
    //   as a substring of another class name
    classes.push(new RegExp('\\b' + args[i] + '\\b'));
  }
  // compare each to the list of classes we're looking for
  for (var j=0; j<allElements.length; j++) {
    for (var k=0; k<classes.length; k++) {
      if (classes[k].test(allElements[j].className)) {
        returnElements.push(allElements[j]);
        // need to quit the classes loop so this element doesn't
        //   get added again if it matches another class name
        break;
      }
    }
  }
  return returnElements;
}
