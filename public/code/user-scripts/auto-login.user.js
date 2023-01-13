// ==UserScript==
// @name            Auto Login
// @namespace       https://patik.com/code/
// @include         https://stackoverflow.com/*
// @include         https://*.wikipedia.org/*
// @include         https://developer.mozilla.org/en*
// @namespace       https://patik.com/code/user-scripts/
// @homepageURL     https://patik.com/code/user-scripts/
// @updateURL       https://patik.com/code/user-scripts/auto-login.user.js
// @version         1.0.1
// @lastupdated     2014-01-12
// ==/UserScript==

// Auto-login to sites whenever applicable
// Forms should be autofilled (i.e. by the browser)
try {
    var wlh = window.location.href

    // Stack Overflow
    if (wlh.indexOf('https://stackoverflow.com/question') !== -1) {
        // Part 1: Check for login link on "normal" pages
        if (wlh.indexOf('/users/login') < 0) {
            var links = document.querySelectorAll('#hlinks-nav a'),
                i = links.length

            while (i--) {
                if (/log\s*in/i.test(links[i].innerHTML)) {
                    // Redirect to login page
                    window.location.href = links[i].href
                }
            }
        }
        // Part 2:Select Google-powered login
        else {
            openid.signin('google')
        }
    }

    // Wikipedia
    else if (wlh.indexOf('wikipedia.org') !== -1) {
        // Part 1: Check for login link on "normal" pages
        if (wlh.indexOf('UserLogin') < 0) {
            var links = document.querySelectorAll('#pt-login a'),
                i = links.length

            while (i--) {
                if (/log\s*in/i.test(links[i].innerHTML)) {
                    // Redirect to login page
                    window.location.href = links[i].href
                }
            }
        }
        // Part 2: Prompt to login
        else {
            // Check the "stay logged in" box
            var check = document.getElementById('wpRemember')

            try {
                check.click()
            } catch (ee) {}

            check.checked = true
            check.setAttribute('checked', 'checked')

            if (confirm('Log in?')) {
                document.querySelector('form[name="userlogin"]').submit()
            }
        }
    }

    // Mozilla Developer Network
    else if (wlh.indexOf('https://developer.mozilla.org/en') !== -1) {
        var links = document.querySelectorAll('.user-login')

        // Part 1: follow Log-in link
        if (links.length) {
            window.location.href = links[0].href
        }
        // Part 2: click Login button
        else if (document.querySelectorAll('button[type="submit"]').length) {
            document.querySelectorAll('button[type="submit"]')[0].click()
        }
    }
} catch (e) {}
