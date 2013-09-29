<?php
# require_once('../inc/html.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="code-main" role="main">
    <h1>Code &amp; Projects</h1>

    <div class="intro">
      <p>I dabble mostly in JavaScript, other web technologies, and user interfaces</p>
    </div>

    <section>
      <h2>Blog &amp; Demos</h2>
      <div class="row button-link-list">
        <div>
        	<a href="../blog/">
          	<img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="console.blog()">
        		<span>console.<wbr>blog()</span>
          </a>
        </div>
        <div>
        	<a href="../html5/">
        		<img src="../img/home-twitter-craigpatik-avatar.jpg" alt="HTML code" title="HTML5">
            <span>HTML5 Presentations</span>
          </a>
        </div>
        <div>
        	<a href="console-log-polyfill">
          	<img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="Cross-browser console logging">
          	<span>Cross-browser console logging</span>
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2>Creations</h2>
      <div class="row button-link-list">
        <div>
        	<a href="https://github.com/patik">
          	<img src="../img/home-github-logo.png" alt="GitHub text logo" title="GitHub">
          	<span>GitHub reposi<wbr>tories</span>
          </a>
        </div>
        <div>
        	<a href="http://signaltonoi.se/">
          	<img src="../img/home-snr-logo.png" alt="S:R logo" title="signal:noise">
          	<span>signal:<wbr>noise<br>Twitter app</span>
          </a>
        </div>
        <div>
        	<a href="http://picnicnewark.com/">
          	<img src="../img/code-picnic-logo.jpg" alt="PicNic Newark restaurant logo" title="Pic-Nic, Newark, NJ">
          	<span>Picnic<wbr>Newark<wbr>.com</span>
          </a>
        </div>
        <div>
        	<a href="within-viewport/">
          	<img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="Within Viewport">
          	<span>Within Viewport</span>
          </a>
        </div>
        <div>
        	<a href="user-scripts/">
          	<img src="../img/home-console-blog-logo.png" alt="JavaScript code" title="User Scripts">
          	<span>User Scripts</span>
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2>Links</h2>
      <p>These are some ideas, inspirations, and invaluable tools that I find interesting and relevant to development on the web today.</p>
      <ul>
      	<li>Why the most reasonable design strategy today is to think <a href="http://www.lukew.com/ff/entry.asp?933">mobile first</a></li>
        <li><a href="http://jquerymobile.com/">jQueryMobile</a> to help make your site friendly for all mobile devices, and <a href="http://www.phonegap.com/">PhoneGap</a> to port native apps for many platforms</li>
        <li>Many demos and explanations of the latest advancements are at <a href="http://www.html5rocks.com/">HTML5 Rocks</a></li>
      	<li><a href="http://paulirish.com/2011/tiered-adaptive-front-end-experiences/">Why web sites need not look the same on all browsers</a></li>
      	<li><a href="http://www.google.com/chromeframe?quickenable=true">Google Chrome Frame</a>, for anyone required to use IE6-9 who wants to get the most out of the web (no administrative rights needed!)</li>
      	<li>CSS generators for <a href="http://www.colorzilla.com/gradient-editor/">gradients</a> and <a href="http://css3please.com/">other styles</a></li>
      	<li><a href="http://jsfiddle.net/">jsFiddle</a> for writing and sharing code snippets, and <a href="http://jsperf.com/">jsPerf</a> for seeing which one is the fastest</li>
      </ul>
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
