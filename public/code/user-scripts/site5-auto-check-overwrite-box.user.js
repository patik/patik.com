// ==UserScript==
// @name        Site5 File Upload Auto Check Box
// @description Automatically check the "overwrite" box when uploading files
// @include     https://*.backstage.site5.com/*/filemanager/upload-ajax.html*
// @author      Craig Patik
// @namespace   http://patik.com/code/user-scripts/
// @homepageURL http://patik.com/code/user-scripts/
// @updateURL   http://patik.com/code/user-scripts/site5-auto-check-overwrite-box.user.js
// ==/UserScript==

try {
  document.getElementById('overwrite_checkbox').checked = true;
}
catch (e) { }
