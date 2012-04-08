// ==UserScript==
// @name           Twitter auto-sign in
// @namespace      http://twitter.com/
// @include        http://*twitter.com/*
// ==/UserScript==


// On the login page, check "remember me" and click the submit button to log in
if (window.location.href.indexOf('twitter.com/login') > -1) {
    try {
        document.getElementById('remember_me').checked = true;
        document.getElementById('signin_submit').click();
    }
    catch (err) { }
}
// Any page, if a "login" link exists 
else if (document.getElementById('login_link')) {
    if (document.getElementById('login_link').getAttribute('href').indexOf('/login') > -1) {
        // Click it!
        window.location.href = document.getElementById('login_link').getAttribute('href');
    }
}