// ==UserScript==
// @name           Google Reader Spoiler Hider
// @namespace      https://www.google.com/reader/view/
// @description    Hides entries containing keywords
// @include        https://www.google.com/reader/view/*
// ==/UserScript==




//alert(document.getElementById('spoilerInput').innerHTML);

//document.getElementById('spoilerInputButton').addEventListener("click", hideSpoilers, true);


// Create the input box where the user types in the keywords
var spoilerInputContainer = document.createElement('div');
spoilerInputContainer.style.cssText = "position: absolute; top:30px; right:20px; width: 200px;z-index:1000;";
spoilerInputContainer.id = spoilerInputContainer;
spoilerInputContainer.innerHTML = '<input type="text" size="20" name="spoilerInputInput" value="Obama,Russia" id="spoilerInputInput" /> '
                                + '<input type="button" id="spoilerInputButton" value="Hide" title="Hide" />';
document.body.appendChild(spoilerInputContainer);



function embedFunction(s) {
  //document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
  document.body.appendChild(document.createElement('script')).innerHTML=s.toString();
}


//window.hideSpoilers = function()
function hideSpoilers()
{
  alert("begin hideSpoilers()");
  var allEntries = getAllEntries();
  alert(allEntries.length);
  var keywords = document.getElementById('spoilerInputInput').value.split(',');
  var i=j=0;
  
  // Loop through each entry and check for each keyword
  while (i<allEntries.length) {
    while (j<keywords.length) {
      if (allEntries[i].innerHTML.indexOf(keywords[j]) > 0) {
        allEntries[i].style.border = "2px solid red";
        /*
        // Make the title and content white so it can be selected but not unintentionally seen
        var thisPiece = getElementsByClassName(allEntries[i], 'div', 'entry-source-title')[0];
        thisPiece.style.cssText = 'color: white !important';
        thisPiece = getElementsByClassName(allEntries[i], 'div', 'item-body')[0];
        thisPiece.style.cssText = 'color: white !important';
        var imgs = thisPiece.getElementsByTagName('img');
        for (var k=0; k<imgs.length; k++) {
          imgs[k].style.cssText = 'display: none !important;';
        }
        
        // Mark entry as "keep unread" so if the user scrolls past it now it will still appear next time
        thisPiece = getElementsByClassName(allEntries[i], 'span', 'read-state-not-kept-unread','read-state-unread')[0];
        simulateClick(thisPiece);
        */
      }
      else {
        alert(entries[i].innerHTML);
      }
      j++;
    }
    i++;
  }
}


//varallEntries=getAllEntries();alert(allEntries.length);varkeywords=document.getElementById(\'spoilerInputInput\').value.split(\',\');vari=j=0;while(i<allEntries.length){while(j<keywords.length){if(allEntries[i].innerHTML.indexOf(keywords[j])>0){allEntries[i].style.border=\"2pxsolidred\";}else{alert(entries[i].innerHTML);}j++;}i++;}


// at page load, add onclick event to the Hide button. when that's clicked, it initiates this script and calls hideSpoilers() which gets the keywords



// from http://userscripts.org/scripts/review/24955
function getAllEntries(){
	var allDivs = document.getElementsByTagName('div');
	var allEntries = new Array();
	for(var i=0;i<allDivs.length;i++){		
		if(typeof(allDivs[i].className) != 'undefined' &&
				allDivs[i].className == 'entry'
				|| allDivs[i].id == 'current-entry'
				|| allDivs[i].className == 'entry overflow-settable'){
			allEntries.push(allDivs[i]);
		}
	}
	return allEntries;
}

function simulateClick(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
}



function clickEvent(event){
  alert("called");
	hideSpoilers();
	alert("done");
}

document.getElementById('spoilerInputContainer').addEventListener("click", clickEvent, false);


/**/

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



//EmbedFunction(getElementsByClassName);

