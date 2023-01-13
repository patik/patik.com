// @name           Hannaford Weekly Flyer Enhanced
// @description    Adds keyboard shortcuts
// @namespace      https://patik.com/code/user-scripts/
// @include        https://hannaford.vs.adplexonline.com/WeeklySpecials*
// @version        v20130317.1
// ==/UserScript==

;(function _hannaford_flyer() {
    // Simulate click on the next/previous buttons
    document.body.addEventListener(
        'keyup',
        function (evt) {
            switch (evt.keyCode) {
                case 39: // Right arrow
                    document.getElementById('lkNextPage').click()
                    break
                case 37: // Right arrow
                    document.getElementById('lkPrevPage').click()
                    break
                default:
                    break
            }
        },
        false
    )
})()
