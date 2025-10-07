// ==UserScript==
// @name           Magnet Link Finder
// @description    Finds all magnet URLs and displays them prominently
// @namespace      https://patik.com/code/user-scripts/
// @include        *
// @version        1.0.0.20140112
// ==/UserScript==

;(function _magnet_links() {
    var linkList = null, // Display list that holds the links
        magnetAnchors = [], // List of all found P2P anchors
        // Run the plugin
        init = function _init() {
            findAnchors()

            if (magnetAnchors.length) {
                createDisplay()
                displayAnchors()
            }
        },
        /**
         * Find anchor elements that point to P2P links
         */
        findAnchors = function _findAnchors() {
            var magSelector =
                    'a[href^="magnet:"], a[href^="ed2k://"], a[href^="thunder://"], a[href^="flashget://"], a[href^="qqdl://"]',
                hostURL = window.location.host
            // For some sites we know which link to keep and which to disregard (e.g. keep the link for a file set, but disregard links for individual files)

            // Pirate Bay
            if (hostURL.indexOf('thepiratebay') !== -1 || hostURL.indexOf('baymirror.com') !== -1) {
                magnetAnchors.push(document.querySelector('.download ' + magSelector))
            }
            // Kickass.to
            if (hostURL.indexOf('kickass.to') !== -1) {
                magnetAnchors.push(document.querySelector('.magnetlinkButton'))
            }
            // Other sites
            else {
                // Get all links
                magnetAnchors = magnetAnchors.concat([].slice.call(document.querySelectorAll(magSelector)))
            }
        },
        /**
         * Add all found anchors to the display
         */
        displayAnchors = function displayAnchors() {
            magnetAnchors.forEach(function (magnet) {
                var listItem = document.createElement('li'),
                    anchor = document.createElement('a'),
                    input = document.createElement('input')

                anchor.href = magnet.href
                anchor.innerHTML = magnet.innerText || magnet.getAttribute('title') || 'Link'

                input.type = 'url'
                input.value = magnet.href

                // Create list item
                listItem.appendChild(anchor)
                listItem.appendChild(document.createElement('br'))
                listItem.appendChild(input)

                // Add list item to the list
                linkList.appendChild(listItem)
            })
        },
        /**
         * Create a display area to hold the links
         */
        createDisplay = function _createDisplay() {
            var container = document.createElement('div'),
                cssRules = '',
                style

            // Outer container
            container.id = 'magnet-link-list'

            cssRules += '#magnet-link-list {'
            cssRules += 'position: absolute;'
            cssRules += 'top: 1em;'
            cssRules += 'right: 1em;'
            cssRules += 'width: 20em;'
            cssRules += 'minHeight: 4em;'
            cssRules += 'padding: 0.75em;'
            cssRules += 'background-color: #fff;'
            cssRules += 'z-index: 10001;'
            cssRules += 'border: 1px solid #777;'
            cssRules += 'box-shadow: 1px 1px 6px #aaa;'
            cssRules += 'font: 16px/1.4 "Open Sans", "Helvetica Neue", sans-serif;'
            cssRules += 'color: #444;'
            cssRules += '}'

            // Header
            container.innerHTML = '<h1>Magnet Links</h1>'

            cssRules += '#magnet-link-list h1 {'
            cssRules += 'font: 20px/1.4 "Open Sans", "Helvetica Neue", sans-serif;'
            cssRules += 'margin-top: 0em;'
            cssRules += 'text-align: center;'
            cssRules += '}'

            // List of links
            linkList = document.createElement('ul')

            cssRules += '#magnet-link-list ul {'
            cssRules += 'list-style: none outside none;'
            cssRules += 'margin-left: 0;'
            cssRules += '-webkit-padding-start: 0;'
            cssRules += '-moz-padding-start: 0;'
            cssRules += '}'

            cssRules += '#magnet-link-list li {'
            cssRules += 'margin-bottom: 1em'
            cssRules += '}'

            cssRules += '#magnet-link-list li:last-child {'
            cssRules += 'margin-bottom: 0'
            cssRules += '}'

            cssRules += '#magnet-link-list input {'
            cssRules += 'width: 100%'
            cssRules += '}'

            cssRules += '#magnet-link-list, #magnet-link-list * {'
            cssRules += 'box-sizing: border-box;'
            cssRules += '}'

            // Add elements to the document
            style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = cssRules
            document.getElementsByTagName('head')[0].appendChild(style)

            container.appendChild(linkList)
            document.body.appendChild(container)
        }

    // Run
    init()
})()
