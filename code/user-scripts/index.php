<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
    ?>
    <div id="readable-reader-main" role="main">

        <h1>User Scripts</h1>
        <p>Install these in Chrome, Safari, or Firefox with <a href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/">Greasemonkey</a>.</p>

        <section>
            <h2>Twitter avatar in menu</h2>
            <p>See which account you're logged in under at a quick glance</p>
            <figure>
                <img src="../../img/twitter-avatar-in-menu.png" alt="screenshot example">
            </figure>
            <p>
                <a href="twitter-avatar-in-menu.user.js" class="button button-primary">Install</a>
                <a href="https://gist.github.com/patik/2029861" class="button">Gist</a>
            </p>
        </section>

        <section>
            <h2>Magnet Link Display</h2>
            <p>Displays <code>magnet</code> links and other P2P URLs prominently. Great for sites that hide the real links between obnoxious "download" ad banners or open pop ups when you click on them.</p>
            <figure>
                <img src="../../img/magent-links.png" alt="screenshot example">
            </figure>
            <p>
                <a href="magent-links.user.js" class="button button-primary">Install</a>
                <a href="https://gist.github.com/patik/8388768" class="button">Gist</a>
            </p>
        </section>

        <section>
            <h2>Alpha.App.Net Enhanced</h2>
            <p>Enhance App.net by adding useful features to the Alpha web app.</p>
            <ul>
                <li>Repost &mdash; Easily repost/share another user's post</li>
                <li>Image previews &mdash; See images from posts without having to open them</li>
                <li>Twitter character count &mdash; Ensure your post will fit within Twitter's 140-character limit when you crosspost to both networks using <a href="http://twapp.phuu.net/">twapp</a>, <a href="http://ifttt.com/">ifttt</a> or other services.</li>
            </ul>
            <p><a href="https://chrome.google.com/webstore/detail/agplbnminilmhgkkdngdodiallpempch" class="button button-primary">Chrome Extension</a> <a href="alpha-app-net-enhanced.user.js" class="button">User Script</a> <a href="https://gist.github.com/3542903" class="button">Gist</a></p>
            <figure>
                <img src="../../img/app-net-twitter-char-count.png" alt="screenshot example">
            </figure>
        </section>

        <section>
            <h2>Readable Reader</h2>
            <p>Compact styles for Google Reader</p>
            <p><a href="readable-reader.user.js" class="button button-primary">Install</a></p>
        </section>

        <section>
            <h2>Readable Google+</h2>
            <p>Cleans up Google+ Post pages. Currently only eliminates the gigantic avatar in the sidebar.</p>
            <p><a href="readable-google-plus.user.js" class="button button-primary">Install</a></p>
        </section>

        <section>
            <h2>Redirect from WikiTravel to WikiVoyage</h2>
            <p>When landing on a WikiTravel.org article, this script automatically redirects to the corresponding article on WikiVoyage.org.</p>
            <p>This <a href="http://en.wikipedia.org/wiki/Wikitravel#Community_fork_in_2012">brief description</a> of WikiVoyage's creation reflects my reasons for preferring it. Despite updating my own bookmarks and shortcuts, this script is still necessary because links to WikiTravel often show up in search results, blogs, etc.</p>
            <p>
                <a href="wiki-travel-voyage-redirect.user.js" class="button button-primary">Install</a>
                <a href="https://gist.github.com/patik/4979331" class="button">Gist</a>
            </p>
        </section>

        <?php /*<section>
            <h2>Readable Trip Advisor Forums</h2>
            <p>Clean styles for Trip Advisor</p>
            <p><a href="readable-trip-advisor.user.js" class="button">Install</a></p>
        </section>*/ ?>

        <section>
            <h2>Readable Flickr</h2>
            <p>Legible (large-font) styles for Flickr</p>
            <p><a href="readable-flickr.user.js" class="button button-primary">Install</a></p>
        </section>

        <section>
            <h2>Auto Login</h2>
            <p>Probably not useful for anyone else, this script will determine whether I'm logged in on certain sites. It then automatically navigates to the login page and, once my browser has auto-filled the fields, signs me in.</p>
            <p><a href="auto-login.user.js" class="button button-primary">Install</a></p>
        </section>

    </div>
    <?php
}

$x = new Print_html();
$x->name = 'userscripts';
$x->section = 'code';
$x->pageTitle = 'User Scripts - Readable Google Reader, Twitter Avatar, and more';
$x->keywords = 'user script, google reader, google+, css, javascript, greasemonkey, browser extension, add-on';
$x->dirLevel = 2;

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
    print_page_body();
}
# navigated directly
else {
    $x->redirect = true;
}

$x->print_full_page();

?>
