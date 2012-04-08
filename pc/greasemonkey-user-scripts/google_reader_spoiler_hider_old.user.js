// ==UserScript==
// @name           Google Reader Spoiler Hider
// @namespace      https://www.google.com/reader/view/
// @description    Hides entries containing keywords
// @include        https://www.google.com/reader/view/*
// ==/UserScript==




//alert(document.getElementById('spoilerInput').innerHTML);

//document.getElementById('spoilerInputButton').addEventListener("click", hideSpoilers, true);

function embedFunction(s) {
  //document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
  document.body.appendChild(document.createElement('script')).innerHTML=s.toString();
}

/*
//window.hideSpoilers = function()
function hideSpoilers()
{
  var keywords = document.getElementById('spoilerInputInput').value.split(',');
  var entries = document.getElementsByClassName(document,'div','entry-container');
  var i=j=0;
  
  // Loop through each entry and check for each keyword
  while (i<entries.length) {
    while (j<keywords.length) {
      if (entries[i].innerHTML.indexOf(keywords[j]) > 0) {
        // Make the title and content white so it can be selected but not unintentionally seen
        var thisPiece = getElementsByClassName(entries[i], 'div', 'entry-source-title')[0];
        thisPiece.style.cssText = 'color: white !important';
        thisPiece = getElementsByClassName(entries[i], 'div', 'item-body')[0];
        thisPiece.style.cssText = 'color: white !important';
        var imgs = thisPiece.getElementsByTagName('img');
        for (var k=0; k<imgs.length; k++) {
          imgs[k].style.cssText = 'display: none !important;';
        }
        
        // Mark entry as "keep unread" so if the user scrolls past it now it will still appear next time
        thisPiece = getElementsByClassName(entries[i], 'span', 'read-state-not-kept-unread','read-state-unread')[0];
        thisPiece.click();
      }
      j++;
    }
    i++;
  }
}
*/

//EmbedFunction("function hideSpoilers(){  var keywords = document.getElementById('spoilerInputInput').value.split(',');  var entries = document.getElementsByClassName(document,'div','entry-container');  var i=j=0;  while (i<entries.length) {    while (j<keywords.length) {      if (entries[i].innerHTML.indexOf(keywords[j]) > 0) {        var thisPiece = getElementsByClassName(entries[i], 'div', 'entry-source-title')[0];        thisPiece.style.cssText = 'color: white !important';        thisPiece = getElementsByClassName(entries[i], 'div', 'item-body')[0];        thisPiece.style.cssText = 'color: white !important';        var imgs = thisPiece.getElementsByTagName('img');        for (var k=0; k<imgs.length; k++) {          imgs[k].style.cssText = 'display: none !important;';        }        thisPiece = getElementsByClassName(entries[i], 'span', 'read-state-not-kept-unread','read-state-unread')[0];        thisPiece.click();      }      j++;    }    i++;  }}");

//EmbedFunction(hideSpoilers);




// To do: 
//   make the keyword box and button fit Reader's look and feel
//   when an entry is blanked out, display the keyword that triggered it over the entry (put a class on these so they can be Cleared)
//   save keywords (in a cookie?)
//   add a Clear button which unhides all hidden entries
//   make keyword matching case-insensitive (use regex /keyword/i ?)
// Test:
//   does it work on entries that haven't been loaded yet (i.e. by scrolling down and having Reader add more entries)
//   does it work across feeds/folders

// div.entry-container
//span.read-state-not-kept-unread, span.read-state-unread


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

embedFunction(getElementsByClassName);

// Create the input box where the user types in the keywords
var spoilerInputContainer = document.createElement('div');
spoilerInputContainer.style.cssText = "position: absolute; top:30px; right:20px; width: 200px;z-index:1000;";
spoilerInputContainer.id = spoilerInputContainer;
spoilerInputContainer.innerHTML = '<input type="text" size="20" name="spoilerInputInput" value="Obama,Russia" id="spoilerInputInput" /> '
                                + '<span id="spoilerInputButton" style="background-color:silver;border:1px solid gray; padding:2px;cursor:pointer;" '
                                + 'onclick="javascript:var keywords = document.getElementById(\'spoilerInputInput\').value.split(\',\');  var entries = document.getElementsByClassName(document,\'div\',\'entry-container\');  var i=j=0;  while (i<entries.length) {    while (j<keywords.length) {      if (entries[i].innerHTML.indexOf(keywords[j]) > 0) {        var thisPiece = getElementsByClassName(entries[i], \'div\', \'entry-source-title\')[0];        thisPiece.style.cssText = \'color: white !important\';        thisPiece = getElementsByClassName(entries[i], \'div\', \'item-body\')[0];        thisPiece.style.cssText = \'color: white !important\';        var imgs = thisPiece.getElementsByTagName(\'img\');        for (var k=0; k<imgs.length; k++) {          imgs[k].style.cssText = \'display: none !important;\';        }        thisPiece = getElementsByClassName(entries[i], \'span\', \'read-state-not-kept-unread\',\'read-state-unread\')[0];        thisPiece.click();      }      j++;    }    i++;  }\"">Hide</span>';
document.body.appendChild(spoilerInputContainer);
