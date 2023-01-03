<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
    ?>
    <div id="turkey-main" role="main">

        <h1>Turkey</h1>

        <div class="intro">
            <p>We visited Turkey in mid-July 2009 for 14 days. While the sights ranged from beautiful to amazing, we were most fond of the delicious food and wonderful people.</p>
            <p>I wrote a few <a href="http://patik.com/blog/category/turkey/">blog posts</a> about the trip.
            </p>
        </div>

        <section>
            <h2>Photos and Video</h2>
            <div class="row travel-link-list">
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-turkey-istanbul" href="http://picasaweb.google.com/cpatik/TurkeyIstanbul">
                        <img src="../../img/turkey-link-istanbul.jpg" alt="Photo of the Blue Mosque at night">
                        <span>Istanbul</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-turkey-cappadocia" href="http://picasaweb.google.com/cpatik/TurkeyCappadocia">
                        <img src="../../img/turkey-link-cappadocia.jpg" alt="Hot air balloon over the rock formations in the Cappadocia region">
                        <span>Cappadocia</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-turkey-cirali" href="http://picasaweb.google.com/cpatik/TurkeyCirali">
                        <img src="../../img/turkey-link-cirali.jpg" alt="Kim standing along the beach in Çirali">
                        <span>&Ccedil;&#305;ral&#305; &amp; Olympos</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns left">
                    <a class="bg-turkey-ephesus" href="http://picasaweb.google.com/cpatik/TurkeyEphesus">
                        <img src="../../img/turkey-link-ephesus.jpg" alt="Ephesus">
                        <span>Ephesus</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
            </div>
        </section>

        <section>
            <h2>Itinerary</h2>
            <ul>
                <li> <strong>Istanbul</strong>
                    <ul>
                        <li>
                            Sultanahmet: <a href="http://en.wikipedia.org/wiki/Hagia_Sophia">Hagia Sophia</a>, <a href="http://en.wikipedia.org/wiki/Sultan_Ahmed_Mosque">Blue Mosque</a>, <a href="http://www.cemberlitashamami.com.tr/html/en">&Ccedil;emberlita&#351; Hamami</a>, Grand Bazaar, and the <a href="http://en.wikipedia.org/wiki/Rock'n_Coke">Rock'n Coke Festival</a>
                        </li>
                        <li>
                            Beyo&#287;lu: Taksim Square, Istiklal Caddesi, Galata Bridge, Galata Tower
                        </li>
                        <li>
                            Kad&#305;k&ouml;y: open markets, <a href="http://en.wikipedia.org/wiki/%C5%9E%C3%BCkr%C3%BC_Saraco%C4%9Flu_Stadium">Fenerbah&ccedil;e stadium</a>
                        </li>
                        <li>
                            Bosphorus Strait and <a href="http://en.wikipedia.org/wiki/Yoros_Castle">Anadolu Kava&#287;&#305;</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="http://en.wikipedia.org/wiki/Cappadocia"><strong>Cappadocia</strong></a>: <a href="http://en.wikipedia.org/wiki/G%C3%B6reme">G&ouml;reme</a>, Fairy Chimneys
                </li>
                <li>
                    <a href="http://en.wikipedia.org/wiki/%C3%87%C4%B1ral%C4%B1"><strong>&Ccedil;&#305;ral&#305;</strong></a>: the unspoiled beach, the ruins of Olympos, and the fiery Chimeras
                </li>
                <li>
                    <a href="http://en.wikipedia.org/wiki/Ephesus"><strong>Ephesus</strong></a> and the town of Sel&ccedil;uk
                </li>
            </ul>

            <div class="travel-map">
                <a href="../../img/turkey-overview-map.jpg">
                    <img src="../../img/turkey-overview-map-small.jpg" alt="Photos of the places we visited superimposed on a map." title="Click for a larger version">
                </a>
            </div>
        </section>
        <?php /*
        <!--
          <img src="http://lh4.ggpht.com/_nYI701-0c0g/SnEB47qAVyE/AAAAAAAATvw/foLvCzKkrCE/s144-c/TurkeyIstanbul.jpg">
        <img src="http://lh5.ggpht.com/_nYI701-0c0g/SnUbsPIsTcE/AAAAAAAATuE/o0rGqe1iq0E/s144-c/TurkeyCappadocia.jpg">
        <img src="http://lh5.ggpht.com/_nYI701-0c0g/SobPzUfaT3E/AAAAAAAAUo4/CKs9lFyl960/s144-c/TurkeyCirali.jpg" alt="" title="" />
        <img src="http://lh5.ggpht.com/_nYI701-0c0g/SogvyuQbB3E/AAAAAAAAU9k/KTglSuZNTrM/s144-c/TurkeyEphesus.jpg" alt="Placeholder" />

        <section>
            <ul class="travel-page-links">
                <li>
                    <a href="../britain-benelux/">Britain &amp; Benelux 2012</a>
                </li>
                <li>
                    <a href="../peru-argentina/">Peru &amp; Argentina 2011</a>
                </li>
                <li>
                    <a href="../spain/">Spain 2010</a>
                </li>
                <li>
                    <a href="../turkey/" class="selected">Turkey 2009</a>
                </li>
                <li>
                    <a href="../germany/">Germany &amp; Austria 2008</a>
                </li>
                <li>
                    <a href="../greece/">Greece 2007</a>
                </li>
                <li>
                    <a href="../paris/">Paris 2005</a>
                </li>
                <li>
                    <a href="../france/">France 2000</a>
                </li>
            </ul>
        </section>

        <style>

          // List of links to other travel pages //
          .travel-page-links {
            list-style: none outside none;
            padding: 0;
          }

          .travel-page-links li {
            float: left;
            width: 25%;
          }

          .travel-page-links li a {
            display: block;
            padding: 4px 12px;
            height: 24px;
            line-height: 24px;
            vertical-align: middle;
            border: 1px solid #ccc;
            border-bottom: none;
            border-left: none;
            color: #444;
            text-decoration: none;
            text-align: center;
            -moz-background-clip: padding-box;
                 background-clip: padding-box;
          }

          .travel-page-links li:first-child a {
            border-left: 1px solid #ccc;
            border-top-left-radius: 4px;
          }
          .travel-page-links li:nth-child(4) a {
            border-top-right-radius: 4px;
          }
          .travel-page-links li:nth-child(5) a {
            border-left: 1px solid #ccc;
            border-bottom-left-radius: 4px;
          }
          .travel-page-links li:last-child a {
            border-bottom-right-radius: 4px;
          }

          .travel-page-links li:nth-child(5) a,
          .travel-page-links li:nth-child(6) a,
          .travel-page-links li:nth-child(7) a,
          .travel-page-links li:nth-child(8) a {
            border-bottom: 1px solid #ccc;
          }
         </style>
        -->*/ ?>
    </div>
<?php
}

$x = new Print_html();
$x->name = 'turkey';
$x->section = 'travel';
$x->pageTitle = 'Turkey';
$x->dirLevel = 2;
$x->preload = array('<img src="../../images/turkey-overview-map-small.jpg">');
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
