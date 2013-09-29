<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
    ?>
    <div id="greece-main" role="main">

        <h1>Greece</h1>

        <section class="intro">
            <p>In July 2007 we spent our honeymoon in Greece.</p>
        </section>

        <section>
            <h2>Photos</h2>

            <p><a href="http://picasaweb.google.com/cpatik/Greece2007">Condensed photo album</a></p>

            <div class="row travel-link-list">
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-greece-athens" href="https://picasaweb.google.com/116513687533678150554/GreeceRoughDraftAthens?authkey=Gv1sRgCJL96rLSzuGOuAE#slideshow/5093210112739426114">
                        <img src="../../img/greece-athens-link.jpg" alt="Temple of Zeus in Athens">
                        <span>Athens</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-greece-sifnos" href="https://picasaweb.google.com/116513687533678150554/GreeceRoughDraftSifnos?authkey=Gv1sRgCKLAtbqu1MfPcg#slideshow/5093324333099698226">
                        <img src="../../img/greece-sifnos-link.jpg" alt="Coast of Serifios island">
                        <span>Sifnos</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
                <div class="small-12 medium-6 large-4 columns left">
                    <a class="bg-greece-santorini" href="https://picasaweb.google.com/116513687533678150554/GreeceRoughDraftSantorini?authkey=Gv1sRgCK_Nlp3Z5IeGWg#slideshow/5093325445496228338">
                        <img src="../../img/greece-santorini-link.jpg" alt="Sunset over Oia">
                        <span>Santorini</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
            </div>
        </section>

    </div>
    <?php
}

$x = new Print_html();
$x->name = 'greece';
$x->section = 'travel';
$x->pageTitle = 'Greece';
$x->keywords = 'greece, athens, santorini, sifnos, europe, travel';
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
