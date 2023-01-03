// @name           Redirect from WikiTravel to WikiVoyage
// @description    Automatically switch from a WikiTravel.org article to the same article on WikiVoyage.org
// @namespace      http://patik.com/code/user-scripts/
// @include        http://wikitravel.org/*
// @version        v20130218.1
// ==/UserScript==

(function _wikivoyage_redir (win) {
  // Example
  // Before: http://wikitravel.org/en/Bangkok/Sukhumvit
  // After:  http://en.wikivoyage.org/wiki/Bangkok/Sukhumvit
  var currUrl = win.location.href,
      travRegex = /\/\/wikitravel\.org\/(\w+)\/(.+)/i,
      pieces;

  // Make sure it's a valid, parse-able WikiTravel article URL
  if (!travRegex.test(currUrl)) { return; }

  // Split into [full url, language, article name]
  pieces = travRegex.exec(currUrl);

  // Redirect immediately
  win.location.href = 'http://' + pieces[1] + '.wikivoyage.org/wiki/' + pieces[2];

}(this));
