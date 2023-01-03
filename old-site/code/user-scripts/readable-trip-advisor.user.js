// ==UserScript==
// @name        Readable Trip Advisor Forums
// @description Clean, readable styles for Trip Advisor Forums
// @include     http://*.tripadvisor.com/ShowTopic*
// @author      Craig Patik
// @namespace   http://patik.com/code/user-scripts/
// @homepageURL http://patik.com/code/user-scripts/
// @updateURL   http://patik.com/code/user-scripts/readable-trip-advisor.user.js
// @version     v20120407.1
// ==/UserScript==

var el, hd, screenname;

// Delete footer bar
el = document.getElementById('TM_FTR');
if (el) {
  el.parentNode.removeChild(el);
}

try {
  // Determine if this is not the first page in the thread
  if (document.querySelector('.paging.pageDisplay').innerHTML !== "1") {
    // Change styles for (repeated) first post
    document.body.classList.add('subsequent-page-of-thread');
    // Scroll to new posts
    document.querySelector('.replies').scrollIntoView();
  }

  // Highlight original poster's other posts
  screenname = document.querySelector('.firstPostBox .username a').innerHTML;
  Array.prototype.slice.call(document.querySelectorAll('.username a')).forEach(function(a) {
    if (a.innerHTML === screenname) {
      a.classList.add('original-poster-username');
    }
  });
} catch(e) { }

// Insert CSS file to apply most of the styles
el = document.createElement('link');
hd = document.getElementsByTagName("head")[0];
el.type = 'text/css';
el.rel = 'stylesheet';
el.href = 'http://patik.com/code/user-scripts/readable-trip-advisor.css';
el.media = 'screen';
hd.appendChild(el);
