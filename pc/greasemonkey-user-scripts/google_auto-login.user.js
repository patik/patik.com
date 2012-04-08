// ==UserScript==
// @name           Google Auto-login
// @namespace      http://www.patik.com
// @description    Google Auto Login
// @include        *.google.com/accounts/ServiceLogin*
// ==/UserScript==

var frm = document.getElementById('gaia_loginform');
var chk = document.getElementById('PersistentCookie');
chk.checked = true;
document.getElementsByName('signIn')[0].click();