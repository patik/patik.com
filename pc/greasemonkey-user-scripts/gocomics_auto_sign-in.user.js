// ==UserScript==
// @name           GoComics.com auto sign-in
// @namespace      http://www.patik.com
// @description    Auto Sign in at GoComics.com
// @include        http://gocomics.com/*
// @include        http://*.gocomics.com/*
// ==/UserScript==


// On sign in page
if (window.location.href.indexOf('http://www.gocomics.com/sessions/new') > -1) {
    document.getElementById('remember_me').checked = true;
    var a = document.getElementsByTagName('INPUT');
    var i=0;
    while (i<a.length) {
        if (a[i].name == 'commit') {
            a[i].click();
            break;
        }
        i++;
    }
}

// On any other page
else {
    var a = document.getElementsByTagName('A');
    var i=0;
    while (i<a.length) {
        if (a[i].innerHTML.toLowerCase().indexOf('sign in') > -1) {
            // If were on a comic (via RSS, usually), make sure we're redirected back to it after signing in
            if (window.location.href.indexOf('gocomics.com/features/') > -1) {
                var curr_url = window.location.href.substr(window.location.href.indexOf('features/'));
                window.location.href = 'http://www.gocomics.com/sessions/new?ptcal=%2F' + curr_url;
            }
            // Not on a comic via RSS (i.e., any other scenario; could add more conditions for other ways of being on a comic page)
            else {
                window.location.href = 'http://www.gocomics.com/sessions/new?ptcal=%2F';
            }
            break;
        }
        i++;
    }
}
