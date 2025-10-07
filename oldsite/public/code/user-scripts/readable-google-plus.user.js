// ==UserScript==
// @name        Readable Google+
// @namespace   https://patik.com/code/user-scripts/
// @include     https://plus.google.com/*/posts/*
// @version     v20120702.1
// ==/UserScript==

;(function () {
    // Avatar image seems to be the only element with a reliable classname to query
    var avatar = document.querySelector('img.l-tk.photo') || null,
        sidebar = null,
        userinfo = null

    if (avatar) {
        // Find the entire user sidebar
        sidebar = avatar.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode

        // Remove avatar container
        avatar = avatar.parentNode.parentNode.parentNode.parentNode
        avatar.parentNode.removeChild(avatar)

        // Pieces below the avatar now need a top border
        userinfo = sidebar.childNodes[1]
        userinfo.style.borderTop = '1px solid #CCCCCC'
        userinfo.style.borderRadius = '3px'
    }
})()
