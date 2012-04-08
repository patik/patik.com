// ==UserScript==
// @name           Zits direct to comic
// @namespace      http://www.arcamax.com/zits/
// @description    Go directly to comic images, for Zits at Arcamax.com
// @include        http://www.arcamax.com/zits/*
// ==/UserScript==

// Point the browser right to the image file
window.location.href = getElementsByClassName(document,'div','toon')[0].getElementsByTagName('A')[0].getElementsByTagName('IMG')[0].src;


// Utility function
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
