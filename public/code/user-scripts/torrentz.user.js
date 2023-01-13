// ==UserScript==
// @name           Torrentz.eu Customized
// @description    Links to torrent sites open in the same window, and kickass.to is automatically chosen if available
// @namespace      https://patik.com/code/user-scripts/
// @include        https://torrentz.eu/*
// @include        https://torrentz.eu/*
// @version        1.20131118
// ==/UserScript==

;(function _torrentz_customized() {
    // Find all links to other torrent sites
    ;[].slice.call(document.querySelectorAll('a[rel="e"]')).forEach(function (a) {
        var linkTitle

        // Make them open in the same window
        a.removeAttribute('target')

        // Auto navigate to kickass.to
        linkTitle = a.querySelector('.u')
        if (linkTitle && linkTitle.innerHTML === 'kickass.to') {
            window.location.href = a.href
        }
    })
})()
