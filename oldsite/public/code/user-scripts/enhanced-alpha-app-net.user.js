// @name           Alpha.App.Net Enhanced
// @description    Image previews, Repost links, and Twitter character count on Alpha.App.Net
// @namespace      https://patik.com/code/user-scripts/
// @include        https://alpha.app.net/*
// @version        v20120310.1
// ==/UserScript==

var adnenh = (function _adnenh(win) {
    var postButton,
        textarea,
        adnCharDisplay,
        twCharDisplay,
        twchar = {},
        rpl = {},
        img = {}

    function init() {
        postButton = document.querySelector('[data-submit-post-button]')
        textarea = document.querySelector('textarea[name="post"]')
        adnCharDisplay = document.querySelector('span.char-count')
        twCharDisplay = document.createElement('span')

        twchar.setup()
        rpl.setup()
        img.setup()
    }

    /**
     * Twitter Character Count
     *
     */

    // To do: correctly count URLs, taking t.co shortening into account
    // Fix alignment and styling when <0 chars remain
    // Styles for different media queries

    twchar.setup = function _twchar_setup() {
        // Some pages don't have character displays (or are they just hidden?), so quit if none are found
        // To do: add one of my own!
        if (!adnCharDisplay) {
            return false
        }
        adnCharDisplay.classList.remove('hide')

        // Create new display for Twitter char count
        twCharDisplay.className = 'char-count adnenh-char-count'
        twCharDisplay.title = 'Twitter characters remaining'
        // Insert after app.net count
        twCharDisplay = adnCharDisplay.parentNode.insertBefore(twCharDisplay, adnCharDisplay.nextSibling)

        // Auto-update count
        twchar.updateCount()
        textarea.addEventListener('keyup', twchar.updateCount, false)
        textarea.addEventListener('change', twchar.updateCount, false)
        textarea.addEventListener('blur', twchar.updateCount, false)
    }

    // Update display
    twchar.updateCount = function _twchar_updateCount() {
        var adnCharCount = textarea.value.length,
            twCharCount = 140 - adnCharCount

        twCharDisplay.innerText = '(' + twCharCount + ')'

        // Add 'error' class if necessary
        if (twCharCount < 0) {
            twCharDisplay.classList.add('error')
        } else {
            twCharDisplay.classList.remove('error')
        }
    }

    /**
     * Repost links
     *
     */

    // Find posts without 'repost' links
    rpl.setup = function _rpl_setup() {
        var posts = document.querySelectorAll('.post-details')
        if (!posts || !posts.length) {
            return false
        }
        posts = Array.prototype.slice.call(posts)
        // Check each post to see if it has a Repost link yet
        posts.forEach(function (p) {
            var lnk = p.querySelector('[data-adnenh-repost-link]') || null
            if (!lnk) {
                rpl.addRpLink(p)
            } else if (lnk.hasAttribute('data-adnenh-repost-link-event')) {
                // Event listener hasn't been added yet
                rpl.addRpEvent(lnk)
            }
        })
    }

    // Add 'repost' link to a post
    rpl.addRpLink = function _rpl_addRpLink(p) {
        var replyLink = p.querySelector('[data-reply-to]'),
            li = replyLink.parentNode,
            rpLink = document.createElement('li')

        rpLink.className = 'yui3-u show-on-hover'
        rpLink.innerHTML =
            '<a href="#" data-adnenh-repost-link data-adnenh-repost-link-event><i class="icon-share-alt icon-share-adnenh-repost"></i> Quote</a>'

        // Insert after reply link
        rpLink = li.parentNode.insertBefore(rpLink, li.nextSibling)
        rpl.addRpEvent(rpLink)
    }

    // Add click listener to a 'repost' link
    rpl.addRpEvent = function _rpl_addRpEvent(lnk) {
        lnk.addEventListener('click', rpl.repost, false)
        lnk.removeAttribute('data-adnenh-repost-link-event') // Remove flag
    }

    // Create repost text in the post textarea
    rpl.repost = function _rpl_repost(evt) {
        var target = evt.target,
            post = rpl.getParentWithClass(evt.target, 'content'),
            username = post.querySelector('.username a').innerText,
            txt = post.querySelector('.post-content span').innerText

        txt = ' RP @' + username + ': "' + txt + '"'
        textarea.value = txt
        twchar.updateCount()
        rpl.setCursorBeginning()
        // To do: set reply parameters so the messages are threaded
    }

    // Poor man's $.closest()
    rpl.getParentWithClass = function _rpl_getParentWithClass(elem, clss) {
        while (elem && !/^body$|^html$/i.test(elem.nodeName)) {
            if (elem.classList && elem.classList.contains(clss)) {
                return elem
            }
            elem = elem.parentNode
        }
        return null
    }

    // Put cursor at the beginning of the textarea
    // Thanks to https://stackoverflow.com/a/10158364
    rpl.setCursorBeginning = function _rpl_setCursorBeginning() {
        textarea.focus()
        rpl.setCursorBeginningHelper()
        // Ugh, Chrome...
        win.setTimeout(rpl.setCursorBeginningHelper, 1)
    }

    rpl.setCursorBeginningHelper = function _rpl_setCursorHelper() {
        if (typeof textarea.selectionStart === 'number') {
            textarea.selectionStart = textarea.selectionEnd = 0
        }
    }

    /**
     * Image previews
     *
     */

    img.setup = function _img_setup() {
        var posts = document.querySelectorAll('.post-content')
        if (!posts || !posts.length) {
            return false
        }
        // Check each post to see if it has links to images
        Array.prototype.slice.call(posts).forEach(function (p) {
            var lnks = p.querySelectorAll('a')
            if (lnks.length && !p.querySelector('.adnenh-image-preview')) {
                Array.prototype.slice.call(lnks).forEach(function (url) {
                    url = img.getPreviewUrl(url.href)
                    if (url.length) {
                        img.createPreview(p, url)
                    }
                })
            }
        })
    }

    img.createPreview = function _img_createPreview(post, lnk) {
        var postElem = rpl.getParentWithClass(post, 'body'),
            imgContainer = document.createElement('a')

        imgContainer.className = 'adnenh-image-preview'
        imgContainer.href = lnk
        imgContainer.innerHTML = '<img src="' + lnk + '" alt="linked image">'
        postElem.appendChild(imgContainer)
    }

    img.getPreviewUrl = function _img_getPreviewUrl(url) {
        var temp
        // Straight up JPG/GIF/PNG
        if (/\.png$|\.jpe?g$|\.gif$/i.test(url)) {
            return url
        }
        // Img.ly
        else if (/img\.ly\/\w+\/?$/i.test(url)) {
            temp = /img\.ly\/(\w+)\/?$/i.exec(url)
            return 'https://img.ly/show/medium/' + temp[1] // mini
        }
        // Instagram
        else if (/instagram\.com|instagr\.am/i.test(url)) {
            return url + 'media/?size=l'
        }
        // Yfrog
        else if (url.indexOf('yfrog.com') > -1) {
            if (/j|p|b|t|g/.test(url)) {
                // Image
                return url + ':small'
            } else if (/z|f/.test(url)) {
                // Video
                return url + ':frame'
            }
        }
        // Twitpic
        else if (url.indexOf('twitpic.com/') > -1) {
            temp = url.replace(/http\:\/\/(www\.)?twitpic\.com\//, '')
            return 'https://twitpic.com/show/thumb/' + temp
        }
        // Flickr
        else if (url.indexOf('flic.kr/p/') > -1) {
            temp = url.replace('flic.kr/p/', '')
            return 'https://flic.kr/p/img/' + temp + '_m.jpg'
        }

        return ''
    }

    /**
     * Setup
     *
     */

    win.setTimeout(init, 1000)

    // Re-run these every so often to check for new posts (crappy, I know)
    // To do: only run this when new posts are loaded
    win.setInterval(rpl.setup, 11000)
    win.setInterval(img.setup, 13000)

    return {
        init: init,
    }
})(this)

// Fix alignment and styling when <0 chars remain
// Styles for different media queries
