// ==UserScript==
// @name           Twitter Avatar in Menu
// @namespace      https://patik.com/code/user-scripts/
// @include        https://twitter.com/*
// @include        https://twitter.com/*
// @version        2.1.20131118
// ==/UserScript==

;(function _twitter_avatar_in_menu() {
    // Find the generic 'person' outline in the nav bar, which will be replaced
    var menuitem = document.querySelector('.nav-me') || null,
        // Get avatar from the user menu (gear icon) to ensure we don't grab some other avatar
        avi = document.querySelector('.global-nav .current-user .avatar[src]')

    if (menuitem && avi.src) {
        menuitem.style.cssText =
            'background-image: url("' +
            avi.src +
            '") !important;background-position: 0 0;border-radius: 4px;background-size: 21px 22px;'
    }
})()
