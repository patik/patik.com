<?php
# require_once('../inc/html.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
    ?>
    <div id="code-main" role="main">
        <h1>Code &amp; Projects</h1>

        <div class="intro">
            <p>I work mostly in JavaScript and user interfaces</p>
        </div>

        <section>
            <h2>Blog &amp; Demos</h2>
            <div class="row button-link-list">
                <div class="small-12 medium-6 columns">
                    <a href="../blog/">
                        <img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="console.blog()">
                        <span>console.<wbr>blog()</span>
                    </a>
                </div>
                <div class="small-12 medium-6 columns">
                    <a href="../html5/">
                        <img src="../img/home-twitter-craigpatik-avatar.jpg" alt="HTML code" title="HTML5">
                        <span>HTML5 Presentations</span>
                    </a>
                </div>
            </div>
            <div class="row button-link-list">
                <div class="small-12 medium-6 columns">
                    <a href="console-log-polyfill">
                        <img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="Cross-browser console logging">
                        <span>Cross-browser console logging</span>
                    </a>
                </div>
                <div class="small-12 medium-6 columns">
                    <a href="https://github.com/patik/kind/">
                        <img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="Kind type-check for JavaScript">
                        <span>Kind.js precise type-checker</span>
                    </a>
                </div>
            </div>
        </section>

        <section>
            <h2>Creations</h2>
            <div class="row button-link-list">
                <div class="small-12 medium-6 large-4 columns">
                    <a href="https://github.com/patik">
                        <img src="../img/home-github-logo.png" alt="GitHub text logo" title="GitHub">
                        <span>GitHub</span>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a href="http://signaltonoi.se">
                        <img src="../img/home-snr-logo.png" alt="S:N logo" title="Signal:Noise">
                        <span>signal:<wbr>noise<br>Twitter app</span>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a href="http://picnicnewark.com/">
                        <img src="../img/code-picnic-logo.jpg" alt="PicNic Newark restaurant logo" title="Pic-Nic, Newark, NJ">
                        <span>Picnic<wbr>Newark<wbr>.com</span>
                    </a>
                </div>
            </div>
            <div class="row button-link-list">
                <div class="small-12 medium-6 large-4 columns">
                    <a href="within-viewport/">
                        <img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="Within Viewport">
                        <span>Within Viewport</span>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns left">
                    <a href="user-scripts/">
                        <img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="User Scripts">
                        <span>User Scripts</span>
                    </a>
                </div>
            </div>
        </section>

    </div>
    <?php
}

$x = new Print_html();
$x->name = 'code';
$x->section = 'code';
$x->pageTitle = 'Code &amp; Projects';
$x->dirLevel = 1;
$x->useragent = $_SERVER['HTTP_USER_AGENT'];

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
