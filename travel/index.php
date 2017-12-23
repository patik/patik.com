<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
    ?>
    <div id="travel-main" role="main">

        <h1>Travel</h1>

        <section>
            <p><em>Not shown below are notable trips to Vietnam, Thailand, Cambodia, and much more of Germany.</em></p>
        </section>

        <section>
            <div class="row travel-link-list">
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-travel-britain-benelux" href="britain-benelux/">
                      <img src="../img/travel-britain-benelux.jpg" alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square">
                        <span>Britain &amp;<br>Benelux</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-travel-peru-argentina" href="peru-argentina/">
                    <img src="../img/travel-peru-argentina.jpg" alt="Kim holding a lamb and posing with two Andean women">
                        <span>Peru &amp; Argentina</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-travel-spain" href="spain/">
                        <img src="../img/travel-spain.jpg" alt="Celebrating Spain's World Cup victory in Madrid">
                        <span>Spain,<br>Portugal,<br>&amp; Morocco</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-travel-turkey" href="turkey/">
                        <img src="../img/travel-turkey.jpg" alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey">
                        <span>Turkey</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-travel-germany" href="germany/">
                        <img src="../img/travel-germany.jpg" alt="Spanish fans in Vienna for Euro 2008">
                        <span>Germany<br>&amp; Austria</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-travel-greece" href="greece/">
                        <img src="../img/travel-greece.jpg" alt="Serifios, Greece">
                        <span>Greece</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-travel-paris" href="paris/">
                        <img src="../img/travel-paris.jpg" alt="Eiffel Tower">
                        <span>Paris</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns left">
                    <a class="bg-travel-france" href="france/">
                        <img src="../img/travel-france.jpg" alt="The Seine River">
                        <span>France</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
            </div>
        </section>
        <?php /*
        <section>
            <div class="travel-map"><img src="http://chart.apis.google.com/chart?cht=t&chs=440x220&chd=s:_&chtm=world&chco=FFFFFF,FF0000,FFFF00,00FF00&chld=PE|AR|FR|GR|DE|AT|TR|PT|ES|MA&chd=t:0,10,40,40,60,80,80,80,80,80&chf=bg,s,EAF7FE" alt="Map with countries that I've been to highlighted" title="Countries that I've visited"></div>
        </section>
        */ ?>
    </div>
  <?php
}

$x = new Print_html();
$x->name = 'travel';
$x->section = 'travel';
$x->pageTitle = 'Travel';
$x->keywords = 'turkey, istanbul, cappadocia, cirali, selcuk, ephesus, europe, travel';
$x->dirLevel = 1;
$x->useragent = $_SERVER['HTTP_USER_AGENT'];
$x->preload = array('<img src="../img/peru-argentina-link-amazon.jpg">', '<img src="../img/peru-argentina-link-colonia.jpg">',
                    '<img src="../img/peru-argentina-link-cusco.jpg">', '<img src="../img/spain-itinerary-map.jpg">',
                    '<img src="../img/spain-link-world-cup.jpg">', '<img src="../img/turkey-link-cappadocia.jpg">',
                    '<img src="../img/turkey-link-cirali.jpg">', '<img src="../img/turkey-link-ephesus.jpg">',
                    '<img src="../img/turkey-link-istanbul.jpg">', '<img src="../img/turkey-overview-map.jpg">',
                    '<img src="../img/germany-austria-link.jpg">', '<img src="../img/germany-bavaria-link.jpg">',
                    '<img src="../img/germany-berlin-link.jpg">', '<img src="../img/greece-athens-link.jpg">',
                    '<img src="../img/greece-santorini-link.jpg">', '<img src="../img/greece-sifnos-link.jpg">',
                    '<img src="../img/paris-photos-link.jpg">', '<img src="../img/france-photos-link.jpg">');

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
