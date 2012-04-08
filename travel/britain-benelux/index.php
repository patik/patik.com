<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="britain-main" role="main">

    <h1>London, Amsterdam, &amp; Bruges</h1>

    <div class="intro">
      <p>This trip is still in the very early planning stages.</p>
    </div>
    <?php /*
    <section>
      <h2>Photos and Video</h2>
      <div class="row travel-link-list">
        <div>
          <a class="bg-britain-xxxx" href="xxxxx" title="xxxxx">
            <span>xxxxx</span>
            <div class="image-cover"></div>
          </a>
        </li>
        <li>
          <a class="bg-britain-xxxx" href="xxxxx" title="xxxxx">
            <span>xxxxx</span>
            <div class="image-cover"></div>
          </a>
        </li>
        <li>
          <a class="bg-britain-xxxx" href="xxxxx" title="xxxxx">
            <span>xxxxx</span>
            <div class="image-cover"></div>
          </a>
        </li>
        <li>
          <a class="bg-britain-xxxx" href="xxxxx" title="xxxxx">
            <span>xxxxx</span>
            <div class="image-cover"></div>
          </a>
        </li>
      </ul>
    </section>
    */ ?>
    <section>
    	<h2>Itinerary</h2>
      <ul>
        <li>Amsterdam</li>
        <li>Bruges</li>
        <li>Eurostar train to London</li>
        <li>Edinburgh, Scotland</li>
        <li>London</li>
        <li>Arsenal and Liverpool, and lower league matches</li>
      </ul>
    </section>

  </div>
  <?php
}

$x = new Print_html();
$x->name = 'britain';
$x->section = 'travel';
$x->pageTitle = 'Britain &amp; Benelux';
$x->keywords = 'england, scotland, netherlands, bruges, london, amsterdam, edinburgh, liverpool, united kingdom, europe, travel';
$x->dirLevel = 2;
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
