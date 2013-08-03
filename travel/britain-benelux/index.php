<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="britain-main" role="main">

    <h1>London, Amsterdam, &amp; Bruges</h1>

    <div class="intro">
      <p>August 2012</p>
    </div>

    <section>
      <h2>Photos and Video</h2>
      <div class="row travel-link-list">
        <div>
          <a class="bg-britain-netherlands" href="https://picasaweb.google.com/116513687533678150554/Amsterdam2012" title="Netherlands photo album">
            <img src="../../img/britain-benelux-netherlands-link.jpg" alt="Westerkerk overlooking an Amsterdam canal">
            <span>Netherlands</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-britain-bruges" href="https://picasaweb.google.com/116513687533678150554/Bruges" title="Bruges photo album">
            <img src="../../img/britain-benelux-bruges-link.jpg" alt="">
            <span>Bruges</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-britain-edinburgh" href="https://picasaweb.google.com/116513687533678150554/Edinburgh" title="Edinburgh photo album">
            <img src="../../img/britain-benelux-edinburgh-link.jpg" alt="">
            <span>Edinburgh</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-britain-london" href="https://picasaweb.google.com/116513687533678150554/London2012" title="London photo album">
            <img src="../../img/britain-benelux-london-link.jpg" alt="View over Westminster from the London Eye">
            <span>London</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-britain-liverpool" href="https://picasaweb.google.com/116513687533678150554/Liverpool" title="Liverpool photo album">
            <img src="../../img/britain-benelux-liverpool-link.jpg" alt="Pitch-level view of the Kop at Anfield">
            <span>Liverpool</span>
            <div class="image-cover"></div>
          </a>
        </div>
      </div>
    </section>
    <section>
    	<h2>Itinerary</h2>
      <ul>
        <li>Netherlands
          <ul>
            <li>Amsterdam</li>
            <li>Haarlem</li>
            <li>Leiden</li>
            <li>Edam</li>
          </ul>
        </li>
        <li>Bruges</li>
        <li>Eurostar train to London, via Paris</li>
        <li>Edinburgh, Scotland</li>
        <li>London
          <ul>
            <li>Highclere Castle</li>
            <li>Arsenal vs Sunderland football match</li>
            <li>Harry Potter film studios</li>
          </ul>
        </li>
        <li>Liverpool
          <ul>
            <li>Beatles Weekend</li>
            <li>Liverpool vs Manchester City football match</li>
          </ul>
        </li>
      </ul>
      <div class="travel-map">
        <a href="../../img/britain-benelux-overview-map.png"><img src="../../img/britain-benelux-overview-map-small.jpg" alt="Map of trip locations" title="Click for a larger version"></a>
      </div>
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
