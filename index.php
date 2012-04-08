<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="home-main" role="main">
    <div class="intro">
      <p>I'm a traveler, web designer &amp; developer, and Arsenal fan based in Upstate New York.</p>
    </div>

    <section>
      <h2>Travel</h2>
      <div class="row button-link-list">
        <div>
          <a href="travel/">
            <img src="img/home-travel-all.jpg" alt="Standing aside the Andean Explorer train" title="Andean Explorer, Peru">
            <span>All Travel</span>
          </a>
        </div>
        <div>
          <a href="travel/peru-argentina/">
            <img src="img/home-travel-peru-argentina.jpg" alt="Kim holding a lamb and posing with two Andean women in their traditionl clothing" title="Kim holding a lamb and posing with two Andean women">
            <span>Peru &amp; Argentina</span>
          </a>
        </div>
        <div>
          <a href="travel/spain/">
            <img src="img/home-travel-spain.jpg" alt="Celebrating Spain's World Cup victory in Madrid" title="Celebrating Spain's World Cup victory in Madrid">
            <span>Spain, Portugal, &amp; Morocco</span>
          </a>
        </div>
        <div>
          <a href="travel/turkey/">
            <img src="img/home-travel-turkey.jpg" alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey" title="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey">
            <span>Turkey</span>
          </a>
        </div>
        <div>
          <a href="travel/germany/">
            <img src="img/home-travel-germany.jpg" alt="Spanish fans gathering in Vienna's Ststephensplatz" title="Spanish fans in Vienna for Euro 2008">
            <span>Germany &amp; Austria</span>
          </a>
        </div>
        <div>
          <a href="travel/greece/">
            <img src="img/home-travel-greece.jpg" alt="View of the coast of Serifios, Greece from a ferry" title="Serifios, Greece">
            <span>Greece</span>
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2>Web design &amp; development</h2>
      <div class="row button-link-list">
        <div>
          <a href="code/">
            <img src="img/home-console-blog-logo.png" alt="JavaScript code" title="Code &amp; projects">
            <span>Code &amp; projects</span>
          </a>
        </div>
        <div>
        	<a href="blog/">
          	<img src="img/home-console-blog-logo.png" alt="JavaScript code" title="console.blog()">
        		<span>console.<wbr>blog()</span>
          </a>
        </div>
        <div>
        	<a href="http://signaltonoi.se/">
          	<img src="img/home-snr-logo.png" alt="S:R logo" title="signal:noise">
          	<span>signal:<wbr>noise Twitter app</span>
          </a>
        </div>
        <div>
        	<a href="https://github.com/cpatik">
          	<img src="img/home-github-logo.png" alt="GitHub text logo" title="GitHub">
          	<span>GitHub reposi<wbr>tories</span>
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2>Outlets</h2>
      <div class="row button-link-list">
        <div>
        	<a href="https://twitter.com/craigpatik">
        		<img src="img/home-twitter-craigpatik-avatar.jpg" alt="Twitter avatar; photo of my riding on a camel" title="@craigpatik">
            <span>@craigpatik</span>
          </a>
        </div>
        <div>
        	<a href="https://twitter.com/SoccerTorte">
        		<img src="img/home-twitter-soccertorte-avatar.png" alt="Twitter avatar; photo of a slice of sachertorte cake" title="@SoccerTorte">
            <span>@SoccerTorte</span>
          </a>
        </div>
        <div>
        	<a href="https://www.facebook.com/craigpatik">
        		<img src="img/home-twitter-craigpatik-avatar.jpg" alt="Facebook avatar; photo of my riding on a camel" title="Facebook profile">
            <span>Facebook</span>
          </a>
        </div>
        <div>
        	<a href="https://picasaweb.google.com/cpatik">
        		<img src="img/home-photos.jpg" alt="Sitting in a boat and feeding a banana to a wooley monkey" title="Feeding a monkey in the Amazon rainforest">
            <span>Photos</span>
          </a>
        </div>
        <div>
        	<a href="http://ellsass.com">
        		<img src="img/home-tumblr-ellsass-avatar.jpg" alt="Tumblr avatar; photo of me in front of the Alcazar gardens, Sevilla, Spain" title="Alcazar gardens, Sevilla, Spain">
            <span>Personal blog</span>
          </a>
        </div>
        <div>
        	<a href="http://rubeonrails.com">
        		<img src="img/home-tumblr-rubeonrails-avatar.jpg" alt="S-Bahn station in Marienplatz, Munich, Germany" title="S-Bahn station in Marienplatz, Munich, Germany">
            <span>Rube On Rails</span>
          </a>
        </div>
      </div>
     </section>

  </div>
  <?php
}

$x = new Print_html();
$x->name = 'home';
$x->section = 'home';
$x->print_full_page();
$x->useragent = $_SERVER['HTTP_USER_AGENT'];
// $x->preload = array('<img src="images/travel-peru-argentina.jpg">', '<img src="images/travel-spain.jpg">', '<img src="images/travel-greece.jpg">',
//                     '<img src="images/travel-turkey.jpg">', '<img src="images/travel-germany.jpg">', '<img src="images/travel-france.jpg">',
//                     '<img src="images/travel-paris.jpg">', '<img src="images/travel-britain-benelux.jpg">',);

?>
