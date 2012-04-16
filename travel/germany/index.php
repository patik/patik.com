<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  /*
  <style>
  	// Cloister Black Light
     / @vendor:     Dieter Steffmann
     / @vendorurl:  http://www.steffmann.de
     / @licenseurl: http://www.fontsquirrel.com/license/Cloister-Black
     //
    @font-face {
      font-family: 'CloisterBlackLight';
      src: url('/font-face/cloister-black/CloisterBlack.eot');
      src: local('Cloister Black Light'), local('CloisterBlack-Light'), url('/font-face/cloister-black/CloisterBlack.ttf') format('truetype'), url('/font-face/cloister-black/CloisterBlack.woff') format('woff');
    }
    #germany-main h1, h2 { font-family: 'CloisterBlackLight'; }

    .font {
    }
  </style>
*/ ?>
  <div id="germany-main" role="main">

    <h1>Germany &amp; Austria</h1>

    <div class="intro">
      <p>In June/July 2008, we took a trip around Austria and Germany. Along the way we saw the Euro 2008 final come to Vienna, soaked up the Sound of Music in Salzburg, and took in the solemnity of the Mauthausen-Gusen concentration camp.</p>
      <p>On to <a href="http://wikitravel.org/en/Bavaria">Bavaria</a> and Germany, we mixed munchies and <a href="http://en.wikipedia.org/wiki/Beer_stein">mass</a> in Munich, toured through Nuremberg, walked the wall around <a href="http://wikitravel.org/en/Rothenburg_ob_der_Tauber">Rothenburg</a>, cruised up the castle-studded <a href="http://wikitravel.org/en/Rhine_Valley">Rhine</a>, and reveled in the 20th Century history of Berlin.</p>
    </div>

    <section>
      <h2>Photos and Video</h2>
      <div class="row travel-link-list">
        <div>
          <a class="bg-germany-austria" href="https://picasaweb.google.com/116513687533678150554/GermanyAustriaPart1ViennaAndSalzburg#slideshow/5225133977418641458">
            <img src="../../img/germany-austria-link.jpg" alt="Spanish fans gathering in Vienna for Euro 2008">
            <span>Austria</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-germany-bavaria" href="https://picasaweb.google.com/116513687533678150554/GermanyAustriaPart2MunichAndBavaria#slideshow/5225143647143416210">
            <img src="../../img/germany-bavaria-link.jpg" alt="Enjoying a liter at Hofbrauhaus">
            <span>Bavaria</span>
            <div class="image-cover"></div>
          </a>
        </div>
        <div>
          <a class="bg-germany-berlin" href="https://picasaweb.google.com/116513687533678150554/GermanyAustriaPart3TheRhineAndBerlin#slideshow/5225644361457979586">
            <img src="../../img/germany-berlin-link.jpg" alt="Brandenberg Gate, Berlin">
            <span>Berlin &amp;<br>The Rhine</span>
            <div class="image-cover"></div>
          </a>
        </div>
      </div>
    </section>

  </div>
  <?php
}

$x = new Print_html();
$x->name = 'germany';
$x->section = 'travel';
$x->pageTitle = 'Germany &amp; Austria';
$x->keywords = 'germany, austria, euro 2008, munich, bavaria, rothenburg ob der tauber, vienna, salzburg, mauthausen, berlin, rhine river, bacharach, europe, travel';
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
