<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="france-main" role="main">

    <h1>France</h1>

    <div class="intro">
      <p>In April 2000, we took a short trip France with our high school French class. Our tour included Paris, Nice, Avignon, Arles, and Monaco.</p>
    </div>

    <section>
      <h2>Photos</h2>
      <div class="row travel-link-list">
        <div>
          <a class="bg-france-photos" href="https://picasaweb.google.com/116513687533678150554/France2000#slideshow/5294684171488622482">
            <img src="../../img/france-photos-link.jpg" alt="The Eiffel Tower was lit up for the new millenium">
            <span>France</span>
            <div class="image-cover"></div>
          </a>
        </div>
      </div>
    </section>

  </div>
  <?php
}

$x = new Print_html();
$x->name = 'france';
$x->section = 'travel';
$x->pageTitle = 'France';
$x->keywords = 'france, paris, nice, avignon, arles, monaco, europe, travel';
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
