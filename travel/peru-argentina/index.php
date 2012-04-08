<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="peru-argentina-main" role="main">

    <h1>Peru &amp; Argentina</h1>

    <div class="intro">
      <p>Our first forage into the southern hemisphere brought us everywhere from the Amazon rainforest and Machu Picchu to Europe-esque Buenos Aires and a quiet estancia.</p>
    </div>

    <section>
      <h2>Photos and Video</h2>
      <div class="row travel-link-list">
        <div>
          <a class="bg-peru-argentina-amazon" href="https://picasaweb.google.com/116513687533678150554/AmazonRainforest#slideshow/5638173949189577330">
            <img src="../../img/peru-argentina-link-amazon.jpg" alt="Wooley monkey">
            <span>Amazon Rainforest</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-peru-argentina-cusco" href="https://picasaweb.google.com/116513687533678150554/Cusco#slideshow/5637849631486614658">
            <img src="../../img/peru-argentina-link-cusco.jpg" alt="Kim holding a lamb and posing with Andean women">
            <span>Cusco</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-peru-argentina-colonia" href="https://picasaweb.google.com/116513687533678150554/ColoniaDelSacramento#slideshow/5637820814953351506">
            <img src="../../img/peru-argentina-link-colonia.jpg" alt="Old train in Colonia del Sacremento, Uruguay">
            <span>Colonia del Sacramento</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <?php /*
        <div>
          <a class="bg-peru-argentina-xxxxx" href="xxxxx">
            <img src="../../img/peru-argentina-link-xxxxx.jpg" alt="xxxxx">
            <span>xxxxx</span>
            <div class="image-cover"></div>
          </a>
        </div>
        */ ?>
      </div>
    </section>

    <section>
      <h2>Itinerary</h2>
      <ul>
        <li>The pristine <a href="http://www.perujungle.com/">Amazon Rainforest</a> near Iquitos, Peru</li>
        <li>High-altitude <a href="http://wikitravel.org/en/Cuzco">Cusco</a> with its many nearby Incan ruins</li>
        <li>The incomparable <a href="http://wikitravel.org/en/Machu_Picchu">Machu Picchu</a>, an untouched ancient Incan city high in the Andes mountains</li>
        <li>An unforgettable, leisurely ride on the <a href="http://www.go2peru.com/andean_explorer.htm">Andean Explorer</a>, winding through the Andes from Cuzco to Lake Titicaca</li>
        <li><a href="http://en.wikipedia.org/wiki/Lake_Titicaca">Lake Titicaca</a>, the world's highest navigable lake and home to <a href="http://en.wikipedia.org/wiki/Uru_people">floating islands</a> and <a href="http://en.wikipedia.org/wiki/Taquile">centuries-old cultures</a></li>
        <li>Beautiful <a href="http://wikitravel.org/en/Buenos_Aires">Buenos Aires</a>, a wonderful blend of Barcelona and Italy</li>
        <li>A rural <a href="http://en.wikipedia.org/wiki/Estancia">Estancia</a>, with horseback riding and the famed Argentine beef <a href="http://en.wikipedia.org/wiki/Asado">asado</a></li>
        <li>Quaint <a href="http://wikitravel.org/en/Colonia">Colonia del Sacramento</a>, the oldest town in Uruguay and just a short ferry ride across the Rio de la Plata from Buenos Aires</li>
      </ul>

      <div class="travel-map">
      	<a href="../../img/peru-argentina-map.png"><img src="../../img/peru-argentina-map-small.png" alt="Map of South America with each location noted and annotated with a photo" title="Click for a larger version"></a>
      </div>
    </section>
  </div>
  <?php
}

$x = new Print_html();
$x->name = 'peru-argentina';
$x->section = 'travel';
$x->pageTitle = 'Peru &amp; Argentina';
$x->keywords = 'peru, argentina, cusco, machu picchu, buenos aires, amazon rainforest, lake titicaca, uruguay, panama canal, south america, travel';
$x->dirLevel = 2;
$x->preload = array('<img src="../../images/peru-argentina-map-small.png">');
$x->useragent = $_SERVER['HTTP_USER_AGENT'];

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
	# print_page_body();
}
# navigated directly
else {
	$x->redirect = true;
}

$x->print_full_page();

?>
