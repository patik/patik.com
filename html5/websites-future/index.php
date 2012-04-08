<?php
# require_once('../../inc/html.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="html5-main" role="main">
    <h1>Web Sites of the Future</h1>

    <section>
      <h2>September 15, 2011</h2>
   		<h3>GTC East</h3>
      <ul>
      	<li><a href="pres/" class="no-ajaxy">Presentation</a></li>
      	<li><a href="demo/" class="no-ajaxy">Demo</a></li>
      </ul>
    </section>

    <section>
      <h2>Links</h2>
      <ul>
      	<li>Why the most reasonable design strategy today is to think <a href="http://www.lukew.com/ff/entry.asp?933">mobile first</a></li>
        <li><a href="http://jquerymobile.com/">jQueryMobile</a> to help make your site friendly for all mobile devices, and <a href="http://www.phonegap.com/">PhoneGap</a> to port native apps for many platforms</li>
        <li><a href="http://www.poynter.org/latest-news/media-lab/mobile-media/145623/how-the-boston-globe-built-an-all-in-one-website-web-app-and-mobile-site/">An article</a> about responsive design as used in <a href="http://bostonglobe.com">bostonglobe.com</a>, and <a href="http://unstoppablerobotninja.com/entry/the-boston-globe/">the story from one of the developers</a>.</li>
        <li><a href="http://hacks.mozilla.org/2011/08/introducing-webapi/">Mozilla's WebAPI</a></li>
      	<li><a href="http://paulirish.com/2011/tiered-adaptive-front-end-experiences/">Why web sites need not look the same on all browsers</a></li>
        <li>Many demos and explanations of the latest advancements are at <a href="http://www.html5rocks.com/">HTML5 Rocks</a></li>
      </ul>
    </section>

  </div>
  <?php
}

$x = new Print_html();
$x->name = 'websites-future';
$x->section = 'html5';
$x->pageTitle = 'Web Sites of the Future';
$x->keywords = 'html5, css3, mobile, responsive design';
$x->dirLevel = 2;
$x->useragent = $_SERVER['HTTP_USER_AGENT'];

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
	print_page_body();
  exit();
}
# navigated directly
else {
	$x->redirect = true;
}

$x->print_full_page();

?>
